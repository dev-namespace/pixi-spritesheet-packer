#!/usr/bin/env node

https: var spritesheet = require("spritesheet-js");
const fs = require("fs");

const inputFolder = process.argv[2];
const outputFolder = process.argv[3];
if (!inputFolder) throw new Error("No input folder specified");
if (!outputFolder) throw new Error("No output folder specified");

generateSpritesheet(inputFolder, outputFolder);

function generateSpritesheet(inputFolder, outputFolder) {
  spritesheet(
    `${inputFolder}/*.png`,
    { format: "json", path: outputFolder },
    function (err) {
      console.log(err);
      if (err) throw err;
      formatOutput(`${outputFolder}/spritesheet.json`);
      console.log("\x1b[32m", "[*] Spritesheet successfully generated");
      console.log("\x1b[37m", `Output folder: ${outputFolder}`);
    }
  );
}

function formatOutput(spritesheet) {
  const json = fs.readFileSync(spritesheet, "utf8");
  const data = JSON.parse(json);
  const frames = data.frames;
  const animations = {};

  // Generate animations
  for (const frame in frames) {
    const newFrame = frame.replace(".png", "");
    frames[newFrame] = frames[frame];
    delete frames[frame];
    const animationName = newFrame.split("_").slice(0, -1).join("_");
    animations[animationName] = animations[animationName] || [];
    animations[animationName].push(newFrame);
  }

  fs.writeFileSync(
    spritesheet,
    JSON.stringify({ ...data, animations }, null, 2),
    "utf8"
  );
}
