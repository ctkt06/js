// collect flower,  wolfie
class yellowyLevel2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'yellowyLevel2' });
        this.flowerCount = 0;
        this.lifeCount = 3;
        this.isDead = false;

    }

    preload() {

        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map2', 'assets/level2.json');

        this.load.spritesheet('tiles', 'assets/tiles.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('player', 'assets/player2.png', {
            frameWidth: 42,
            frameHeight: 64
        });
         
        this.load.spritesheet('wolfie1', 'assets/wolfie.png', {
            frameWidth: 54,
            frameHeight: 68
        });
    
        this.load.spritesheet('wolfie2', 'assets/wolfie2.png', {
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
        this.load.audio('hit', 'assets/audio/hit.mp3');
        this.load.audio('pick', 'assets/audio/pick.mp3');

    }

    create() {


        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg");
        this.bg.setOrigin(0, 0);
        this.bg.setScrollFactor(0);
       
        // Load the tilemap to map variable
        this.map2 = this.make.tilemap({
            key: 'map2'
        });

        this.hitSound = this.sound.add('hit');
        this.pickSound = this.sound.add('pick');

        //this.bgmSound = this.sound.add('bgm1');
        //this.bgmSound.loop = true;
        //this.bgmSound.stop();


        
        var ladderTiles = this.map2.addTilesetImage('ladder');
        //this.ladderLayer = this.map1.createStaticLayer('ladderLayer', ladderTiles, 0, 0);

        // Must match tileSets name inside Tiled
        let Tiles = this.map2.addTilesetImage('tiles', 'tiles');

        // create the ground & platform layer
        this.groundLayer = this.map2.createDynamicLayer('groundLayer', Tiles, 0, 0);
        this.platformLayer = this.map2.createDynamicLayer('platformLayer', Tiles, 0, 0);
        //this.ladderLayer = this.map2.createDynamicLayer('ladderLayer', Tiles, 0, 0);
        this.ladderLayer = this.map2.createStaticLayer('ladderLayer', ladderTiles, 0, 0);



        // Set starting and ending position using object names in Tiled
        this.startPoint2 = this.map2.findObject("ObjectLayer", obj => obj.name === "startPoint");

        // create the player sprite    
        this.player = this.physics.add.sprite(200, 200, 'player');
        this.player.setBounce(0.1); // our this.player will bounce from items

        // small fix to our this.player images, we resize the physics body object slightly
        this.player.body.setSize(this.player.width, this.player.height);
        this.player.setCollideWorldBounds(true); // don't go out of the map  

        // Set this.player to starting position
        this.player.setPosition(this.startPoint2.x, this.startPoint2.y);

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
      this.flower.create(725, 3360, 'flower').setScale();
      this.flower.create(1578, 2400, 'flower').setScale();
      this.flower.create(647, 2784, 'flower').setScale();
      this.flower.create(454, 1824, 'flower').setScale();
      this.flower.create(1084, 2016, 'flower').setScale();
      this.flower.create(979, 1376, 'flower').setScale();
      this.flower.create(1899, 1376, 'flower').setScale();
      this.flower.create(369, 608, 'flower').setScale();
      this.flower.create(1582, 352, 'flower').setScale();
      this.flower.create(2135, 736, 'flower').setScale();
      


    // Collide platform with stars
    this.physics.add.collider(this.platformLayer, this.flower);
    this.physics.add.collider(this.groundLayer, this.flower);

    this.physics.add.overlap(this.player, this.flower,this.collectFlower, null, this );

   

        this.add.text(30,30, 'Level 2', {
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


        this.life3 = this.add.image(750,40, 'life').setScrollFactor(0);
        this.life2 = this.add.image(690,40,'life').setScrollFactor(0);
        this.life1 = this.add.image(630,40,'life').setScrollFactor(0);

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
            key: 'walk1',
            frames: this.anims.generateFrameNumbers('wolfie1'),
            frameRate: 20,
            yoyo: true,
            repeat: -1
        });

        // Add animation for wolfie
        this.anims.create({
            key: 'walk2',
            frames: this.anims.generateFrameNumbers('wolfie2'),
            frameRate: 20,
            yoyo: true,
            repeat: -1
        });
        


        // create wolfie physics group
        this.wolfie1 = this.physics.add.group();

        // Add members to wolfie group
        //this.wolfie1.create(2135, 736, 'wolfie1').setScale(1.5);
        this.wolfie1.create(182, 352, 'wolfie1').setScale(1.5);
        this.wolfie1.create(542, 992, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(235, 1376, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(332, 1376, 'wolfie1').setScale(1.5);
        this.wolfie1.create(775, 1376, 'wolfie1').setScale(1.5);
        this.wolfie1.create(148, 1824, 'wolfie1').setScale(1.5);
        this.wolfie1.create(210, 2400, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(1827, 2400, 'wolfie1').setScale(1.5);
        this.wolfie1.create(235, 2016, 'wolfie1').setScale(1.5);
        this.wolfie1.create(585, 2784, 'wolfie1').setScale(1.5);
        this.wolfie1.create(225, 3360, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(1988, 3680, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(1495, 3680, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(1182, 352, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(1182, 352, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(746, 3360, 'wolfie1').setScale(1.5);
        //this.wolfie1.create(277, 2784, 'wolfie1').setScale(1.5);

        
        // create wolfie physics group
        this.wolfie2 = this.physics.add.group();

        // Add members to wolfie group
        this.wolfie2.create(2135, 736, 'wolfie2').setScale(1.5);
        this.wolfie2.create(2135, 736, 'wolfie2').setScale(1.5);
        this.wolfie2.create(2135, 736, 'wolfie2').setScale(1.5);
        this.wolfie2.create(1182, 352, 'wolfie2').setScale(1.5);
        this.wolfie2.create(1182, 352, 'wolfie2').setScale(1.5);
        this.wolfie2.create(542, 992, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(2035, 1376, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(2332, 1376, 'wolfie2').setScale(1.5);
        this.wolfie2.create(1775, 1376, 'wolfie2').setScale(1.5);
        this.wolfie2.create(1148, 1824, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(2310, 2400, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(1827, 2400, 'wolfie2').setScale(1.5);
        this.wolfie2.create(2235, 2016, 'wolfie2').setScale(1.5);
        this.wolfie2.create(1585, 2784, 'wolfie2').setScale(1.5);
        this.wolfie2.create(2225, 3360, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(1988, 3680, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(1495, 3680, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(1182, 352, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(1182, 352, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(746, 3360, 'wolfie2').setScale(1.5);
        //this.wolfie2.create(1177, 2784, 'wolfie2').setScale(1.5);



        // Iterate all the children and play animation
        this.wolfie1.children.iterate(wolfie1 => {
            wolfie1.play('walk1')
        })

        // Iterate all the children and play animation
        this.wolfie2.children.iterate(wolfie2 => {
            wolfie2.play('walk2')
        })

        this.physics.add.overlap(this.player, this.wolfie1, this.hitWolfie, null, this );
        this.physics.add.overlap(this.player, this.wolfie2, this.hitWolfie, null, this );

         

        // Collides ground and platform with player
        this.physics.add.collider(this.groundLayer, this.player);
        this.physics.add.collider(this.platformLayer, this.player);
       

        // Add colider to ground and platform
        this.physics.add.collider(this.platformLayer, this.wolfie1);
        this.physics.add.collider(this.groundLayer, this.wolfie1);
        //this.physics.add.collider(this.wolfie, this.wolfie);
        this.physics.add.collider(this.player, this.wolfie1);

        // Add colider to ground and platform
        this.physics.add.collider(this.platformLayer, this.wolfie2);
        this.physics.add.collider(this.groundLayer, this.wolfie2);
        //this.physics.add.collider(this.wolfie, this.wolfie);
        this.physics.add.collider(this.player, this.wolfie2);


        // create wolfie physics group
      this.arrow = this.physics.add.group();

     // Add members to wolfie group
     this.arrow.create(297, 3380, 'arrowUp').setScale(1.5);
     this.arrow.create(1223.6, 3380, 'arrowRight').setScale(1.5);
     this.arrow.create(2177.6, 3380, 'arrowUp').setScale(1.5);
     this.arrow.create(1803.7, 3360, 'arrowUp').setScale(1.5);
     this.arrow.create(194.3, 2784, 'arrowUp').setScale(1.5);
     this.arrow.create(1007, 2784, 'arrowRight').setScale(1.5);
     this.arrow.create(741, 2784, 'arrowLeft').setScale(1.5);
     this.arrow.create(1589.6, 2784, 'arrowUp').setScale(1.5);
     this.arrow.create(1806.3, 2400, 'arrowRight').setScale(1.5);
     this.arrow.create(2232.9, 2400, 'arrowUp').setScale(1.5);
     this.arrow.create(392.3, 2208, 'arrowRight').setScale(1.5);
     this.arrow.create(2049.6, 2016, 'arrowDown').setScale(1.5);
     this.arrow.create(863, 1824, 'arrowLeft').setScale(1.5);
     this.arrow.create(763.3, 1376, 'arrowUp').setScale(1.5);
     this.arrow.create(2294.3, 1376, 'arrowUp').setScale(1.5);
     this.arrow.create(1403, 1376, 'arrowRight').setScale(1.5);
     this.arrow.create(1977.6, 736, 'arrowRight').setScale(1.5);
     this.arrow.create(694.3, 992, 'arrowUp').setScale(1.5);
     this.arrow.create(706, 608, 'arrowUp').setScale(1.5);
     this.arrow.create(946, 352, 'arrowRight').setScale(1.5);
      
      
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
        this.cameras.main.setBounds(0, 0, this.map2.widthInPixels, this.map2.heightInPixels);

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
   
        hitWolfie(player,wolfie) {
        //wolfie.disableBody(true, true);
        this.player.x = this.player.x + 150
        this.hitSound.play();
        this.lifeCount -= 1;
        console.log('Hit wolfie, deduct live, balance is',this.lifeCount);

    
        // Default is 3 lives
        if ( this.lifeCount === 2) {
            //this.hitSound.play();
            this.cameras.main.shake(300);
            this.life1.setVisible(false);
        } else if ( this.lifeCount === 1) {
            //this.hitSound.play();
            this.cameras.main.shake(300);
            this.life2.setVisible(false);
        } else if ( this.lifeCount === 0) {
            //this.hitSound.play();
            this.cameras.main.shake(500);
            this.life3.setVisible(false);
            this.isDead = true;
        }
    
        // No more lives, shake screen and restart the game
        if ( this.isDead ) {
        console.log("Player is dead!!!")
        // delay 1 sec
        this.time.delayedCall(2000,function() {
            // Reset counter before a restart
            this.isDead = false;
            this.lifeCount = 3;
            this.scene.start("gameoverScene2");
        },[], this);
        }
    
    }
    
    //removeWolfie(wolfie,flower) {
        //wolfie.disableBody(true, true);
    //}
    

    

    update() {

        //if ( this.player.x <= this.startPoint1.x ) {
        
            //console.log('Reached startPoint1, bgm1 stop ');
            //this.bgmSound.stop();
        //}
        
        
        // Make wolfie walk at speed 
        this.wolfie1.setVelocityX(80);
        this.wolfie2.setVelocityX(-80);
        
        // Check for end of screen at right , reset to left
        this.wolfie1.children.iterate(wolfie1 => {
            if (wolfie1.x > this.physics.world.bounds.width + 50) {
                wolfie1.x = -10;
            }
        });

        // Check for end of screen at right , reset to left
        this.wolfie2.children.iterate(wolfie2 => {
            if (wolfie2.x < -50) {
                wolfie2.x = this.physics.world.bounds.width - 50;
            }
        });




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
    console.log('after collect say 10 flowers, jump to yellowyLevel3');
    this.scene.stop("yellowyLevel2");
    this.scene.start("yellowyLevel3");
}
    }

     allowClimb(sprite, tile) {
        console.log('Allow Climb');
        //this.distance = Math.abs(this.player.x - (tile.pixelX + tile.width / 2));
        //console.log(this.player.x, tile.pixelX, this.distance);
    
        this.onLadder = true;
     }
     
    

}

