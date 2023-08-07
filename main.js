#!/usr/bin/env node

https: var spritesheet = require("spritesheet-js");
const fs = require("fs");
const readline = require("readline");

const inputFolder = process.argv[2];
const outputFolder = process.argv[3];
if (!inputFolder) throw new Error("No input folder specified");
if (!outputFolder) throw new Error("No output folder specified");

// prompt user input for anchor point
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Enter anchor point <x y> (separate x and y with spaces): ",
  function (anchorPoint) {
    rl.close();
    if (anchorPoint) {
      const [x, y] = anchorPoint.split(" ").map(n => parseInt(n))
      if (!x || !y) throw new Error("Invalid anchor point");
      console.log(`[*] Anchor point set to (${x}, ${y}).`)
      generateSpritesheet(inputFolder, outputFolder, { x, y } );
    } else {
      console.log("[x] Invalid input. Going with default value (0, 0).")
      generateSpritesheet(inputFolder, outputFolder);
    }
  }
);


function generateSpritesheet(inputFolder, outputFolder, anchor = { x: 0, y: 0 }) {
  spritesheet(
    `${inputFolder}/*.png`,
    { format: "json", path: outputFolder },
    function (err) {
      console.log(err);
      if (err) throw err;
      formatOutput(`${outputFolder}/spritesheet.json`, anchor);
      console.log("\x1b[32m", "[*] Spritesheet successfully generated");
      console.log("\x1b[37m", `Output folder: ${outputFolder}`);
    }
  );
}

function formatOutput(spritesheet, anchor = { x: 0, y: 0 }) {
  const json = fs.readFileSync(spritesheet, "utf8");
  const data = JSON.parse(json);
  const frames = data.frames;
  const animations = {};

  console.log("frames:", frames)
  // Generate animations
  for (const frame in frames) {
    console.log("frame:", frame)
    const newFrame = frame.replace(".png", "");
    frames[frame].anchor = anchor;
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
