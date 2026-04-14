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

Clone the repo:

```bash
git clone <your-repo-link>
cd dreamchain-cli
```

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

This uses the `build` script in `package.json` (which runs `tsc`).

Link CLI globally:

```bash
npm link
```

## Usage

### Create a task

```bash
task create "setup node infra" --owner=victor --priority=high
```

### List all tasks

```bash
task list
```

### Filter tasks by status

```bash
task list --status=pending
```

### Update a task

```bash
task update 1 --status=in-progress
```

### Assign/Reassign a task

```bash
task assign 1 --owner=royal
```

### View a task

```bash
task view 1
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

All tasks are stored locally in:

```
src/storage/db.json
```

This keeps the tool simple and allows fast iteration without external dependencies.

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