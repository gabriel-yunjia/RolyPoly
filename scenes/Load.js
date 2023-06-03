class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        this.load.image('fireGirl', 'fireGirl.png');
        this.load.image('waterBoy' , 'waterBoy.png');
        this.load.image('groundTile', 'groundTile.png');
        this.load.image('blueDoor', 'blueDoor.png');
        this.load.image('redDoor', 'redDoor.png');
        this.load.image('greenDoor', 'greenDoor.png');
        this.load.image('platform', 'platform.png');
        this.load.image('button', "button.png");
        this.load.image('pressedButton', "pressedButton.png");
        this.load.image('purplePlatform', 'purplePlatform.png');
        this.load.image('purpleButton', "purpleButton.png");
        this.load.image('purplePressedButton', "purplePressedButton.png");
        this.load.image('blueGate' , 'blueGate.png');
        this.load.image('redGate' , 'redGate.png');
        this.load.image('redButton', "redButton.png");
        this.load.image('redPressedButton', "pressedRedButton.png");
        this.load.image('blueButton', "blueButton.png");
        this.load.image('bluePressedButton', "pressedBlueButton.png");
    }

    create() {
        
        this.scene.start('Scene1');
    }
}