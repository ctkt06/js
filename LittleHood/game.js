
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
    scene: [mainScene,main2Scene, storyScene, story2Scene, reddieLevel1, reddieLevel2, reddieLevel3, 
           gameoverScene1, yellowyLevel1, yellowyLevel2, yellowyLevel3, blueyLevel1, blueyLevel2, blueyLevel3, 
           finalScene, gameoverScene2, gameoverScene3]
    



};

let game = new Phaser.Game(config);



