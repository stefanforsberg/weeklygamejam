class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }
    
    create() {

        this.labelScene = this.scene.get('LabelScene');

        this.gameState = {
            levelStarted: false,
            levelStartTime: 0,
        }

        this.loadingText = this.add.text(30, 30, 'Started game...').setFontFamily('Arial').setFontSize(32).setColor('#ffffff');

        this.matter.world.setBounds(120, 636, 508, 445, 26, true, true, false, true);
        this.matter.world.setGravity(0,0.1)

        

        this.startImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'kitchen');

        // this.potBottom = this.add.rectangle(375,838, 430, 10, "#ff00ff", 1)

        // this.physics.add.existing(this.potBottom, true);

        this.noodle = this.matter.add.image(400, 300, 'noodle');

        this.noodle.setInteractive();

        this.noodle.on('pointerdown', this.noodleEvent, this);


        this.clock = this.add.text(315, 162).setFontFamily('Arial').setFontSize(48).setColor('#ffffff');

        this.resetLevel();
        

        // this.noodle.body.setCollideWorldBounds(true);
        // // this.noodle.body.setBoundsRectangle(new Phaser.Geom.Rectangle(160, 508, 430, 325));

        // // this.add.graphics()
        // // .lineStyle(5, 0x00ffff, 0.5)
        // // .strokeRectShape(this.noodle.body.customBoundsRectangle)

        // this.physics.add.collider(this.noodle, this.potBottom);

        
        
    }

    resetLevel() {

        if(this.clockRealTimeEvent) {
            this.clockRealTimeEvent.remove();
        }

        if(this.clockTimeEvent) {
            this.clockTimeEvent.remove();
        }

        this.noodle.visible = false;

        this.noodle.y = 500;

        this.noodle.angle = 35;
        this.noodle.setVelocity(0, 1);
        this.noodle.setBounce(0.3, 0.3);

        this.clockTime = 0;
        this.scene.pause();
        this.clock.setText("00:00");
        this.gameState.levelStarted = false;

        // this.level1();
    }

    noodleEvent() {
        if(this.gameState.levelStarted) {
            this.endLevel();
        } 
    }

    endLevel() {
        this.scene.pause();

        this.labelScene.showScore(this.gameState.level.endTime, this.clockRealTimeEvent.getElapsed())
    }

    startLevel() {

        console.log(this.scene.scene.time.now)

        this.gameState.levelStarted = true;

        this.noodle.visible = true;

        this.scene.resume()



        this.clockRealTimeEvent = this.time.addEvent({ delay: 100000, loop: true });



        this.clockTimeEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        

        var particles = this.add.particles('bubble');

        var emitter = particles.createEmitter({
            x: 0,
            y: 0,
            lifespan: 4000,
            speedY: { min: -60, max: -200 },
            speedX: { min: -10, max: 10 },
            angle: -90,
            gravityY: 0,
            scale: { start: 0.2, end: 2 },
            alpha: { start: 0.4, end: 0 },
            quantity: 13,
            blendMode: 'ADD',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(140, 1058, 470, 25) },
        }); 

        emitter.depth = 100;
    }

    addBrocolli() {
        
        const brocolli = this.add.image(Phaser.Math.Between(300, 600), 400, 'brocolli');

        var arrow = '0 49 4 18 76 0 107 28 105 61 72 76 59 94 45 94';
        this.matter.add.gameObject(brocolli, { shape: { type: 'fromVerts', verts: arrow, flagInternal: true } });

        brocolli.alpha = 0.6
        brocolli.angle = 35;
        brocolli.setVelocity(0, 1);
        brocolli.setAngularVelocity(0.1);
        brocolli.setBounce(0.3, 0.3);
        
        // const brocolli = this.matter.add.image(400, 300, 'brocolli');

        // brocolli.angle = 35;
        // brocolli.setVelocity(0, 1);
        // brocolli.setBounce(0.3, 0.3);
    }

    addTimeDouble() {
        
        const timedouble = this.add.image(500, 185, 'timedouble');

        this.clockTimeEvent.timeScale = 2;
        
        // const brocolli = this.matter.add.image(400, 300, 'brocolli');

        // brocolli.angle = 35;
        // brocolli.setVelocity(0, 1);
        // brocolli.setBounce(0.3, 0.3);
    }

    onEvent() {
        this.clockTime += 1;

        // if(this.clockTime > 5) {
        //     this.timedEvent.timeScale = 2;
        // }

        var m = Math.floor(this.clockTime % 3600 / 60);
        var s = Math.floor(this.clockTime % 3600 % 60);



        this.clock.setText(`${m < 10 ? "0" + m : m }:${s < 10 ? "0" + s : s }`);
    }


    level1() {

        this.resetLevel();

        this.gameState.level = {
            endTime: 23000,
            cookTimeText: "Cook for 00:20"
        }

        this.labelScene.showTextBox("Welcome to the tutorial level!\nYour goal here is to cook the noodles for 20 seconds. Click this box to start.", () => {this.startLevel()})

        this.time.addEvent({ delay: 4000, callback: () => { this.scene.pause(); this.labelScene.showTextBox("Above you can see a clock that (usually) show how much time has passed. Click here to to continue", () => {this.scene.resume()}) }, callbackScope: this, loop: false });

        this.time.addEvent({ delay: 7000, callback: this.addBrocolli, callbackScope: this, loop: false });
        
        this.time.addEvent({ delay: 10000, callback: () => { this.scene.pause(); this.labelScene.showTextBox("Oh no, evil forces have added a brocolli. Each vegetable will add 3 seconds to the cook timer so now the noodles will need 20 + 3 seconds to finish!", () => {this.scene.resume()}) }, callbackScope: this, loop: false });

        this.time.addEvent({ delay: 15000, callback: () => { this.addTimeDouble(); this.scene.pause(); this.labelScene.showTextBox("What's this? The time bandits have sped up the clock so it moves twice as fast so from this point on 2 seconds on the clock is 1 second in real life. Oh my!", () => {this.scene.resume()}) }, callbackScope: this, loop: false });

        this.time.addEvent({ delay: 21000, callback: () => { this.scene.pause(); this.labelScene.showTextBox("Noodles should be ready in about 2 seconds. To finish the level click the noodles and you will be scored on how close you were to the target cook time.", () => {this.scene.resume()}) }, callbackScope: this, loop: false });


        // this.time.addEvent({ delay: 3000, callback: this.addBrocolli, callbackScope: this, loop: false });
        // this.time.addEvent({ delay: 4000, callback: this.addBrocolli, callbackScope: this, loop: false });
    }


}