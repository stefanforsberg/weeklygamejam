class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }
    
    create() {
        this.loadingText = this.add.text(30, 30, 'Started game...').setFontFamily('Arial').setFontSize(32).setColor('#ffffff');

        this.matter.world.setBounds(160, 508, 430, 325, 32, true, true, false, true);
        this.matter.world.setGravity(0,0.1)

        this.startImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'kitchen');

        // this.potBottom = this.add.rectangle(375,838, 430, 10, "#ff00ff", 1)

        // this.physics.add.existing(this.potBottom, true);

        this.noodle = this.matter.add.image(400, 300, 'noodle');

        // this.noodle = this.add.image(400, 300, 'noodle');
        // // this.noodle = this.add.rectangle(300,200,40,40, "#ff00ff", 1)

        // this.physics.add.existing(this.noodle, false);

        this.noodle.angle = 35;
        this.noodle.setVelocity(0, 1);
        this.noodle.setBounce(0.3, 0.3);
        // this.noodle.body.setCollideWorldBounds(true);
        // // this.noodle.body.setBoundsRectangle(new Phaser.Geom.Rectangle(160, 508, 430, 325));

        // // this.add.graphics()
        // // .lineStyle(5, 0x00ffff, 0.5)
        // // .strokeRectShape(this.noodle.body.customBoundsRectangle)

        // this.physics.add.collider(this.noodle, this.potBottom);

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
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(160, 808, 430, 25) },
        });
        
    }

    startGame() {
        
    }


}