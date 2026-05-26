#!/usr/bin/env node
/**
 * export-cursor.js
 *
 * Exports the matching stack variant of this toolkit to .cursor/
 * Run once after setup, re-run after adding new skills.
 *
 * Usage: node .claude/scripts/export-cursor.js
 *
 * Output:
 *   .cursor/rules/<bundle>.mdc   — one rule file per bundle
 *   .cursor/skills/<name>.md     — one skill file per skill
 */

const fs = require('fs')
const path = require('path')

// ─── Read config ─────────────────────────────────────────────────────────────

const configPath = path.resolve(__dirname, '../config.md')
if (!fs.existsSync(configPath)) {
  console.error('Error: .claude/config.md not found. Run from project root.')
  process.exit(1)
}

const config = {}
fs.readFileSync(configPath, 'utf8')
  .split('\n')
  .forEach(line => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) config[key.trim()] = rest.join(':').trim()
  })

const stack = config['stack'] || 'react'
console.log(`Exporting for stack: ${stack}`)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function collectSkills(baseDir, stackFilter) {
  const skills = []
  if (!fs.existsSync(baseDir)) return skills

  const bundles = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  for (const bundle of bundles) {
    const bundlePath = path.join(baseDir, bundle)
    const variants = ['shared', stackFilter]

    for (const variant of variants) {
      const variantPath = path.join(bundlePath, variant)
      if (!fs.existsSync(variantPath)) continue

      const skillDirs = fs.readdirSync(variantPath, { withFileTypes: true })
        .filter(d => d.isDirectory())

      for (const skillDir of skillDirs) {
        const skillMd = path.join(variantPath, skillDir.name, 'SKILL.md')
        if (fs.existsSync(skillMd)) {
          skills.push({ bundle, variant, name: skillDir.name, path: skillMd })
        }
      }
    }
  }

  return skills
}

// ─── Export ───────────────────────────────────────────────────────────────────

const claudeDir = path.resolve(__dirname, '..')
const projectRoot = path.resolve(claudeDir, '..')
const cursorSkillsDir = path.join(projectRoot, '.cursor', 'skills')
const cursorRulesDir = path.join(projectRoot, '.cursor', 'rules')

ensureDir(cursorSkillsDir)
ensureDir(cursorRulesDir)

const skills = collectSkills(path.join(claudeDir, 'skills'), stack)
let exported = 0

for (const skill of skills) {
  const content = fs.readFileSync(skill.path, 'utf8')
  const outName = `${skill.bundle.toLowerCase()}-${skill.name}.md`
  const outPath = path.join(cursorSkillsDir, outName)
  fs.writeFileSync(outPath, content)
  console.log(`  ✓ ${outPath}`)
  exported++
}

// Write a combined rules file per bundle
const bundles = [...new Set(skills.map(s => s.bundle))]
for (const bundle of bundles) {
  const bundleSkills = skills.filter(s => s.bundle === bundle)
  const rulesContent = bundleSkills
    .map(s => fs.readFileSync(s.path, 'utf8'))
    .join('\n\n---\n\n')
  const rulesPath = path.join(cursorRulesDir, `${bundle.toLowerCase()}.mdc`)
  fs.writeFileSync(rulesPath, rulesContent)
  console.log(`  ✓ ${rulesPath}`)
}

console.log(`\nExport complete. ${exported} skills exported for stack: ${stack}`)
console.log('Never edit .cursor/ directly — re-run this script after changes.')
