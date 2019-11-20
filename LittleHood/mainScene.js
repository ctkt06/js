class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');
        //this.load.audio('bgm2', 'assets/audio/bgm2.mp3');

    }

    create () {

        //this.bgmSound = this.sound.add('bgm2', {volume: 0.5});
        //this.bgmSound.loop = true;
        //this.bgmSound.play();


        this.add.image(0, 0, 'main').setOrigin(0, 0);
        
        //this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is mainScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("mainScene");
        this.scene.start("main2Scene");
        }, this );

    }

}
