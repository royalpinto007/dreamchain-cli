import { Command } from "commander";
import { assignTask } from "../core/taskService";

const command = new Command("assign");

command
  .argument("<id>")
  .option("--owner <owner>")
  .action((id, options) => {
    try {
      const task = assignTask(Number(id), options.owner);
      console.log(`✔ Task assigned (#${task.id} → ${task.owner})`);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  });

export default command;