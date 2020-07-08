class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }
    
    preload() {

        this.loadingText = this.add.text(30, 30, 'Loading game...').setFontFamily('Arial').setFontSize(32).setColor('#ffffff');

        this.load.image('kitchen', 'kitchen.png');
        this.load.image('noodle', 'noodle.png');
        this.load.image('bubble', 'bubble.png');
        this.load.image('brocolli', 'brocolli.png');
        this.load.image('timedouble', 'timedouble.png');

        
    }

    create() {
        
        this.loadingText.visible = false;

        this.startNormalGameButton = this.add.rectangle(100,100,300,300, "#ffffff", 1)
        this.startNormalGameButton.setInteractive();
        this.startNormalGameButton.on('pointerdown', () => {this.startGame(false)}, this);
    }



    startGame() {
        

        const labelScene = this.scene.launch('LabelScene');
        this.scene.start('MainScene');

        
    }


}

class LabelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LabelScene' });
    }

    create() {
        
        
        
    }

    showTextBox(text, callBack) {

        var container = this.add.container(120, 260);

        var background = this.add.rectangle(0,0,510,300, "#000000", 0.5).setOrigin(0)
        
        const textBox = this.add.text(255, 150, text, { fontFamily: 'Arial', color: '#ffffff', wordWrap: { width: 490 }, fontSize: '30px', align: 'center' }).setOrigin(0.5);

        background.setInteractive();

        container.add(background);
        container.add(textBox);
        

        background.on('pointerdown', () => {container.destroy(); callBack()}, this);
    }
}