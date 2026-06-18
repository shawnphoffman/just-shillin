import { run, claudeCode } from '@ai-hero/sandcastle'
import { docker } from '@ai-hero/sandcastle/sandboxes/docker'

// Simple loop: an agent that picks open issues one by one and closes them.
// Run this with: npx tsx .sandcastle/main.mts
// Or add to package.json scripts: "sandcastle": "npx tsx .sandcastle/main.mts"

await run({
	// A name for this run, shown as a prefix in log output.
	name: 'just-workin',

	// Sandbox provider — runs the agent inside an isolated container.
	// node_modules is bind-mounted from .sandcastle/node_modules so Linux deps
	// persist across runs instead of reinstalling every time.
	sandbox: docker({
		mounts: [
			{
				hostPath: '.sandcastle/node_modules',
				sandboxPath: 'node_modules',
			},
		],
	}),

	// The agent provider. Pass a model string to claudeCode() — sonnet balances
	// capability and speed for most tasks. Switch to claude-opus-4-7 for harder
	// problems, or claude-haiku-4-5-20251001 for speed.
	agent: claudeCode('claude-opus-4-7'),

	// Path to the prompt file. Shell expressions inside are evaluated inside the
	// sandbox at the start of each iteration, so the agent always sees fresh data.
	promptFile: './.sandcastle/prompt.md',

	// Maximum number of iterations (agent invocations) to run in a session.
	// Each iteration works on a single issue. Increase this to process more issues
	// per run, or set it to 1 for a single-shot mode.
	maxIterations: 3,

	// Branch strategy — merge-to-head creates a temporary branch for the agent
	// to work on, then merges the result back to HEAD when the run completes.
	branchStrategy: { type: 'merge-to-head' },

	// Gitignored registry auth — worktrees don't include it, but private packages
	// (@awesome.me, @shawnphoffman) need it for pnpm install.
	copyToWorktree: ['.npmrc'],

	// Install deps into the persistent node_modules volume. First run is slow;
	// later runs are incremental when the lockfile hasn't changed.
	hooks: {
		sandbox: {
			onSandboxReady: [
				{
					command: 'pnpm install --frozen-lockfile',
					timeoutMs: 300_000,
				},
			],
		},
	},
})
