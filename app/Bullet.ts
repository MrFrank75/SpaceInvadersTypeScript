class Bullet {
    private graphicElement: HTMLDivElement;
    private moveTimer : NodeJS.Timer | undefined;

    public get topPosition() : number {
        return this.graphicElement?.offsetTop as number;
    }

    public get leftPosition() : number {
        return this.graphicElement?.offsetLeft as number;
    }
   
    constructor(outerSpace: HTMLDivElement, leftPos : number = 0, topPos : number = 0) {
      this.graphicElement = outerSpace.ownerDocument.createElement('div');
      this.graphicElement.className = 'bullet';
      this.graphicElement.style.left = leftPos.toString();
      this.graphicElement.style.top = topPos.toString();
      outerSpace.appendChild(this.graphicElement);
    }
   
    shoot() {
        let bulletSlowness = 500; //the higher the slower
        this.moveTimer = setInterval(this.moveBullet,bulletSlowness, this.graphicElement, this);
    }

    private removeBullet(){
        clearInterval(this.moveTimer);
        this.graphicElement?.remove();
    }

    private updatePosition(prevX : number, newX: number, prevY : number, newY : number){
        this._collisionMonitor.updateBulletPosition(prevX,newX, prevY, newY);
    }

    private moveBullet(bullet : HTMLDivElement, refToBullet : Bullet){
        let bulletPosition : number = bullet.offsetTop;
        if (bulletPosition>0){
            bulletPosition-=10;
            bullet.style.top = bulletPosition.toString();
        }
        else
            refToBullet.removeBullet();
    } 

  }