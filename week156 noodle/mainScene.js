class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });

        
    }
    
    create() {

        this.dropSound = this.sound.add('drop')

        this.song = this.sound.add('song')
        this.song.loop = true;

        this.boilsound = this.sound.add('boilsound');
        this.boilsound.loop = true;

        this.labelScene = this.scene.get('LabelScene');

        this.gameState = {
            levelStarted: false,
            levelStartTime: 0,
        }

        this.timers = [];

        this.loadingText = this.add.text(30, 30, 'Started game...').setFontFamily('Arial').setFontSize(32).setColor('#ffffff');

        this.matter.world.setBounds(120, 636, 508, 445, 26, true, true, false, true);
        this.matter.world.setGravity(0,0.1)

        this.startImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'kitchen');

        this.noodle = this.matter.add.image(400, 300, 'noodle');

        this.noodle.setInteractive();

        this.noodle.on('pointerdown', this.noodleEvent, this);


        this.clock = this.add.text(315, 162).setFontFamily('Arial').setFontSize(48).setColor('#ffffff');

        this.resetLevel();
    }

    resetLevel() {

        this.timers.forEach(t => t.remove());

        this.noodle.visible = false;

        this.noodle.y = 500;

        this.noodle.angle = 35;
        this.noodle.setVelocity(0, 1);
        this.noodle.setBounce(0.3, 0.3);

        this.clockTime = 0;
        this.scene.pause();
        this.clock.setText("00:00");
        this.gameState.levelStarted = false;
    }

    noodleEvent() {
        if(this.gameState.levelStarted) {
            this.endLevel();
        } 
    }

    endLevel() {
        this.pauseGame();

        this.labelScene.showScore(this.gameState.level.endTime, this.clockRealTimeEvent.getElapsed())
    }

    pauseGame() {
        this.scene.pause();
        this.boilsound.pause();
        this.song.pause();
    }

    resumeGame() {
        this.scene.resume();
        this.boilsound.resume();
        this.song.resume();

    }

    startLevel() {

        this.gameState.levelStarted = true;

        this.noodle.visible = true;

        
        this.boilsound.play();
        this.boilsound.volume = 0;

        this.song.play();
        this.song.setRate(1)
        this.song.volume = 0;

        this.tweens.add({
            targets: [this.boilsound, this.song],
            props: {
                volume: { value: 0.6, duration: 3000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.resumeGame()

        this.clockRealTimeEvent = this.time.addEvent({ delay: 200000, loop: true });
        this.timers.push(this.clockRealTimeEvent)


        this.clockTimeEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.timers.push(this.clockTimeEvent)
        

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
        
        this.dropSound.play();

        const brocolli = this.add.image(Phaser.Math.Between(300, 500), 400, 'brocolli');

        var shape = '0 49 4 18 76 0 107 28 105 61 72 76 59 94 45 94';
        this.matter.add.gameObject(brocolli, { shape: { type: 'fromVerts', verts: shape, flagInternal: true } });

        brocolli.alpha = 0.6
        brocolli.angle = 35;
        brocolli.setVelocity(0, 1);
        brocolli.setAngularVelocity(0.1);
        brocolli.setBounce(0.3, 0.3);
    }

    addCarrot() {
        
        this.dropSound.play();

        const carrot = this.matter.add.image(Phaser.Math.Between(300, 500), 400, 'carrot');

        carrot.alpha = 0.9
        carrot.angle = 35;
        carrot.setVelocity(0, 1);
        carrot.setAngularVelocity(0.1);
        carrot.setBounce(0.3, 0.3);
    }

    addTimeDouble() {
        this.timedouble = this.add.image(500, 185, 'timedouble');

        this.song.setRate(1.2)

        this.clockTimeEvent.timeScale = 2;
    }

    removeTimeDouble() {
        this.timedouble.destroy();

        this.song.setRate(1)

        this.clockTimeEvent.timeScale = 1;
    }

    onEvent() {
        this.clockTime += 1;

        var m = Math.floor(this.clockTime % 3600 / 60);
        var s = Math.floor(this.clockTime % 3600 % 60);

        this.clock.setText(`${m < 10 ? "0" + m : m }:${s < 10 ? "0" + s : s }`);
    }


    level1() {

        this.resetLevel();

        this.gameState.level = {
            endTime: 23000,
        }

        this.labelScene.showTextBox("Welcome to the tutorial level!\nYour goal here is to cook the noodles for 20 seconds. Click this box to start.", () => {this.startLevel()})

        this.timers.push(this.time.addEvent({ delay: 4000, callback: () => { this.pauseGame(); this.labelScene.showTextBox("Above you can see a clock that (usually) show how much time has passed. Click here to to continue", () => {this.resumeGame()}) }, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 7000, callback: this.addBrocolli, callbackScope: this, loop: false }));
        
        this.timers.push(this.time.addEvent({ delay: 10000, callback: () => { this.pauseGame(); this.labelScene.showTextBox("Oh no, evil forces have added a brocolli. Each vegetable will add 3 seconds to the cook timer so now the noodles will need 20 + 3 seconds to finish!", () => {this.resumeGame()}) }, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 15000, callback: () => { this.addTimeDouble(); this.pauseGame(); this.labelScene.showTextBox("What's this? The time bandits have sped up the clock so it moves twice as fast so from this point on 2 seconds on the clock is 1 second in real life. Oh my!", () => {this.resumeGame()}) }, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 21000, callback: () => { this.pauseGame(); this.labelScene.showTextBox("Noodles should be ready in about 2 seconds. To finish the level click the noodles and you will be scored on how close you were to the target cook time.", () => {this.resumeGame()}) }, callbackScope: this, loop: false }));
    }


    level2() {

        this.resetLevel();

        var endTime = Phaser.Math.Between(26, 30);

        this.gameState.level = {
            endTime: (endTime+5*3)*1000,
        }

        this.labelScene.showTextBox(`Welcome to the level 2!\nYour goal here is to cook the noodles for ${endTime} seconds. Click this box to start.`, () => {this.startLevel()})

        this.timers.push(this.time.addEvent({ delay: 7000, callback: this.addCarrot, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 14000, callback: this.addBrocolli, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 16000, callback: this.addCarrot, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 25000, callback: this.addBrocolli, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 28000, callback: this.addBrocolli, callbackScope: this, loop: false }));
    }

    level3() {

        this.resetLevel();

        var endTime = Phaser.Math.Between(35, 50);

        this.gameState.level = {
            endTime: (endTime+10*3)*1000,
        }

        var timeDouble01Start = Phaser.Math.Between(20, 25);
        var timeDouble01End = timeDouble01Start + Phaser.Math.Between(5, 10);

        this.labelScene.showTextBox(`Welcome to the level 3!\nYour goal here is to cook the noodles for ${endTime} seconds. Click this box to start.`, () => {this.startLevel()})
        
        this.timers.push(this.time.addEvent({ delay: timeDouble01Start*1000, callback: this.addTimeDouble, callbackScope: this, loop: false }));
        this.timers.push(this.time.addEvent({ delay: timeDouble01End*1000, callback: this.removeTimeDouble, callbackScope: this, loop: false }));
        
        this.timers.push(this.time.addEvent({ delay: 4000, callback: this.addBrocolli, callbackScope: this, loop: false }));
        this.timers.push(this.time.addEvent({ delay: 10000, callback: this.addCarrot, callbackScope: this, loop: false }));
        this.timers.push(this.time.addEvent({ delay: 10500, callback: this.addBrocolli, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 18000, callback: this.addBrocolli, callbackScope: this, loop: false }));
        this.timers.push(this.time.addEvent({ delay: 24000, callback: this.addCarrot, callbackScope: this, loop: false }));
        this.timers.push(this.time.addEvent({ delay: 28500, callback: this.addBrocolli, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 36000, callback: this.addCarrot, callbackScope: this, loop: false }));
        this.timers.push(this.time.addEvent({ delay: 39000, callback: this.addCarrot, callbackScope: this, loop: false }));
        this.timers.push(this.time.addEvent({ delay: 44500, callback: this.addBrocolli, callbackScope: this, loop: false }));

        this.timers.push(this.time.addEvent({ delay: 55000, callback: this.addBrocolli, callbackScope: this, loop: false }));
    }


}