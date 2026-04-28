import path from 'node:path'
import {
  listFiles,
  mirroredComposableFiles,
  parseSlots,
  pathExists,
  readText,
  relativeToSkill,
  requiredStaticFiles,
  skillComponentExampleDir,
  skillLibraryComponentDir,
  skillLibraryComposableDir,
  skillLibraryRoot,
  skillReferencesDir,
  sourceComponentDir,
  sourceFileToComponentName,
  walkFiles,
} from './skill-common.mjs'

function fail(message) {
  throw new Error(message)
}

async function verifyStaticFiles() {
  for (const filePath of requiredStaticFiles) {
    if (!(await pathExists(filePath))) {
      fail(`Missing static skill file: ${filePath}`)
    }
  }
}

async function verifyMirroredFiles(sourceComponentFiles) {
  for (const sourceFile of sourceComponentFiles) {
    const targetFile = path.join(skillLibraryComponentDir, path.basename(sourceFile))
    if (!(await pathExists(targetFile))) {
      fail(`Missing mirrored component file: ${relativeToSkill(targetFile)}`)
    }
  }

  for (const fileName of mirroredComposableFiles) {
    const targetFile = path.join(skillLibraryComposableDir, fileName)
    if (!(await pathExists(targetFile))) {
      fail(`Missing mirrored composable: ${relativeToSkill(targetFile)}`)
    }
  }

  const styleFile = path.join(skillLibraryRoot, 'style.css')
  if (!(await pathExists(styleFile))) {
    fail('Missing mirrored style.css')
  }
}

async function verifyCatalog(sourceComponentFiles) {
  const catalogPath = path.join(skillReferencesDir, 'catalog.json')
  const componentsMarkdownPath = path.join(skillReferencesDir, 'components.md')

  if (!(await pathExists(catalogPath))) {
    fail('Missing references/catalog.json')
  }

  if (!(await pathExists(componentsMarkdownPath))) {
    fail('Missing references/components.md')
  }

  const catalog = JSON.parse(await readText(catalogPath))
  if (!Array.isArray(catalog.components)) {
    fail('catalog.json must contain a components array')
  }

  const expectedNames = sourceComponentFiles.map((file) => sourceFileToComponentName(path.basename(file))).sort()
  const actualNames = catalog.components.map((component) => component.name).sort()

  if (expectedNames.length !== actualNames.length) {
    fail(`Catalog component count mismatch. Expected ${expectedNames.length}, received ${actualNames.length}.`)
  }

  for (const expectedName of expectedNames) {
    if (!actualNames.includes(expectedName)) {
      fail(`Catalog is missing component: ${expectedName}`)
    }
  }

  const componentsMarkdown = await readText(componentsMarkdownPath)
  for (const expectedName of expectedNames) {
    if (!componentsMarkdown.includes(`## ${expectedName}`)) {
      fail(`components.md is missing section for ${expectedName}`)
    }
  }

  for (const component of catalog.components) {
    if (!Array.isArray(component.exampleFiles) || component.exampleFiles.length === 0) {
      fail(`Component ${component.name} must have at least one example file`)
    }

    for (const exampleFile of component.exampleFiles) {
      const absoluteExampleFile = path.join(skillReferencesDir, '..', exampleFile)
      if (!(await pathExists(absoluteExampleFile))) {
        fail(`Missing example file referenced by ${component.name}: ${exampleFile}`)
      }
    }
  }
}

function resolveLocalImport(filePath, importPath) {
  const candidates = []
  const basePath = path.resolve(path.dirname(filePath), importPath)
  const ext = path.extname(basePath)

  if (ext) {
    candidates.push(basePath)
  } else {
    candidates.push(basePath)
    candidates.push(`${basePath}.ts`)
    candidates.push(`${basePath}.js`)
    candidates.push(`${basePath}.vue`)
    candidates.push(path.join(basePath, 'index.ts'))
    candidates.push(path.join(basePath, 'index.js'))
  }

  return candidates
}

async function verifyLocalImports() {
  const files = await walkFiles(path.join(skillReferencesDir, '..', 'assets'))

  for (const filePath of files) {
    if (!/\.(vue|ts|js|css)$/.test(filePath)) {
      continue
    }

    const source = await readText(filePath)
    if (/['"]@\//.test(source)) {
      fail(`Alias import was not rewritten: ${relativeToSkill(filePath)}`)
    }

    for (const match of source.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)) {
      const importPath = match[1]
      const candidates = resolveLocalImport(filePath, importPath)
      const exists = await Promise.any(
        candidates.map(async (candidate) => {
          if (await pathExists(candidate)) {
            return true
          }
          throw new Error('not-found')
        }),
      ).catch(() => false)

      if (!exists) {
        fail(`Unresolved local import in ${relativeToSkill(filePath)}: ${importPath}`)
      }
    }
  }
}

async function verifyExamplesDirectory() {
  if (!(await pathExists(skillComponentExampleDir))) {
    fail('Missing generated component examples directory')
  }

  const exampleFiles = await listFiles(skillComponentExampleDir)
  if (exampleFiles.length === 0) {
    fail('Component examples directory is empty')
  }
}

async function main() {
  const sourceComponentFiles = await listFiles(sourceComponentDir)

  await verifyStaticFiles()
  await verifyMirroredFiles(sourceComponentFiles)
  await verifyExamplesDirectory()
  await verifyCatalog(sourceComponentFiles)
  await verifyLocalImports()

  console.log(`NeuUI skill validation passed for ${sourceComponentFiles.length} mirrored component entries.`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
