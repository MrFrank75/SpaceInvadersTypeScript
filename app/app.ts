
function moveSpaceCraft(event : KeyboardEvent, spaceCraft : HTMLDivElement) {
 
    if (event.code === "ArrowLeft") {
        let posWithoutPx: string = spaceCraft.style.left.replace("px", "");
        let pos: number = +posWithoutPx - 3;
        spaceCraft.style.left = pos.toString();
    }
    if (event.code === "ArrowRight") {
        let posWithoutPx: string = spaceCraft.style.left.replace("px", "");
        let pos: number = +posWithoutPx + 3;
        spaceCraft.style.left = pos.toString();
    }
    if (event.code === "ArrowUp") {
        let posWithoutPx: string = spaceCraft.style.top.replace("px", "");
        let pos: number = +posWithoutPx - 3;
        spaceCraft.style.top = pos.toString();
    }
    if (event.code === "ArrowDown") {
        let posWithoutPx: string = spaceCraft.style.top.replace("px", "");
        let pos: number = +posWithoutPx + 3;
        spaceCraft.style.top = pos.toString();
    }
}


function keyDownHandler(event: KeyboardEvent) {
    console.log(event.code);
    let spaceCraft: HTMLDivElement = document.getElementById('spacecraft') as HTMLDivElement;
    let outerSpace: HTMLDivElement = document.getElementById('outerSpace') as HTMLDivElement;

    if (event.code === "ArrowUp" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight")
        moveSpaceCraft(event, spaceCraft);

    if (event.code === "Space"){
        shoot(outerSpace, spaceCraft);    
    }
}


function shoot(outerSpace : HTMLDivElement, spaceCraft : HTMLDivElement) {
    let scWidth : number = spaceCraft.offsetWidth; 
    let aBullet = document.createElement('div');

    aBullet.className = 'bullet';
    aBullet.style.left = (spaceCraft.offsetLeft+(scWidth/2)).toString();
    aBullet.style.top = spaceCraft.style.top;
    outerSpace.appendChild(aBullet);

    let bulletObject = new Bullet(aBullet);
    bulletObject.shoot()
}

document.getElementById('outerSpace')?.addEventListener('keydown', keyDownHandler);



class Bullet {
    private graphicElement: HTMLDivElement;
    private moveTimer : NodeJS.Timer | undefined;
   
    constructor(divElement: HTMLDivElement) {
      this.graphicElement = divElement;
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