# Dreamchain CLI (v1)

A lightweight CLI tool to manage execution tasks from discussions (e.g. WhatsApp) and ensure nothing gets lost.

This acts as a simple bridge between conversations and actual execution by converting actionable items into trackable tasks.

## Features

* Create tasks quickly from terminal
* List and filter tasks
* Update task status
* Assign/reassign ownership
* View task details
* Local persistence (JSON-based, no setup required)

## Installation

```bash
git clone <your-repo-link>
cd dreamchain-cli
npm install
npm run build
```

After publishing, install it globally with:

```bash
npm install -g dreamchain-cli
```

Or run it without installing globally:

```bash
npx dreamchain-cli dreamchain list
```

## Usage

### Create a task

```bash
dreamchain create "setup node infra" --owner=victor --priority=high
```

### List all tasks

```bash
dreamchain list
```

### Filter tasks by status

```bash
dreamchain list --status=pending
```

### Update a task

```bash
dreamchain update 1 --status=in-progress
```

### Assign/Reassign a task

```bash
dreamchain assign 1 --owner=royal
```

### View a task

```bash
dreamchain view 1
```

## Task Model

Each task contains:

* id
* title
* description
* status (pending / in-progress / completed)
* owner
* priority (low / medium / high)
* created_at
* updated_at

## Data Storage

All tasks are stored locally in `~/.dreamchain/db.json`.

This keeps the tool simple and allows fast iteration without external dependencies.

## Publishing

This package is ready to publish to npm with:

```bash
npm publish
```

Before publishing, make sure the `repository`, `homepage`, and `bugs` URLs in `package.json` point to the real GitHub repo.

## Release Checklist

1. Update the version in `package.json` if needed.
2. Run `npm install` and `npm run build`.
3. Verify the CLI works from `dist/index.js`.
4. Publish with `npm publish --access public`.

## Workflow

Typical usage flow:

```
WhatsApp discussion
→ actionable item identified
→ task create (CLI)
→ execution
→ task update / assign
```

This ensures tasks don’t get lost in chat and can be tracked properly.

---
