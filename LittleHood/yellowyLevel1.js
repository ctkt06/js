// collect flower,  wolfie
class yellowyLevel1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'yellowyLevel1' });
        this.flowerCount = 0;
        //this.lifeCount = 3;
        //this.isDead = false;

    }

    preload() {

        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map1', 'assets/level1.json');

        this.load.spritesheet('tiles', 'assets/tiles.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        
        this.load.spritesheet('player', 'assets/player2.png', {
            frameWidth: 42,
            frameHeight: 64
        });
        

        this.load.spritesheet('wolfie', 'assets/wolfie2.png', {
            frameWidth: 54,
            frameHeight: 68
        });
        



        this.load.image('bg','assets/background.png');
        this.load.image('flower', 'assets/flower.png');
        this.load.image('ladder', 'assets/ladder.png');
        this.load.image('life','assets/life.png');

        this.load.image('arrowUp','assets/arrowUp.png');
        this.load.image('arrowDown','assets/arrowDown.png');
        this.load.image('arrowLeft','assets/arrowLeft.png');
        this.load.image('arrowRight','assets/arrowRight.png');

        //this.load.audio('bgm2','assets/bgm2.mp3');
        //this.load.audio('bgm1','assets/bgm1.mp3');
        //this.load.audio('hit', 'assets/audio/hit.mp3');
        this.load.audio('pick', 'assets/audio/pick.mp3');

    }

    create() {


        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg");
        this.bg.setOrigin(0, 0);
        this.bg.setScrollFactor(0);
       
        // Load the tilemap to map variable
        this.map1 = this.make.tilemap({
            key: 'map1'
        });

        //this.hitSound = this.sound.add('hit');
        this.pickSound = this.sound.add('pick');

        //this.bgmSound = this.sound.add('bgm1');
        //this.bgmSound.loop = true;
        //this.bgmSound.stop();


        
        var ladderTiles = this.map1.addTilesetImage('ladder');
        //this.ladderLayer = this.map1.createStaticLayer('ladderLayer', ladderTiles, 0, 0);

        // Must match tileSets name inside Tiled
        let Tiles = this.map1.addTilesetImage('tiles', 'tiles');

        // create the ground & platform layer
        this.groundLayer = this.map1.createDynamicLayer('groundLayer', Tiles, 0, 0);
        this.platformLayer = this.map1.createDynamicLayer('platformLayer', Tiles, 0, 0);
        //this.ladderLayer = this.map1.createDynamicLayer('ladderLayer', Tiles, 0, 0);
        this.ladderLayer = this.map1.createStaticLayer('ladderLayer', ladderTiles, 0, 0);



        // Set starting and ending position using object names in Tiled
        this.startPoint1 = this.map1.findObject("ObjectLayer", obj => obj.name === "startPoint");

        // create the player sprite    
        this.player = this.physics.add.sprite(200, 200, 'player');
        this.player.setBounce(0.1); // our this.player will bounce from items

        // small fix to our this.player images, we resize the physics body object slightly
        this.player.body.setSize(this.player.width, this.player.height);
        this.player.setCollideWorldBounds(true); // don't go out of the map  

        // Set this.player to starting position
        this.player.setPosition(this.startPoint1.x, this.startPoint1.y);

        window.player = this.player;


        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // Setup collider for ground and platform layer
        this.groundLayer.setCollisionByProperty({
            floor: true
        });
        this.platformLayer.setCollisionByProperty({
            floor: true
        });


      // create wolfie physics group
      this.flower = this.physics.add.group();

       // Add members to wolfie group
       this.flower.create(40, 416, 'flower').setScale();
       this.flower.create(450, 416, 'flower').setScale();
       this.flower.create(1998, 736, 'flower').setScale();
       this.flower.create(99, 800, 'flower').setScale();
       this.flower.create(1350, 736, 'flower').setScale();
       this.flower.create(242, 1184, 'flower').setScale();
       this.flower.create(798, 1184, 'flower').setScale();
       this.flower.create(1966, 1760, 'flower').setScale();
       this.flower.create(502, 1568, 'flower').setScale();
       this.flower.create(350, 2144, 'flower').setScale(); 


    // Collide platform with stars
    this.physics.add.collider(this.platformLayer, this.flower);
    this.physics.add.collider(this.groundLayer, this.flower);

    this.physics.add.overlap(this.player, this.flower,this.collectFlower, null, this );

   

        this.add.text(30,30, 'Level 1', {
            font: '20px Courier New',
            fill: '#000000'
        }).setScrollFactor(0);

       

         // this text will show the score
        this.flowerText = this.add.text(105, 75, '0', {
        fontSize: '24px Courier New',
        fill: '#ffffff'
        });
        // fix the text to the camera
        this.flowerText.setScrollFactor(0);
        this.flowerText.visible = true;


        //this.life3 = this.add.image(750,40, 'life').setScrollFactor(0);
        //this.life2 = this.add.image(690,40,'life').setScrollFactor(0);
        //this.life1 = this.add.image(630,40,'life').setScrollFactor(0);

        this.flower = this.add.image(60,90, 'flower').setScrollFactor(0);




        // Create animation for player
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{
                key: 'player',
                frame: this.anims.generateFrameNumbers('player', {
                    start: 4,
                    end:4
                }),
            }],
            frameRate: 20,
            repeat: false
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });


        // Add animation for wolfie
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('wolfie'),
            frameRate: 20,
            yoyo: true,
            repeat: -1
        });
        


        // create wolfie physics group
        //this.wolfie = this.physics.add.group();

        // Add members to wolfie group
        //this.wolfie.create(2035, 736, 'wolfie').setScale(1.5);
        //this.wolfie.create(2035, 736, 'wolfie').setScale(1.5);
        //this.wolfie.create(2035, 1184, 'wolfie').setScale(1.5);
        //this.wolfie.create(2035, 1184, 'wolfie').setScale(1.5);
        //this.wolfie.create(2035, 1760, 'wolfie').setScale(1.5);
        //this.wolfie.create(2035, 1760, 'wolfie').setScale(1.5);
        //this.wolfie.create(1090, 2000, 'wolfie').setScale(1.5);



        // Iterate all the children and play animation
        //this.wolfie.children.iterate(wolfie => {
            //wolfie.play('walk')
        //})

        //this.physics.add.overlap(this.player, this.wolfie, this.hitWolfie, null, this );

         

        // Collides ground and platform with player
        this.physics.add.collider(this.groundLayer, this.player);
        this.physics.add.collider(this.platformLayer, this.player);
       

        // Add colider to ground and platform
        //this.physics.add.collider(this.platformLayer, this.wolfie);
        //this.physics.add.collider(this.groundLayer, this.wolfie);
        //this.physics.add.collider(this.wolfie, this.wolfie);
        //this.physics.add.collider(this.player, this.wolfie);


        this.arrow = this.physics.add.group();

      // Add members to wolfie group
      this.arrow.create(990, 736, 'arrowUp').setScale(1.5);
      this.arrow.create(1670.9, 736, 'arrowLeft').setScale(1.5);
      this.arrow.create(553.6, 1184, 'arrowUp').setScale(1.5);
      this.arrow.create(1906.9, 1184, 'arrowUp').setScale(1.5);
      this.arrow.create(1108, 1184, 'arrowLeft').setScale(1.5);
      this.arrow.create(1391.4, 1184, 'arrowRight').setScale(1.5);
      this.arrow.create(1403, 1760, 'arrowUp').setScale(1.5);
      this.arrow.create(1097, 1568, 'arrowLeft').setScale(1.5);
      this.arrow.create(2058.6, 2144, 'arrowUp').setScale(1.5);
      this.arrow.create(988.6, 2144, 'arrowRight').setScale(1.5);
      
      
      // Collide platform with stars
      this.physics.add.collider(this.platformLayer, this.arrow);
      this.physics.add.collider(this.groundLayer, this.arrow);

        
    
        
        // See JSON file for ladder, "firstgid":13
        this.ladderLayer.setTileIndexCallback(13, this.allowClimb, this);
        this.physics.add.overlap(this.ladderLayer, this.player );

        window.ladder = this.ladderLayer;



        // Setup cursors, up, down, left , right
        this.cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map1.widthInPixels, this.map1.heightInPixels);

        // make the camera follow the this.player
        this.cameras.main.startFollow(this.player);

        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#87ceeb');

    }
    
        collectFlower(player, flower) {
        flower.disableBody(true, true);
        this.pickSound.play();
        this.flowerCount += 1; // add 10 points to the score
        console.log(this.flowerCount);
        this.flowerText.setText(this.flowerCount); // set the text to show the current score
        return false;
    }
   
        //hitWolfie(player,wolfie) {
        //wolfie.disableBody(true, true);
        //this.player.x = this.player.x - 200
        //this.hitSound.play();
        //this.lifeCount -= 1;
        //console.log('Hit wolfie, deduct live, balance is',this.lifeCount);

    
        // Default is 3 lives
        //if ( this.lifeCount === 2) {
            //this.hitSound.play();
            //this.cameras.main.shake(300);
            //this.life1.setVisible(false);
        //} else if ( this.lifeCount === 1) {
            //this.hitSound.play();
            //this.cameras.main.shake(300);
            //this.life2.setVisible(false);
        //} else if ( this.lifeCount === 0) {
            //this.hitSound.play();
            //this.cameras.main.shake(500);
            //this.life3.setVisible(false);
            //this.isDead = true;
        //}
    
        // No more lives, shake screen and restart the game
        //if ( this.isDead ) {
        //console.log("Player is dead!!!")
        // delay 1 sec
        //this.time.delayedCall(2000,function() {
            // Reset counter before a restart
            //this.isDead = false;
            //this.lifeCount = 3;
            //this.scene.start("gameoverScene");
        //},[], this);
        ///}
    
    //}
    
    //removeWolfie(wolfie,flower) {
        //wolfie.disableBody(true, true);
    //}
    

    

    update() {

        //if ( this.player.x <= this.startPoint1.x ) {
        
            //console.log('Reached startPoint1, bgm1 stop ');
            //this.bgmSound.stop();
        //}
        
        
        // Make wolfie walk at speed 
        //this.wolfie.setVelocityX(-80);
        
        // Check for end of screen at right , reset to left
        //this.wolfie.children.iterate(wolfie => {
            //if (wolfie.x > this.physics.world.bounds.width + 50) {
                //wolfie.x = -10;
            //}
        //});



        if (this.onLadder) {
            //console.log('Gravity 0');
            this.player.setGravityY(0);
            // Prevent any gravity on body
            this.player.body.setAllowGravity(false);
        } else {
            //console.log('Gravity 300');
            this.player.setGravityY(300);
            // Re-enable gravity on body
            this.player.body.setAllowGravity(true);
        }
    
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        } else if (this.cursors.up.isDown && this.onLadder == false) {
            // Jump
            this.player.body.setVelocityY(-300);
        } else if (this.cursors.up.isDown && this.onLadder == true) {
            // On ladder, climb up , -Y
            this.player.anims.play('idle', true);
            this.player.setGravityY(0);
            this.player.setVelocityY(-100);
        } else if (this.cursors.down.isDown && this.onLadder == true) {
            // On ladder, climb down , +Y
            this.player.anims.play('idle', true);
            this.player.setGravityY(0);
            this.player.setVelocityY(100);
        } else if (this.onLadder) {
            // Disable gravity on body
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.player.anims.play('idle', true);
        } else {
            this.player.body.setVelocityX(0);
            this.player.anims.play('idle', true);
        }
    
        // Reset onLadder flag 
        this.onLadder = false;

        // Check for more then 5 stars
    if ( this.flowerCount > 9  ) {
    //this.bgmSound.stop();
    console.log('after collect say 10 flowers, jump to yellowyLevel2');
    this.scene.stop("yellowyLevel1");
    this.scene.start("yellowyLevel2");
}
    }

     allowClimb(sprite, tile) {
        console.log('Allow Climb');
        //this.distance = Math.abs(this.player.x - (tile.pixelX + tile.width / 2));
        //console.log(this.player.x, tile.pixelX, this.distance);
    
        this.onLadder = true;
     }
     
    

}

