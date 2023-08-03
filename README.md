# pixi-spritesheet-packer

A spritesheet packer for the format expected by PIXI.js

## Dependencies

* [ImageMagick 6 (legacy)](https://legacy.imagemagick.org/)

## Usage

``` sh
git clone https://github.com/dev-namespace/pixi-spritesheet-packer.git
cd pixi-spritesheet-packer
npm install
node main.js <input_folder> <output_folder>
```

The input folder should contain .png frame files following this format:
`<animation_name>_<frame_number>.png`

#### Examples
* `walking_0.png`
* `walking_1.png`
* `walking_2.png`
* `attack_0.png`
* `attack_1.png`

#### Output 

The script will output a `spritesheet.png` and a `spritesheet.json` file that can be loaded by the PIXI's asset loader.
