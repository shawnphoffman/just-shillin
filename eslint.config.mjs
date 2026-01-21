import nextTypescript from "eslint-config-next/typescript";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import shawnEslint from '@shawnphoffman/eslint-config/eslint.config.mjs'
import react from 'eslint-plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = [...nextTypescript, ...nextCoreWebVitals, shawnEslint[0], {
    plugins: {
        react,
    },
    rules: {
        'react/no-unescaped-entities': 'warn',
    },
}, {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}]

export default config
