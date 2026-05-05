import { Command } from "commander";
import { deleteTask } from "../core/taskService";

const command = new Command("delete");

command.argument("<id>").action((id) => {
  const parsed = Number(id);
  if (isNaN(parsed)) {
    console.error("Usage: dreamchain delete <id>");
    process.exit(1);
  }
  try {
    const task = deleteTask(parsed);
    console.log(`✔ Task deleted (#${task.id})`);
  } catch (err: any) {
    console.error("Error:", err.message);
    process.exit(1);
  }
});

export default command;