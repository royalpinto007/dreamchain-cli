import { Command } from "commander";
import { listTasks } from "../core/taskService";

const command = new Command("list");

command
  .option("--status <status>")
  .option("--mine")
  .action((options) => {
    try {
      const tasks = listTasks(options);
      console.table(tasks);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  });

export default command;