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
        this.load.image('carrot', 'carrot.png');
        this.load.image('timedouble', 'timedouble.png');
        this.load.image('title', 'title.png');

        
    }

    create() {
        
        this.loadingText.visible = false;

        this.scene.start('MainScene');
        
        this.scene.launch('LabelScene');

        this.labelScene = this.scene.get('LabelScene');

        
        // this.labelScene.showLevelSelector();

        // this.startNormalGameButton = this.add.rectangle(100,100,300,300, "#ffffff", 1)
        // this.startNormalGameButton.setInteractive();
        // this.startNormalGameButton.on('pointerdown', () => {this.startGame(false)}, this);
    }



    startGame() {
        

        
        



        
    }


}

class LabelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LabelScene' });
    }

    create() {
        console.log("create")
        this.mainScene = this.scene.get('MainScene');

        this.levelSelector = this.add.container(370, 870);

        var background = this.add.image(0,0,'title');

        var l1 = this.add.rectangle(-170,115,70,50, "#000000", 0.0)
        l1.setInteractive();
        l1.on('pointerdown', () => {this.levelSelector.visible = false; this.mainScene.level1()}, this);

        var l2 = this.add.rectangle(0,115,70,50, "#000000", 0.0)
        l2.setInteractive();
        l2.on('pointerdown', () => {this.levelSelector.visible = false; this.mainScene.level2()}, this);

        var l3 = this.add.rectangle(170,115,70,50, "#000000", 0.0)

        this.levelSelector.add(background);
        this.levelSelector.add(l1);
        this.levelSelector.add(l2);
        this.levelSelector.add(l3);

        console.log(this.levelSelector)

        this.levelSelector.visible = true
    }

    showLevelSelector() {
        this.mainScene.scene.restart();
        this.levelSelector.visible = true;
    }

    showTextBox(text, callBack) {

        var container = this.add.container(120, 260);

        var background = this.add.rectangle(0,0,510,300, "#000000", 0.5).setOrigin(0)
        
        const textBox = this.add.text(255, 150, text, { fontFamily: 'Arial', color: '#ffffff', wordWrap: { width: 490 }, fontSize: '36px', align: 'center' }).setOrigin(0.5);

        background.setInteractive();

        container.add(background);
        container.add(textBox);

        background.on('pointerdown', () => {container.destroy(); callBack()}, this);
    }

    showScore(goal, actual) {
        var container = this.add.container(120, 260);

        var background = this.add.rectangle(0,0,510,300, "#000000", 0.5).setOrigin(0)

        var points = Math.abs(goal-actual);

        var score = `Your score is ${Math.round(points)} (lower is better and 0 is perfect)\nCooking time: ${Math.round(goal)}\nYour time: ${Math.round(actual)}`
        
        const textBox = this.add.text(255, 150, score, { fontFamily: 'Arial', color: '#ffffff', wordWrap: { width: 490 }, fontSize: '36px', align: 'center' }).setOrigin(0.5);

        background.setInteractive();

        container.add(background);
        container.add(textBox);

        background.on('pointerdown', () => {container.destroy(); this.showLevelSelector()}, this);
    }
}


