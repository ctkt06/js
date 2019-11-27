class finalScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'finalScene' });
    }

    preload() {
        //this.load.image('final','assets/finalScene.png');
        this.load.image('final','assets/finalScene2.png');
        this.load.spritesheet('butterfly2', 'assets/butterfly2.png', { frameWidth: 66, frameHeight: 66});
        //this.load.audio('bgm1', 'assets/audio/bgm1.mp3');
        
    }
    create () {

        
        this.add.image(0, 0, 'final').setOrigin(0, 0);

        //this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is finalScene");

        this.anims.create({
            key: 'butterfly2',
            frames: this.anims.generateFrameNumbers('butterfly2', { start: 1, end: 5 }),
            frameRate: 4 ,
            repeat: -1
        });


        this.butterfly= this.add.group();

        this.butterfly.create(450, 476,'butterfly2').play('butterfly2');

    

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto mainScene");
        this.scene.stop("finalScene");
        this.scene.start("mainScene");
        }, this );

    }

}
