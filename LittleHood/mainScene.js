class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');
        this.load.spritesheet('butterfly1', 'assets/butterfly1.png', { frameWidth: 66, frameHeight: 66});
        this.load.spritesheet('butterfly2', 'assets/butterfly2.png', { frameWidth: 66, frameHeight: 66});
        this.load.spritesheet('butterfly3', 'assets/butterfly3.png', { frameWidth: 66, frameHeight: 66});
        //this.load.audio('bgm2', 'assets/audio/bgm2.mp3');

    }

    create () {

        //this.bgmSound = this.sound.add('bgm2', {volume: 0.5});
        //this.bgmSound.loop = true;
        //this.bgmSound.play();


        this.add.image(0, 0, 'main').setOrigin(0, 0);
        
        //this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is mainScene");

        this.anims.create({
            key: 'butterfly1',
            frames: this.anims.generateFrameNumbers('butterfly1', { start: 1, end: 5 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'butterfly2',
            frames: this.anims.generateFrameNumbers('butterfly2', { start: 1, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'butterfly3',
            frames: this.anims.generateFrameNumbers('butterfly3', { start: 1, end: 5 }),
            frameRate: 3 ,
            repeat: -1
        });


        this.butterfly= this.add.group();

        this.butterfly.create(75, 480,'butterfly1').play('butterfly1');
        this.butterfly.create(540, 535,'butterfly2').play('butterfly2');
        this.butterfly.create(400, 168,'butterfly3').play('butterfly3');

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        var key5 = this.input.keyboard.addKey(53);
        var key6 = this.input.keyboard.addKey(54);
        var key7 = this.input.keyboard.addKey(55);
        var key8 = this.input.keyboard.addKey(56);


        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("reddieLevel1");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("reddieLevel2");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("yellowyLevel2");
            }, this ); 
            
        key4.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("blueyLevel2");
            }, this );   

        key5.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("reddieLevel3");
            }, this );        
                
        key6.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("yellowyLevel3");
            }, this ); 
        
        key7.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("blueyLevel3");
            }, this ); 

        key8.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("finalScene");
            }, this ); 
        
    


        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("mainScene");
        this.scene.start("main2Scene");
        }, this );


    }

}
