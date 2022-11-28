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

    private updatePosition(prevX : number, newX: number, prevY : number, newY : number){
        this._collisionMonitor.updateBulletPosition(prevX,newX, prevY, newY);
    }

    private moveBullet(bullet : HTMLDivElement, refToBullet : Bullet){
        let prevPosY = bullet.offsetTop;
        let prevPosX = bullet.offsetLeft;

        let newPosY : number = 0;
        let newPosX : number = 0;
        
        if (prevPosY>0){
             newPosY = prevPosY -10;
             newPosX = prevPosX;
             bullet.style.top = newPosY.toString();
             bullet.style.left = newPosX.toString();
             refToBullet.updatePosition(prevPosX,newPosX,prevPosY,newPosY);
         }
         else
             refToBullet.removeBullet();
    } 

  }