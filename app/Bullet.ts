class Bullet {
    private graphicElement: HTMLDivElement;
    private moveTimer : NodeJS.Timer | undefined;
    private _topPosition : number = 0;
    private _leftPosition: number = 0;
    private _collisionMonitor: CollisionMonitor;

    public get topPosition() : number {
        return this._topPosition;
    }
    
    public get leftPosition() : number {
        return this._leftPosition;
    }
   
    constructor(outerSpace: HTMLDivElement, leftPos : number = 0, topPos : number = 0, collisionMonitor : CollisionMonitor) {
      this.graphicElement = outerSpace.ownerDocument.createElement('div');
      this.graphicElement.className = 'bullet';
      this.graphicElement.style.left = leftPos.toString();
      this.graphicElement.style.top = topPos.toString();
      this._collisionMonitor = collisionMonitor;
      outerSpace.appendChild(this.graphicElement);
    }
   
    shoot() {
        let bulletSlowness = 50; //the higher the slower
        this.moveTimer = setInterval(this.moveBullet,bulletSlowness, this.graphicElement, this);
    }

    private removeBullet(){
        clearInterval(this.moveTimer);
    }

    private moveBullet(bullet : HTMLDivElement, refToBullet : Bullet){
        // let bulletPosition : number = bullet.offsetTop;
        // let prevTop = bullet.offsetTop;
        // let prevLeft = 
        // if (bulletPosition>0){
        //     bulletPosition-=10;
        //     bullet.style.top = bulletPosition.toString();
        //     refToBullet._collisionMonitor.updateBulletPosition(bulletPosition,bullet.offsetLeft)
        // }
        // else
        //     refToBullet.removeBullet();
    } 

  }