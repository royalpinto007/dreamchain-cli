import { Command } from "commander";
import { getTask } from "../core/taskService";

const command = new Command("view");

command.argument("<id>").action((id) => {
  const task = getTask(Number(id));
  if (!task) {
    console.error(`Error: Task ${id} not found`);
    process.exit(1);
  }
  console.log(task);
});

export default command;