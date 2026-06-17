#!/usr/bin/env node
/**
 * Commit-msg hook:
 *   1. reject agent attribution lines in commit messages;
 *   2. enforce Conventional Commits via commitlint.
 *
 * Wired up via simple-git-hooks (see package.json).
 */

import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const commitlint = resolve(repoRoot, 'node_modules', '.bin', 'commitlint')
const msgFile = process.argv[2]

if (!msgFile) {
	console.error('[commit-msg] missing commit message file path')
	process.exit(1)
}

const raw = readFileSync(msgFile, 'utf8')

const attributionPatterns = [
	[/co-authored-by:.*\b(cursor|claude|copilot|openai|anthropic|aider|devin)\b/i, 'Co-authored-by agent attribution'],
	[/\bgenerated with (cursor|claude|copilot)\b/i, 'Generated-with attribution'],
	[/\bmade-with:\s*cursor\b/i, 'Made-with attribution'],
	[/\bwritten with (cursor|claude|copilot)\b/i, 'Written-with attribution'],
	[/🤖/, 'Emoji agent attribution'],
]

for (const [pattern, label] of attributionPatterns) {
	if (pattern.test(raw)) {
		console.error(`[commit-msg] ${label} is not allowed.`)
		process.exit(1)
	}
}

const result = spawnSync(commitlint, ['--edit', msgFile], {
	cwd: repoRoot,
	stdio: 'inherit',
})

process.exit(result.status ?? 1)
