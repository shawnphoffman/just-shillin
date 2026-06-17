#!/usr/bin/env node
/**
 * Pre-commit hook:
 *   1. format every staged supported file with Prettier and re-stage it, so
 *      formatting drift can never enter a commit;
 *   2. typecheck (`tsc --noEmit`) when any TS file is staged.
 *
 * Wired up via simple-git-hooks (see package.json).
 *
 * Exits 0 on success (including the fast no-op path when nothing relevant is
 * staged). Exits 1 when Prettier or tsc fails.
 *
 * Notes:
 *   - The Prettier step re-stages whole files, so a partially-staged file
 *     (`git add -p`) will have its unstaged hunks pulled in as well.
 */

import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PRETTIER_EXT = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs|json|css|scss|md|mdx|ya?ml|html)$/

function getStagedFiles() {
	const out = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
		cwd: repoRoot,
		encoding: 'utf8',
	})
	return out
		.split('\n')
		.map(s => s.trim())
		.filter(Boolean)
}

function run(cmd, args) {
	const result = spawnSync(cmd, args, { cwd: repoRoot, stdio: 'inherit', env: process.env })
	if (result.status !== 0) {
		throw new Error(`${cmd} ${args.join(' ')} failed with status ${result.status}`)
	}
}

try {
	const staged = getStagedFiles()
	const hasTsStaged = staged.some(f => /\.(ts|tsx|mts|cts)$/.test(f))

	const prettierTargets = staged.filter(f => PRETTIER_EXT.test(f) && existsSync(resolve(repoRoot, f)))
	if (prettierTargets.length > 0) {
		console.log(`[precommit] prettier --write on ${prettierTargets.length} staged file(s)`)
		run('pnpm', ['exec', 'prettier', '--write', '--ignore-unknown', '--log-level', 'warn', ...prettierTargets])
		run('git', ['add', ...prettierTargets])
	}

	if (hasTsStaged) {
		console.log('[precommit] typechecking (tsc --noEmit)')
		run('pnpm', ['exec', 'tsc', '--noEmit'])
	}

	process.exit(0)
} catch (err) {
	console.error('[precommit] hook failed:')
	console.error(err?.message ?? err)
	console.error('Resolve the error above (format: `pnpm exec prettier --write .`; types: `pnpm exec tsc --noEmit`) and retry.')
	process.exit(1)
}
