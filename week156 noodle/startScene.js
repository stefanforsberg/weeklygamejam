class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }
    
    preload() {

        this.loadingText = this.add.text(30, 30, 'Loading game...').setFontFamily('Arial').setFontSize(32).setColor('#ffffff');

        this.load.image('kitchen', 'kitchen.png');
        this.load.image('noodle', 'noodle.png');
        this.load.image('bubble', 'bubble.png');

        // this.load.audio('theme', [
        //     'assets/09.ogg',
        //     'assets/09.mp3'
        // ]);

        this.startNormalGameButton = this.add.rectangle(100,100,300,300, "#ffffff", 1)
        this.startNormalGameButton.setInteractive();
        this.startNormalGameButton.on('pointerdown', () => {this.startGame(false)}, this);

    }

    create() {
        
        this.loadingText.visible = false;
    }

    startGame() {
        this.scene.start('MainScene');
    }


}