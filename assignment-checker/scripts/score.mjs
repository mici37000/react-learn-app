#!/usr/bin/env node
/**
 * Render the assignment scorecard table and compute the weighted overall grade.
 *
 * Usage:
 *   node score.mjs scores.json
 *   node score.mjs -            # read JSON from stdin
 *
 * Input JSON:
 *   {
 *     "criteria": [
 *       {"name": "Functional completeness", "weight": 35, "score": 80,
 *        "note": "All required filters work; export missing"}
 *     ]
 *   }
 *
 * `note` is optional. Weights must total 100 (0.01 tolerance allows for decimals).
 * Prints a markdown table plus the overall grade, ready to paste into the report.
 */

import { readFileSync } from 'node:fs'

const TOLERANCE = 0.01

function fail(message) {
  console.error(`error: ${message}`)
  process.exit(1)
}

function load(path) {
  let raw
  try {
    raw = readFileSync(path === '-' ? 0 : path, 'utf8')
  } catch (err) {
    fail(err.code === 'ENOENT' ? `no such file: ${path}` : `cannot read ${path}: ${err.message}`)
  }
  try {
    return JSON.parse(raw)
  } catch (err) {
    fail(`invalid JSON in ${path}: ${err.message}`)
  }
}

function validate(data) {
  if (typeof data !== 'object' || data === null || !('criteria' in data)) {
    fail('expected an object with a "criteria" array')
  }

  const criteria = data.criteria
  if (!Array.isArray(criteria) || criteria.length === 0) {
    fail('"criteria" must be a non-empty array')
  }

  criteria.forEach((item, index) => {
    const where = `criteria[${index}]`
    if (typeof item !== 'object' || item === null) fail(`${where} must be an object`)
    for (const field of ['name', 'weight', 'score']) {
      if (!(field in item)) fail(`${where} is missing "${field}"`)
    }
    if (typeof item.weight !== 'number' || Number.isNaN(item.weight)) {
      fail(`${where}.weight must be a number, got ${JSON.stringify(item.weight)}`)
    }
    if (typeof item.score !== 'number' || Number.isNaN(item.score)) {
      fail(`${where}.score must be a number, got ${JSON.stringify(item.score)}`)
    }
    if (item.score < 0 || item.score > 100) {
      fail(`${where}.score must be between 0 and 100, got ${item.score}`)
    }
    if (item.weight < 0) fail(`${where}.weight must not be negative, got ${item.weight}`)
  })

  const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0)
  if (Math.abs(totalWeight - 100) > TOLERANCE) {
    fail(
      `weights total ${trim(totalWeight)}, expected 100 - ` +
        'adjust the rubric so the criteria sum to 100%',
    )
  }

  return criteria
}

/** Drop trailing zeros: 35.0 -> "35", 12.5 -> "12.5". */
function trim(value) {
  return String(Number(value.toFixed(4)))
}

/** Keep pipes and newlines in notes from breaking the markdown table. */
function escape(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim()
}

function render(criteria) {
  const hasNotes = criteria.some((item) => item.note)

  const header = ['Criterion', 'Weight', 'Score', 'Weighted']
  const aligns = ['---', '---:', '---:', '---:']
  if (hasNotes) {
    header.push('Notes')
    aligns.push('---')
  }

  const lines = [`| ${header.join(' | ')} |`, `|${aligns.join('|')}|`]

  let overall = 0
  for (const item of criteria) {
    const weighted = (item.weight * item.score) / 100
    overall += weighted
    const row = [escape(item.name), `${trim(item.weight)}%`, trim(item.score), weighted.toFixed(1)]
    if (hasNotes) row.push(escape(item.note ?? ''))
    lines.push(`| ${row.join(' | ')} |`)
  }

  const total = ['**Overall**', '**100%**', '', `**${overall.toFixed(1)}**`]
  if (hasNotes) total.push('')
  lines.push(`| ${total.join(' | ')} |`)

  return { table: lines.join('\n'), overall }
}

const args = process.argv.slice(2)
if (args.length !== 1) {
  console.error('usage: node score.mjs <scores.json>   (or "-" for stdin)')
  process.exit(2)
}

const { table, overall } = render(validate(load(args[0])))
console.log(table)
console.log()
console.log(`**Overall grade: ${Math.round(overall)} / 100**`)
