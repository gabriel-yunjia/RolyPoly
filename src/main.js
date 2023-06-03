// Used code from "Phaser 3 Movement Studies" by Nathan Altice. I thought his way of 
//organizing files was super neat and nice too look at so I'm using his style and some of his code.

let cursors;
let keys;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
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
    scene: [Load, Scene1]
};

let game = new Phaser.Game(config);