import { Command } from "commander";
import { updateTask } from "../core/taskService";

const command = new Command("update");

command
  .argument("<id>")
  .option("--status <status>")
  .option("--title <title>")
  .action((id, options) => {
    try {
      const task = updateTask(Number(id), options);
      console.log(`✔ Task updated (#${task.id})`);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  });

export default command;