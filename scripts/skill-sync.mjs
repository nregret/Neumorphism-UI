import path from 'node:path'
import {
  buildExampleSource,
  componentDescriptionOverrides,
  componentNameToDocBase,
  componentNameToPrimaryExampleName,
  emptyDir,
  ensureDir,
  extractDocDescription,
  extractDocImports,
  extractNamedTemplateStrings,
  listFiles,
  mirroredComposableFiles,
  parseDefaults,
  parseEvents,
  parseProps,
  parseRelatedComponents,
  parseSlots,
  pathExists,
  readText,
  relativeToSkill,
  sanitizeLibraryImports,
  skillComponentExampleDir,
  skillLibraryComponentDir,
  skillLibraryComposableDir,
  skillLibraryRoot,
  skillReferencesDir,
  sourceComponentDir,
  sourceComposableDir,
  sourceDocDir,
  sourceFileToComponentName,
  sourceStyleFile,
  toKebabCase,
  writeText,
} from './skill-common.mjs'

async function mirrorLibrarySources() {
  await emptyDir(skillLibraryRoot)
  await ensureDir(skillLibraryComponentDir)
  await ensureDir(skillLibraryComposableDir)

  const componentFiles = await listFiles(sourceComponentDir)
  for (const sourceFile of componentFiles) {
    const targetFile = path.join(skillLibraryComponentDir, path.basename(sourceFile))
    const source = await readText(sourceFile)
    await writeText(targetFile, sanitizeLibraryImports(source))
  }

  for (const composableFileName of mirroredComposableFiles) {
    const sourceFile = path.join(sourceComposableDir, composableFileName)
    const targetFile = path.join(skillLibraryComposableDir, composableFileName)
    await writeText(targetFile, await readText(sourceFile))
  }

  await writeText(path.join(skillLibraryRoot, 'style.css'), await readText(sourceStyleFile))

  return componentFiles
}

async function generateComponentExamples() {
  await emptyDir(skillComponentExampleDir)

  const docFiles = await listFiles(sourceDocDir)
  const exampleMap = new Map()
  const descriptionMap = new Map()

  for (const docFile of docFiles) {
    const source = await readText(docFile)
    const docImports = extractDocImports(source)
    const codeBlocks = extractNamedTemplateStrings(source)
    const docBase = path.basename(docFile, '.vue').replace(/Doc$/, '')
    const componentName = docBase === 'Toast' ? 'NeuToast' : `Neu${docBase}`
    const { description } = extractDocDescription(source)

    if (description) {
      descriptionMap.set(componentName, description)
    }

    const outputFiles = []
    for (const codeBlock of codeBlocks) {
      const suffix = toKebabCase(codeBlock.name) || 'example'
      const fileName = `${componentName}-${suffix}.vue`
      const targetFile = path.join(skillComponentExampleDir, fileName)
      const content = buildExampleSource(codeBlock.value, docImports)
      await writeText(targetFile, content)
      outputFiles.push(relativeToSkill(targetFile))
    }

    if (outputFiles.length > 0) {
      exampleMap.set(componentName, outputFiles)
    }
  }

  return { exampleMap, descriptionMap }
}

function buildComponentDescription(componentName, descriptionMap) {
  if (componentDescriptionOverrides[componentName]) {
    return componentDescriptionOverrides[componentName]
  }

  const directDescription = descriptionMap.get(componentName)
  if (directDescription) {
    return directDescription
  }

  return `${componentName} 的 NeuUI 组件实现，建议结合关联案例与源码一起理解用法。`
}

function buildExampleFiles(componentName, exampleMap) {
  const primaryName = componentNameToPrimaryExampleName(componentName)
  return exampleMap.get(primaryName) ?? []
}

async function buildCatalog(componentFiles, exampleMap, descriptionMap) {
  const components = []

  for (const sourceFile of componentFiles) {
    const fileName = path.basename(sourceFile)
    const componentName = sourceFileToComponentName(fileName)
    const mirroredSourcePath = fileName === 'toast.ts'
      ? path.join(skillLibraryComponentDir, 'toast.ts')
      : path.join(skillLibraryComponentDir, fileName)

    const source = await readText(sourceFile)
    const componentEntry = {
      name: componentName,
      sourcePath: relativeToSkill(mirroredSourcePath),
      description: buildComponentDescription(componentName, descriptionMap),
      props: parseProps(source),
      defaults: parseDefaults(source),
      events: parseEvents(source),
      slots: parseSlots(source),
      relatedComponents: parseRelatedComponents(source, componentName),
      exampleFiles: buildExampleFiles(componentName, exampleMap),
      docPage: `${componentNameToDocBase(componentName)}Doc.vue`,
    }

    components.push(componentEntry)
  }

  return components.sort((left, right) => left.name.localeCompare(right.name))
}

function renderComponentsMarkdown(components) {
  const lines = [
    '# NeuUI 组件索引',
    '',
    `共 ${components.length} 个组件/入口，内容由 \`npm run skill:sync\` 生成。`,
    '',
  ]

  for (const component of components) {
    lines.push(`## ${component.name}`)
    lines.push('')
    lines.push(`- \`name\`: \`${component.name}\``)
    lines.push(`- \`sourcePath\`: \`${component.sourcePath}\``)
    lines.push(`- \`description\`: ${component.description}`)

    const propsText = component.props.length > 0
      ? component.props.map((prop) => `\`${prop.name}${prop.required ? '' : '?'}: ${prop.type}\``).join('、')
      : '无'
    lines.push(`- \`props\`: ${propsText}`)

    const defaultsText = component.defaults.length > 0
      ? component.defaults.map((item) => `\`${item.name} = ${item.value}\``).join('、')
      : '无'
    lines.push(`- \`defaults\`: ${defaultsText}`)

    const eventsText = component.events.length > 0
      ? component.events
        .map((event) => (event.payload ? `\`${event.name}(${event.payload})\`` : `\`${event.name}\``))
        .join('、')
      : '无'
    lines.push(`- \`events\`: ${eventsText}`)

    const slotsText = component.slots.length > 0
      ? component.slots.map((slotName) => `\`${slotName}\``).join('、')
      : '无'
    lines.push(`- \`slots\`: ${slotsText}`)

    const relatedText = component.relatedComponents.length > 0
      ? component.relatedComponents.map((name) => `\`${name}\``).join('、')
      : '无'
    lines.push(`- \`relatedComponents\`: ${relatedText}`)

    const exampleText = component.exampleFiles.length > 0
      ? component.exampleFiles.map((file) => `\`${file}\``).join('、')
      : '无'
    lines.push(`- \`exampleFiles\`: ${exampleText}`)
    lines.push('')
  }

  return `${lines.join('\n').trim()}\n`
}

async function main() {
  await ensureDir(skillReferencesDir)

  const componentFiles = await mirrorLibrarySources()
  const { exampleMap, descriptionMap } = await generateComponentExamples()
  const catalogComponents = await buildCatalog(componentFiles, exampleMap, descriptionMap)

  const catalog = {
    skill: 'neu-ui',
    generatedAt: new Date().toISOString(),
    components: catalogComponents,
  }

  await writeText(
    path.join(skillReferencesDir, 'catalog.json'),
    `${JSON.stringify(catalog, null, 2)}\n`,
  )

  await writeText(
    path.join(skillReferencesDir, 'components.md'),
    renderComponentsMarkdown(catalogComponents),
  )

  const missingDocExamples = catalogComponents
    .filter((component) => component.exampleFiles.length === 0)
    .map((component) => component.name)

  if (missingDocExamples.length > 0) {
    console.warn(`Examples missing for: ${missingDocExamples.join(', ')}`)
  }

  const staticFiles = [
    path.join(skillReferencesDir, 'integration.md'),
    path.join(skillReferencesDir, 'page-patterns.md'),
    path.join(skillReferencesDir, 'theme.md'),
    path.join(skillLibraryRoot, 'style.css'),
  ]

  const status = await Promise.all(staticFiles.map((file) => pathExists(file)))
  if (status.includes(false)) {
    console.warn('Some static skill files are not ready yet. Run validation after they are added.')
  }

  console.log(`NeuUI skill synced: ${catalogComponents.length} components, ${exampleMap.size} documented example groups.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
