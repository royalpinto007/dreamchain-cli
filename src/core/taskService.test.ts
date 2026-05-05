import fs from "fs";
import path from "path";
import os from "os";
import { createTask, deleteTask, getTask, listTasks } from "./taskService";

const dbPath = path.join(os.homedir(), ".dreamchain", "db.json");

function resetDB(tasks: any[] = []) {
  const dataDir = path.join(os.homedir(), ".dreamchain");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify({ tasks }, null, 2));
}

afterEach(() => {
  resetDB();
});

describe("createTask - ID generation", () => {
  it("assigns id 1 when db is empty", () => {
    resetDB([]);
    const task = createTask("first", {});
    expect(task.id).toBe(1);
  });

  it("assigns max(existing ids) + 1", () => {
    resetDB([
      { id: 1, title: "a", status: "pending", created_at: "", updated_at: "" },
      { id: 3, title: "b", status: "pending", created_at: "", updated_at: "" },
    ]);
    const task = createTask("new", {});
    expect(task.id).toBe(4);
  });

  it("assigns id 4 after deleting task 2 from [1,2,3]", () => {
    resetDB([
      { id: 1, title: "a", status: "pending", created_at: "", updated_at: "" },
      { id: 2, title: "b", status: "pending", created_at: "", updated_at: "" },
      { id: 3, title: "c", status: "pending", created_at: "", updated_at: "" },
    ]);
    deleteTask(2);
    const task = createTask("new", {});
    expect(task.id).toBe(4);
  });
});

describe("deleteTask", () => {
  it("removes the task and returns it", () => {
    resetDB([
      { id: 1, title: "a", status: "pending", created_at: "", updated_at: "" },
      { id: 2, title: "b", status: "pending", created_at: "", updated_at: "" },
    ]);
    const deleted = deleteTask(1);
    expect(deleted.id).toBe(1);
    expect(getTask(1)).toBeUndefined();
  });

  it("throws with expected message for non-existent id", () => {
    resetDB([]);
    expect(() => deleteTask(99)).toThrow("Task 99 not found");
  });

  it("deleted task no longer appears in listTasks", () => {
    resetDB([
      { id: 1, title: "a", status: "pending", created_at: "", updated_at: "" },
      { id: 2, title: "b", status: "pending", created_at: "", updated_at: "" },
    ]);
    deleteTask(2);
    const tasks = listTasks({});
    expect(tasks.find((t) => t.id === 2)).toBeUndefined();
    expect(tasks.length).toBe(1);
  });

  it("deleting last task then creating assigns id 1", () => {
    resetDB([
      { id: 5, title: "a", status: "pending", created_at: "", updated_at: "" },
    ]);
    deleteTask(5);
    const task = createTask("fresh", {});
    expect(task.id).toBe(1);
  });
});