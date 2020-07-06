class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }
    
    create() {
        this.loadingText = this.add.text(30, 30, 'Started game...').setFontFamily('Arial').setFontSize(32).setColor('#ffffff');

        this.matter.world.setBounds(120, 636, 508, 445, 26, true, true, false, true);
        this.matter.world.setGravity(0,0.1)

        this.matter.world.pause();

        this.startImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'kitchen');

        // this.potBottom = this.add.rectangle(375,838, 430, 10, "#ff00ff", 1)

        // this.physics.add.existing(this.potBottom, true);

        this.noodle = this.matter.add.image(400, 300, 'noodle');

        this.noodle.setInteractive();

        this.noodle.on('pointerdown', () => { this.startGame();}, this);

        // this.noodle = this.add.image(400, 300, 'noodle');
        // // this.noodle = this.add.rectangle(300,200,40,40, "#ff00ff", 1)

        // this.physics.add.existing(this.noodle, false);

        this.noodle.angle = 35;
        this.noodle.setVelocity(0, 1);
        this.noodle.setBounce(0.3, 0.3);

        this.clock = this.add.text(32, 32).setFontFamily('Arial').setFontSize(48).setColor('#000000');
        this.clockTime = 0;

        this.clock.setText("Hey");

        // this.noodle.body.setCollideWorldBounds(true);
        // // this.noodle.body.setBoundsRectangle(new Phaser.Geom.Rectangle(160, 508, 430, 325));

        // // this.add.graphics()
        // // .lineStyle(5, 0x00ffff, 0.5)
        // // .strokeRectShape(this.noodle.body.customBoundsRectangle)

        // this.physics.add.collider(this.noodle, this.potBottom);

        
        
    }

    startGame() {

        this.matter.world.resume();

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

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
            quantity: 2,
            blendMode: 'ADD',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(140, 1058, 470, 25) },
        }); 
    }

    onEvent() {
        this.clockTime += 1;

        if(this.clockTime > 5) {
            this.timedEvent.timeScale = 2;
        }

        var m = Math.floor(this.clockTime % 3600 / 60);
        var s = Math.floor(this.clockTime % 3600 % 60);



        this.clock.setText(`${m < 10 ? "0" + m : m }:${s < 10 ? "0" + s : s }`);
    }


}