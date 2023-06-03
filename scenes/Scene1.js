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
        this.MAX_X_VEL = 250;   // pixels/second
        this.MAX_Y_VEL = 5000;
     
        this.JUMP_VELOCITY = -950;
        this.physics.world.gravity.y = 3000;

    
       


        
    

        // make ground tiles group
        this.ground = this.add.group();
        // Ground Floor
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        let stop = this.physics.add.sprite(tileSize*22, game.config.height - tileSize*2, 'groundTile').setScale(SCALE).setOrigin(0);
        stop.body.immovable = true;
        stop.body.allowGravity = false;
        this.ground.add(stop);



        // set up doors
        this.blueDoor = this.physics.add.sprite(tileSize*21, game.config.height - tileSize*2.8, 'blueDoor').setScale(SCALE).setOrigin(0);
        this.blueDoor.body.allowGravity = false;
        this.blueDoor.body.immovable = true;

        // set up physics with players and doors

        

        

        // set up Main Characters 
        this.waterBoy = this.physics.add.sprite(tileSize*4, game.config.height - tileSize*2, 'waterBoy').setScale(SCALE);
        this.waterBoy.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.waterBoy.setCollideWorldBounds(true);

        this.slug = this.physics.add.sprite(game.config.width - tileSize*4, game.config.height - tileSize*2, 'fireGirl').setScale(SCALE);
        this.slug.setMaxVelocity(this.MAX_X_VEL/3, this.MAX_Y_VEL);
        this.slug.setCollideWorldBounds(false);

        this.slug2 = this.physics.add.sprite(game.config.width - tileSize*10, game.config.height - tileSize*2, 'fireGirl').setScale(SCALE);
        this.slug2.setMaxVelocity(this.MAX_X_VEL/3, this.MAX_Y_VEL);
        this.slug2.setCollideWorldBounds(false);
        

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
            
                this.waterBoy.body.setVelocityY(this.JUMP_VELOCITY);
            
        });



  
        if(this.waterBoy.body.touching.down && this.keys.UP.isDown) {
            this.waterBoy.body.setVelocityY(this.JUMP_VELOCITY);

        }

    
       
        
    }
}