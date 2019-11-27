class final2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'final2Scene' });
    }

    preload() {

        //this.load.image('final2','assets/final2Scene.png');
        this.load.spritesheet('finalfinal', 'assets/finalfinalScene.png', { frameWidth: 800, frameHeight: 600});
        //this.load.audio('bgm1', 'assets/audio/bgm1.mp3');
        
    }
    create () {

        
        //this.add.image(0, 0, 'final2').setOrigin(0, 0);

        //this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is final2Scene");

        this.anims.create({
            key: 'finalfinal',
            frames: this.anims.generateFrameNumbers('finalfinal', {prefix: 'finalfinal_', first: 1, end: 19, zeroPad:2}),
            frameRate: 1.5,
        });

        this.final= this.add.group();

        this.final.create(400, 298,'finalfinal').play('finalfinal');


        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto mainScene");
        this.scene.stop("final2Scene");
        this.scene.start("mainScene");
        }, this );

    }

}

