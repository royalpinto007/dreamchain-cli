import { Command } from "commander";
import { createTask } from "../core/taskService";

const command = new Command("create");

command
  .argument("<title>")
  .option("--description <desc>")
  .option("--owner <owner>")
  .option("--priority <priority>")
  .action((title, options) => {
    try {
      const task = createTask(title, options);
      console.log(`✔ Task created (#${task.id})`);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  });

export default command;