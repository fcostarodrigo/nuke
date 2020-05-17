#!/usr/bin/env node

const yargs = require("yargs");
const nuke = require("./nuke");

function builder(command) {
  return command.positional("pathToDelete", {
    describe: "String with the path to delete",
    type: "string",
  });
}

function handler({ pathToDelete }) {
  try {
    nuke(pathToDelete);
  } catch (error) {
    console.error(error);
  }
}

yargs.command("* <pathToDelete>", false, builder, handler).parse();
