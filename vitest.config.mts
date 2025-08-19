import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'packages/**/?(*.)+(test).[tj]s',
      'packages/**/?(*.)+(test).[tj]sx',
      'packages/**/?(*.)+(spec).[tj]s',
      'packages/**/?(*.)+(spec).[tj]sx'
    ],
    environment: 'node',
    reporters: 'default'
  }
})