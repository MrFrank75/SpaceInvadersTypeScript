class CollisionMonitor {
    updateBulletPosition(row: number, col: number) {
        throw new Error("Method not implemented.");
    }

    private _spacecraft : Spacecraft | undefined;
    private _bulletsFlyingAround : Array<Bullet> = new Array<Bullet>(0);
    private _aliensFlyingAround : Array<Alien> = new Array<Alien>(0);
    private _collisionMatrix : Array<Array<number>>;
    
    /**
     *
     */
    constructor(outerSpaceWidth : number, outerSpaceHeight : number) {
        
        this._collisionMatrix = new Array<Array<number>>(outerSpaceHeight);
        for (let index = 0; index < this._collisionMatrix.length; index++) {
            this._collisionMatrix[index] = new Array<number>(outerSpaceWidth);
        }
    }

    addAlienMonitoring(alien: Alien) {
        this._aliensFlyingAround.push(alien);
    }
    start() {
        setInterval(this.monitorCollision, 500, this);
    }
    addSpaceCraftMonitor(spaceCraft: Spacecraft) {
        this._spacecraft = spaceCraft;
    }
    
    addBulletMonitoring(bullet: Bullet) {
        this._bulletsFlyingAround.push(bullet);
    }

    private monitorCollision(cm : CollisionMonitor){
        let numOfAliens = cm._aliensFlyingAround.length;
        let numOfBullets = cm._bulletsFlyingAround.length;
        console.log(`Monitoring ${numOfAliens} aliens and ${numOfBullets} bullets... `);

        //reset the matrix
        for (let idxRow = 0; idxRow < cm._collisionMatrix.length; idxRow++) {
            for (let idxCol = 0; idxCol < cm._collisionMatrix[idxRow].length; idxCol++) {
                cm._collisionMatrix[idxRow][idxCol] = 0;
            }
        }
        
        //place the bullets
        cm._bulletsFlyingAround.forEach(element => {
            var rowCollisionMatrix : number = element.topPosition;
            var columnCollisionMatrix : number = element.leftPosition;
            cm._collisionMatrix[rowCollisionMatrix][columnCollisionMatrix] = 1;
        });
        
        //check the aliens
        cm._aliensFlyingAround.forEach( alien => {
            var rowCollisionMatrix : number = alien.topPosition;
            var columnCollisionMatrix : number = alien.leftPosition;
            
            if (cm._collisionMatrix[rowCollisionMatrix][columnCollisionMatrix] == 1){
                console.log(`Position [${rowCollisionMatrix}][${columnCollisionMatrix}] YOU HIT IT!`);
            }
        });
    }

}