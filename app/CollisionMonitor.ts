class CollisionMonitor {
    
    private _bulletMatrix : boolean[][];
    private _aliensMatrix : boolean[][];
    private _collisionTable? : CollisionTable;
    private readonly DENSITY : number = 50;
    
    /**
     *
     */
    constructor(outerSpaceWidth : number, outerSpaceHeight : number, outerSpace? : HTMLDivElement ) {
        this._bulletMatrix = new Array(outerSpaceHeight)
        .fill(false)
        .map(() => new Array(outerSpaceWidth).fill(false));

        this._aliensMatrix = new Array(outerSpaceHeight)
        .fill(false)
        .map(() => new Array(outerSpaceWidth).fill(false));

        if (typeof outerSpace !== 'undefined') {
            let rows : number = Math.round(outerSpaceHeight / this.DENSITY);
            let columns : number = Math.round(outerSpaceWidth / this.DENSITY);
            this._collisionTable = new CollisionTable(outerSpace, rows, columns);
        }
    }


    start() {
        this._collisionTable?.generateTable();
        setInterval(this.monitorCollision, 500, this);
    }

    updateBulletPosition(prevX: number, newX: number, prevY : number, newY : number) {
        this._bulletMatrix[prevY][prevX] = false; 
        this._bulletMatrix[newY][newX] = true;

        let collMatrixX = newX%this.DENSITY;
        let collMatrixY = newY%this.DENSITY;

        if (this._collisionTable!=undefined)
            this._collisionTable?.highlight(collMatrixX,collMatrixY);
    }

    updateAlienPosition(prevX: number, newX: number, prevY : number, newY : number) {
        this._aliensMatrix[prevY][prevX] = false; 
        this._aliensMatrix[newY][newX] = true; 
    }

    private monitorCollision(cm : CollisionMonitor){
        //refresh the matrix for now
        this._collisionTable?.highlight(2,20);
    }

}

