## Commit Message Generator (CMG)

Monorepo containing `@cmg/core` and `cmg-cli`.

### Quick Start

1. Install dependencies:

```bash
npm install
```

2. Build packages:

```bash
npm run build
```

3. Use CLI (from a git repo with staged changes):

```bash
npx cmg commit
```

or print suggestion only:

```bash
npx cmg print
```

### Packages

- `@cmg/core`: diff parser, change classifier, message builder
- `cmg-cli`: interactive CLI powered by Inquirer and Commander

### Security & Privacy

- Works offline, shells out to `git` only.
- No data leaves your machine.
- Sanitizes user inputs to avoid control characters in commit messages.

### License

MIT

### Author

Cooper Braun
CS @ Gonzaga '27