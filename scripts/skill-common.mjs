import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))

export const repoRoot = path.resolve(scriptDir, '..')
export const skillRoot = path.join(repoRoot, '.skills', 'neu-ui')
export const skillReferencesDir = path.join(skillRoot, 'references')
export const skillLibraryRoot = path.join(skillRoot, 'assets', 'library')
export const skillLibraryComponentDir = path.join(skillLibraryRoot, 'components', 'neu')
export const skillLibraryComposableDir = path.join(skillLibraryRoot, 'composables')
export const skillComponentExampleDir = path.join(skillRoot, 'assets', 'examples', 'components')
export const skillPageExampleDir = path.join(skillRoot, 'assets', 'examples', 'pages')

export const sourceComponentDir = path.join(repoRoot, 'src', 'components', 'neu')
export const sourceComposableDir = path.join(repoRoot, 'src', 'composables')
export const sourceDocDir = path.join(repoRoot, 'src', 'views', 'docs')
export const sourceStyleFile = path.join(repoRoot, 'src', 'style.css')

export const componentDocOverrides = {
  NeuFormItem: 'Form',
  NeuToastComponent: 'Toast',
  NeuTreeNode: 'Tree',
}

export const componentExampleOverrides = {
  NeuFormItem: 'NeuForm',
  NeuToastComponent: 'NeuToast',
  NeuTreeNode: 'NeuTree',
}

export const componentDescriptionOverrides = {
  NeuFormItem: 'NeuForm 的表单项容器组件，负责标签、错误信息和布局编排。',
  NeuToast: '命令式轻提示工具，适合在表单提交、操作反馈和状态通知场景中使用。',
  NeuToastComponent: 'NeuToast 的内部渲染组件，负责提示消息的样式、动画和关闭交互。',
  NeuTreeNode: 'NeuTree 的递归节点组件，负责层级节点的展开、选中和结构渲染。',
}

export const requiredStaticFiles = [
  path.join(skillRoot, 'SKILL.md'),
  path.join(skillReferencesDir, 'integration.md'),
  path.join(skillReferencesDir, 'page-patterns.md'),
  path.join(skillReferencesDir, 'theme.md'),
  path.join(skillPageExampleDir, 'login-page.vue'),
  path.join(skillPageExampleDir, 'settings-page.vue'),
  path.join(skillPageExampleDir, 'data-list-page.vue'),
]

export const mirroredComposableFiles = ['useOverlay.ts', 'useThemePalette.ts']

export function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/')
}

export function relativeToRepo(filePath) {
  return toPosixPath(path.relative(repoRoot, filePath))
}

export function relativeToSkill(filePath) {
  return toPosixPath(path.relative(skillRoot, filePath))
}

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

export async function emptyDir(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true })
  await ensureDir(dirPath)
}

export async function pathExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

export async function readText(filePath) {
  return fs.readFile(filePath, 'utf8')
}

export async function writeText(filePath, content) {
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content, 'utf8')
}

export async function listFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(dirPath, entry.name))
    .sort((left, right) => left.localeCompare(right))
}

export async function walkFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name)
      if (entry.isDirectory()) {
        return walkFiles(fullPath)
      }
      return [fullPath]
    }),
  )

  return nested.flat().sort((left, right) => left.localeCompare(right))
}

export function sourceFileToComponentName(fileName) {
  if (fileName === 'toast.ts') {
    return 'NeuToast'
  }
  return path.basename(fileName, path.extname(fileName))
}

export function componentNameToDocBase(componentName) {
  if (componentDocOverrides[componentName]) {
    return componentDocOverrides[componentName]
  }
  if (componentName === 'NeuToast') {
    return 'Toast'
  }
  return componentName.replace(/^Neu/, '')
}

export function componentNameToPrimaryExampleName(componentName) {
  return componentExampleOverrides[componentName] ?? componentName
}

export function sanitizeLibraryImports(source) {
  return source
    .replace(/from\s+(['"])@\/composables\//g, 'from $1../../composables/')
    .replace(/from\s+(['"])@\/lib\//g, 'from $1../../lib/')
}

export function rewriteExampleImports(source) {
  return source
    .replace(/from\s+(['"])(?:\.\/|(?:\.\.\/)+)components\/neu\//g, 'from $1../../library/components/neu/')
    .replace(/from\s+(['"])(?:\.\/|(?:\.\.\/)+)composables\//g, 'from $1../../library/composables/')
}

export function normalizeCodeSample(rawCode) {
  return rawCode
    .replace(/<\\\/script>/g, '</script>')
    .trim()
}

export function indentBlock(source, spaces = 2) {
  const prefix = ' '.repeat(spaces)
  return source
    .split(/\r?\n/)
    .map((line) => `${prefix}${line}`)
    .join('\n')
}

export function toKebabCase(value) {
  return value
    .replace(/Code$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

export function extractNamedTemplateStrings(source) {
  const blocks = []
  let searchIndex = 0

  while (searchIndex < source.length) {
    const constIndex = source.indexOf('const ', searchIndex)
    if (constIndex === -1) {
      break
    }

    const declarationMatch = /^const\s+([A-Za-z0-9_]+)\s*=\s*`/.exec(source.slice(constIndex))
    if (!declarationMatch) {
      searchIndex = constIndex + 6
      continue
    }

    const name = declarationMatch[1]
    let cursor = constIndex + declarationMatch[0].length
    let value = ''
    let escaped = false

    for (; cursor < source.length; cursor += 1) {
      const char = source[cursor]
      if (escaped) {
        value += char
        escaped = false
        continue
      }

      if (char === '\\') {
        value += char
        escaped = true
        continue
      }

      if (char === '`') {
        break
      }

      value += char
    }

    blocks.push({ name, value })
    searchIndex = cursor + 1
  }

  return blocks
}

export function extractDocImports(source) {
  const scriptMatch = source.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)
  if (!scriptMatch) {
    return ''
  }

  const topLevelScript = scriptMatch[1].split(/\nconst\s+/)[0]

  return topLevelScript
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().startsWith('import ') && !line.includes("CodeBlock"))
    .join('\n')
}

export function buildExampleSource(rawCode, docImports) {
  const imports = rewriteExampleImports(docImports).trim()
  const normalizedCode = rewriteExampleImports(normalizeCodeSample(rawCode))
  const scriptBlock = imports ? `<script setup lang="ts">\n${imports}\n</script>\n\n` : ''

  if (normalizedCode.includes('<script')) {
    return `${normalizedCode.replace('<script setup>', '<script setup lang="ts">')}\n`
  }

  if (normalizedCode.includes('<template')) {
    return `${scriptBlock}${normalizedCode}\n`
  }

  return `${scriptBlock}<template>\n  <div class="flex flex-wrap items-center gap-4">\n${indentBlock(normalizedCode, 4)}\n  </div>\n</template>\n`
}

export function firstMatch(source, pattern) {
  const match = source.match(pattern)
  return match ? match[1].trim() : ''
}

export function extractBalancedBlock(source, startIndex, openChar = '{', closeChar = '}') {
  let depth = 0
  let quote = ''
  let escaped = false

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index]

    if (quote) {
      if (escaped) {
        escaped = false
        continue
      }

      if (char === '\\') {
        escaped = true
        continue
      }

      if (char === quote) {
        quote = ''
      }
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }

    if (char === openChar) {
      depth += 1
      continue
    }

    if (char === closeChar) {
      depth -= 1
      if (depth === 0) {
        return source.slice(startIndex + 1, index)
      }
    }
  }

  return ''
}

export function extractPropsBlock(source) {
  const startIndex = source.indexOf('interface Props')
  if (startIndex === -1) {
    return ''
  }

  const braceIndex = source.indexOf('{', startIndex)
  if (braceIndex === -1) {
    return ''
  }

  return extractBalancedBlock(source, braceIndex)
}

export function extractDefaultsBlock(source) {
  const startIndex = source.indexOf('withDefaults(')
  if (startIndex === -1) {
    return ''
  }

  const braceIndex = source.indexOf('{', startIndex)
  if (braceIndex === -1) {
    return ''
  }

  return extractBalancedBlock(source, braceIndex)
}

export function parseObjectEntries(block) {
  const entries = []
  const lines = block.split(/\r?\n/)
  let current = ''

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//')) {
      continue
    }

    current += `${current ? ' ' : ''}${trimmed}`
    if (trimmed.endsWith(',')) {
      entries.push(current.replace(/,$/, '').trim())
      current = ''
    }
  }

  if (current) {
    entries.push(current.trim())
  }

  return entries
}

export function parseProps(source) {
  const block = extractPropsBlock(source)
  if (!block) {
    return []
  }

  return parseObjectEntries(block)
    .map((entry) => {
      const match = entry.match(/^([A-Za-z0-9_]+)(\??):\s*(.+)$/)
      if (!match) {
        return null
      }

      return {
        name: match[1],
        required: match[2] !== '?',
        type: match[3].trim(),
      }
    })
    .filter(Boolean)
}

export function parseDefaults(source) {
  const block = extractDefaultsBlock(source)
  if (!block) {
    return []
  }

  return parseObjectEntries(block)
    .map((entry) => {
      const match = entry.match(/^([A-Za-z0-9_]+):\s*(.+)$/)
      if (!match) {
        return null
      }

      return {
        name: match[1],
        value: match[2].trim(),
      }
    })
    .filter(Boolean)
}

export function parseEvents(source) {
  const match = source.match(/defineEmits<\{([\s\S]*?)\}>\(\)/)
  if (!match) {
    return []
  }

  return [...match[1].matchAll(/\(e:\s*'([^']+)'(?:,\s*([^)]+))?\):\s*void/g)].map((eventMatch) => ({
    name: eventMatch[1],
    payload: eventMatch[2]?.trim() ?? '',
  }))
}

export function parseSlots(source) {
  const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/)
  if (!templateMatch) {
    return []
  }

  const slots = new Set()
  for (const match of templateMatch[1].matchAll(/<slot\b([^>]*)>/g)) {
    const attrs = match[1]
    const staticName = attrs.match(/\bname="([^"]+)"/)
    const dynamicName = attrs.match(/\:name="([^"]+)"/)

    if (staticName) {
      slots.add(staticName[1])
      continue
    }

    if (dynamicName) {
      slots.add(`dynamic:${dynamicName[1]}`)
      continue
    }

    slots.add('default')
  }

  return [...slots]
}

export function parseRelatedComponents(source, componentName) {
  const components = new Set()

  for (const match of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    const importPath = match[1]
    const fileName = path.basename(importPath)

    if (fileName === 'toast' || fileName === 'toast.ts') {
      components.add('NeuToast')
      continue
    }

    const parsedName = path.basename(importPath, path.extname(importPath))
    if (parsedName.startsWith('Neu') && parsedName !== componentName) {
      components.add(parsedName)
    }
  }

  return [...components].sort((left, right) => left.localeCompare(right))
}

export function extractDocDescription(source) {
  const heading = firstMatch(source, /<h1[^>]*>([\s\S]*?)<\/h1>/)
  const descriptionRaw = firstMatch(source, /<p[^>]*>\s*([\s\S]*?)\s*<\/p>/)
  const description = descriptionRaw
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    heading,
    description,
  }
}
