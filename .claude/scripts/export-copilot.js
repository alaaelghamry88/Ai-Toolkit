#!/usr/bin/env node
/**
 * export-copilot.js
 *
 * Exports the matching stack variant of this toolkit to .github/copilot-instructions.md
 * Run once after setup, re-run after adding new skills.
 *
 * Usage: node .claude/scripts/export-copilot.js
 *
 * Output:
 *   .github/copilot-instructions.md  — single file consumed by GitHub Copilot
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

function stripFrontmatter(content) {
  // Remove YAML frontmatter (--- ... ---) for cleaner Copilot output
  return content.replace(/^---[\s\S]*?---\n/, '')
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

// ─── Build output ─────────────────────────────────────────────────────────────

const claudeDir = path.resolve(__dirname, '..')
const projectRoot = path.resolve(claudeDir, '..')
const githubDir = path.join(projectRoot, '.github')
ensureDir(githubDir)

const skills = collectSkills(path.join(claudeDir, 'skills'), stack)

const sections = []

sections.push(`# Copilot Instructions\n`)
sections.push(`> Auto-generated from .claude/. Do not edit directly.\n> Re-run: \`node .claude/scripts/export-copilot.js\`\n`)
sections.push(`## Project Config\n\`\`\`\n${fs.readFileSync(configPath, 'utf8').trim()}\n\`\`\`\n`)

const bundles = [...new Set(skills.map(s => s.bundle))]
for (const bundle of bundles) {
  sections.push(`## ${bundle} Bundle\n`)
  const bundleSkills = skills.filter(s => s.bundle === bundle)
  for (const skill of bundleSkills) {
    const content = stripFrontmatter(fs.readFileSync(skill.path, 'utf8'))
    sections.push(`### ${skill.name}\n${content.trim()}\n`)
  }
}

const output = sections.join('\n')
const outPath = path.join(githubDir, 'copilot-instructions.md')
fs.writeFileSync(outPath, output)

console.log(`\n✓ ${outPath}`)
console.log(`  ${skills.length} skills exported for stack: ${stack}`)
console.log('Never edit .github/copilot-instructions.md directly — re-run this script after changes.')
