class CollisionMonitor {
    
    private _spacecraft : Spacecraft | undefined;
    private _bulletsFlyingAround : Array<Bullet> = new Array<Bullet>(0);
    private _aliensFlyingAround : Array<Alien> = new Array<Alien>(0);
    private _collisionMatrix : Array<Array<number>>;
    private _collisionDisplayGrid : Array<Array<HTMLDivElement>>;
    private _tileSizeFactor : number;
    /**
     *
     */
    constructor(screenResolutionHeight : number, screenResolutionWidth : number, tileSizeFactor : number) {
        this._tileSizeFactor = tileSizeFactor;
        let rows : number = Math.round(screenResolutionHeight / this._tileSizeFactor);
        let columns : number = Math.round(screenResolutionWidth / this._tileSizeFactor);

        this._collisionMatrix = new Array<Array<number>>(rows);
        this._collisionDisplayGrid = new Array<Array<HTMLDivElement>>(rows);
        
        for (let index = 0; index < this._collisionMatrix.length; index++) {
            this._collisionMatrix[index] = new Array<number>(columns);
        }

        for (let index = 0; index < this._collisionDisplayGrid.length; index++) {
            this._collisionDisplayGrid[index] = new Array<HTMLDivElement>(columns);
        }

        console.log(`Created collision monitor rows: ${rows} - columns: ${columns}`);
    }

    designCollisionGrid(outerSpace: HTMLDivElement) {
        for (let idxRow = 0; idxRow < this._collisionDisplayGrid.length; idxRow++) {
            for (let idxCol = 0; idxCol < this._collisionDisplayGrid[idxRow].length; idxCol++) {
                let gridElement : HTMLDivElement =  outerSpace.ownerDocument.createElement('div');
                gridElement.style.left = (this._tileSizeFactor*idxCol).toString();
                gridElement.style.top =  (this._tileSizeFactor*idxRow).toString();
                gridElement.style.width = this._tileSizeFactor.toString();
                gridElement.style.height = this._tileSizeFactor.toString();
                gridElement.style.background = "lightblue";
                gridElement.style.border = "1px dotted silver";
                gridElement.style.position = "absolute";
                outerSpace.append(gridElement);
                this._collisionDisplayGrid[idxRow][idxCol] = gridElement;
            }
        }
    }


    start() {
        setInterval(this.monitorCollision, 200, this);
    }

    addSpaceCraftMonitor(spaceCraft: Spacecraft) {
        this._spacecraft = spaceCraft;
    }

    addAlienMonitoring(alien: Alien) {
        this._aliensFlyingAround.push(alien);
    }
    
    addBulletMonitoring(bullet: Bullet) {
        this._bulletsFlyingAround.push(bullet);
    }
    

    private monitorCollision(cm : CollisionMonitor){
        let numOfAliens = cm._aliensFlyingAround.length;
        let numOfBullets = cm._bulletsFlyingAround.length;

        console.log("Monitoring collision....");

        //reset the matrix
        for (let idxRow = 0; idxRow < cm._collisionMatrix.length; idxRow++) {
            for (let idxCol = 0; idxCol < cm._collisionMatrix[idxRow].length; idxCol++) {
                cm._collisionMatrix[idxRow][idxCol] = 0;
                cm._collisionDisplayGrid[idxRow][idxCol].style.background = "lightblue";
            }
        }

        //place the bullets
        cm._bulletsFlyingAround.forEach(element => {
            let rowCollisionMatrix : number = Math.floor(element.topPosition / cm._tileSizeFactor);
            let columnCollisionMatrix : number = Math.floor(element.leftPosition / cm._tileSizeFactor);
            cm._collisionMatrix[rowCollisionMatrix][columnCollisionMatrix] = 1;
            cm._collisionDisplayGrid[rowCollisionMatrix][columnCollisionMatrix].style.background = "orange";
        });
        
        //check the aliens
        cm._aliensFlyingAround.forEach( alien => {
            let rowCollisionMatrix : number = Math.floor(alien.topPosition / cm._tileSizeFactor);
            let columnCollisionMatrix : number = Math.floor(alien.leftPosition / cm._tileSizeFactor);
            cm._collisionDisplayGrid[rowCollisionMatrix][columnCollisionMatrix].style.background = "yellow";
            if (cm._collisionMatrix[rowCollisionMatrix][columnCollisionMatrix] == 1 && alien.IsAlive == true){
                 alien.kill();
            }
        });
    }

}

