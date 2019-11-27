class story2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story2Scene' });
    }


    preload() {
        this.load.image('story2','assets/story2Scene.png');
    
        //this.load.audio('bgm1', 'assets/audio/bgm1.mp3');
    }

    create () {

        

        this.add.image(0, 0, 'story2').setOrigin(0, 0);


        //this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story2Scene");

        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);

        key1.on('down', function(){
            this.scene.stop("story2Scene");
            this.scene.start("reddieLevel1");
            }, this );

        key2.on('down', function(){
            this.scene.stop("story2Scene");
            this.scene.start("yellowyLevel1");
            }, this );

        key3.on('down', function(){
            this.scene.stop("story2Scene");
            this.scene.start("blueyLevel1");
            }, this ); 
            
    



    }


}