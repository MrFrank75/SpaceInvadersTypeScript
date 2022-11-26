class CollisionMonitor {

    private _spacecraft : Spacecraft | undefined;
    private _bulletsFlyingAround : Array<Bullet> = new Array<Bullet>(0);
    private _aliensFlyingAround : Array<Alien> = new Array<Alien>(0);

    addAlienMonitoring(alien: Alien) {
        this._aliensFlyingAround.push(alien);
    }
    start() {
        setInterval(this.monitorCollision, 50, this);
    }
    addSpaceCraftMonitor(spaceCraft: Spacecraft) {
        this._spacecraft = spaceCraft;
    }
    
    addBulletMonitoring(bullet: Bullet) {
        this._bulletsFlyingAround.push(bullet);
    }

    private monitorCollision(refToCollisionMonitor : CollisionMonitor){
        let numOfAliens = refToCollisionMonitor._aliensFlyingAround.length;
        let numOfBullets = refToCollisionMonitor._bulletsFlyingAround.length;
        console.log(`Monitoring ${numOfAliens} aliens and ${numOfBullets} bullets... `);
    }

}