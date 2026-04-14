import { Command } from "commander";
import { getTask } from "../core/taskService";

const command = new Command("view");

command.argument("<id>").action((id) => {
  const task = getTask(Number(id));
  console.log(task);
});

export default command;