#!/usr/bin/env node

import { Command } from "commander";
import createCommand from "./commands/create";
import listCommand from "./commands/list";
import updateCommand from "./commands/update";
import assignCommand from "./commands/assign";
import viewCommand from "./commands/view";

const program = new Command();

program
  .name("task")
  .description("Simple task CLI")
  .version("1.0.0");

program.addCommand(createCommand);
program.addCommand(listCommand);
program.addCommand(updateCommand);
program.addCommand(assignCommand);
program.addCommand(viewCommand);

program.parse();
