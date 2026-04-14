import fs from "fs";
import path from "path";

const dbPath = path.resolve(__dirname, "../../src/storage/db.json");

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  owner?: string;
  priority?: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
};

function readDB(): { tasks: Task[] } {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function writeDB(data: { tasks: Task[] }) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function createTask(title: string, options: any) {
  const db = readDB();
  const newTask: Task = {
    id: db.tasks.length + 1,
    title: title.replace(/^'+|'+$/g, ""),
    description: options.description || "",
    status: "pending",
    owner: options.owner || "",
    priority: options.priority || "medium",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.tasks.push(newTask);
  writeDB(db);

  return newTask;
}

export function listTasks(filter: any) {
  const db = readDB();
  let tasks = db.tasks;

  if (filter.status) {
    tasks = tasks.filter((t) => t.status === filter.status);
  }

  if (filter.mine) {
    tasks = tasks.filter((t) => t.owner === process.env.USER);
  }

  return tasks;
}

export function updateTask(id: number, updates: any) {
  const db = readDB();
  const task = db.tasks.find((t) => t.id === id);

  if (!task) throw new Error("Task not found");

  if (updates.status) task.status = updates.status;
  if (updates.title) task.title = updates.title;

  task.updated_at = new Date().toISOString();

  writeDB(db);
  return task;
}

export function assignTask(id: number, owner: string) {
  const db = readDB();
  const task = db.tasks.find((t) => t.id === id);

  if (!task) throw new Error("Task not found");

  task.owner = owner;
  task.updated_at = new Date().toISOString();

  writeDB(db);
  return task;
}

export function getTask(id: number) {
  const db = readDB();
  return db.tasks.find((t) => t.id === id);
}