// Used code from "Phaser 3 Movement Studies" by Nathan Altice. I thought his way of 
//organizing files was super neat and nice too look at so I'm using his style and some of his code.

let cursors;
let keys;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;
var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
browserWidth *= 0.95;
browserHeight *= 0.95;
// main game object
let config = {
    type: Phaser.WEBGL,
    width: browserWidth,
    height: browserHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Scene1],
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH}
};

let game = new Phaser.Game(config);

