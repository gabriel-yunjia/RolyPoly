class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
    }
    waterBoy;
    gameEnded = false;
    create() {
        
        // variables and settings

        this.keys = this.input.keyboard.addKeys("W,A,S,D,UP,LEFT, RIGHT");
        this.ACCELERATION = 999999;
        this.MAX_X_VEL = browserWidth / 4.5;   // pixels/second
        this.MAX_Y_VEL = browserHeight * 1.5;
     
        this.JUMP_VELOCITY = -950;
        this.physics.world.gravity.y = 2000;

        // make ground tiles group
        this.ground = this.add.group();
        // Ground Floor
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        for(let i = 0; i < 5; i += 1) {
            let groundTile = this.physics.add.sprite(i*tileSize + browserWidth * 0.88, game.config.height * 0.7, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        let stop = this.physics.add.sprite(browserWidth * 0.98, game.config.height* 0.65, 'groundTile').setScale(SCALE).setOrigin(0);
        stop.body.immovable = true;
        stop.body.allowGravity = false;
        this.ground.add(stop);

        // set up doors
        this.blueDoor = this.physics.add.sprite(browserWidth * 0.955, game.config.height * 0.61, 'blueDoor').setScale(SCALE).setOrigin(0);
        this.blueDoor.body.allowGravity = false;
        this.blueDoor.body.immovable = true;

        // set up physics with players and doors

        // set up Main Characters 
        this.waterBoy = this.physics.add.sprite(game.config.width* 0.1, game.config.height * 0.75, 'waterBoy');
        this.waterBoy.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.waterBoy.setCollideWorldBounds(true);

        this.slug = this.physics.add.sprite(game.config.width * 0.5, game.config.height * 0.75, 'fireGirl');
        this.slug.setMaxVelocity(this.MAX_X_VEL / 5, this.MAX_Y_VEL);
        this.slug.setCollideWorldBounds(false);

        this.slug2 = this.physics.add.sprite(game.config.width * 0.8, game.config.height * 0.75, 'fireGirl');
        this.slug2.setMaxVelocity(this.MAX_X_VEL / 5, this.MAX_Y_VEL);
        this.slug2.setCollideWorldBounds(false);

        // Calculate the scale factors based on screen size and desired ratio
        var scaleX = game.config.width / 249;
        var scaleY = game.config.height / 129;
        var scale = Math.min(scaleX, scaleY) * 0.1;

        this.waterBoy.setScale(scale) * 0.1;

        var SlugscaleX = game.config.width / 340;
        var SlugscaleY = game.config.height / 383;
        var Slugscale = Math.min(SlugscaleX, SlugscaleY) * 0.1;

        this.slug.setScale(Slugscale);
        this.slug2.setScale(Slugscale);


        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.waterBoy, this.ground);
        this.physics.add.collider(this.slug, this.ground);
        this.physics.add.collider(this.slug2, this.ground);
     

        //slugl movements
    }

    changeSprite(waterBoy, collidedObject) {
        collidedObject.setTexture('greenDoor');
        waterBoy.body.setDragX(999999);
        }

    slugCollide(sprite, collidedObject) {
        sprite.setActive(false).setVisible(false);
        this.gameEnded = true

        this.time.addEvent({
            delay: 500, // time in milliseconds
            callback: () => {
                this.scene.restart();
            },
            callbackScope: this
        });
        }    
    slug2Collide(sprite, collidedObject) {
        sprite.setActive(false).setVisible(false);
        this.gameEnded = true

        this.time.addEvent({
            delay: 1000, // time in milliseconds
            callback: () => {
                this.scene.restart();
            },
            callbackScope: this
        });

        }  

    update() {
        
        this.physics.add.overlap(this.waterBoy, this.blueDoor, this.changeSprite, null, this);
            
        this.physics.add.overlap(this.waterBoy, this.slug, this.slugCollide, null, this);
        this.physics.add.overlap(this.waterBoy, this.slug2, this.slug2Collide, null, this);


        if ( this.blueDoor.texture.key === 'greenDoor') {
            this.time.addEvent({
                delay: 1500, // time in milliseconds
                callback: () => {
                    this.scene.restart();
                },
                callbackScope: this
            });
        }

        this.slug.body.setAccelerationX(-this.ACCELERATION/2);
        this.slug2.body.setAccelerationX(-this.ACCELERATION/2);
        this.waterBoy.body.setAccelerationX(this.ACCELERATION/2)

        this.input.on('pointerdown', () => {
            if (this.waterBoy.body.touching.down) {
              this.waterBoy.body.setVelocityY(this.JUMP_VELOCITY);
            }
        });
          
        if(this.waterBoy.body.touching.down && this.keys.UP.isDown) {
            this.waterBoy.body.setVelocityY(this.JUMP_VELOCITY);
        }

    
       
        
    }
}