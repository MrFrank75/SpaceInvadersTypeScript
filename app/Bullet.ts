class Bullet {
    private graphicElement: HTMLDivElement;
    private moveTimer : NodeJS.Timer | undefined;
   
    constructor(outerSpace: HTMLDivElement, leftPos : number = 0, topPos : number = 0) {
      this.graphicElement = outerSpace.ownerDocument.createElement('div');
        
      this.graphicElement.className = 'bullet';
      this.graphicElement.style.left = leftPos.toString();
      this.graphicElement.style.top = topPos.toString();
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
        let bulletPosition : number = bullet.offsetTop;
        console.log('keeps going');
        if (bulletPosition>0){
            bulletPosition-=10;
            bullet.style.top = bulletPosition.toString();
        }
        else
            refToBullet.removeBullet();
    } 

  }