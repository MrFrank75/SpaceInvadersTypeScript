class Alien {
    private graphicElement: HTMLDivElement | undefined;
    private moveTimer : NodeJS.Timer | undefined;
    private outerSpaceWidth : number;
    private outerSpaceHeight : number;

    constructor() {
        this.outerSpaceHeight = 0;
        this.outerSpaceWidth = 0;
    }
   
    invade(outerSpace : HTMLElement) {
        this.graphicElement = this.createAlienDivElement(outerSpace);
        this.outerSpaceHeight = outerSpace.clientHeight;
        this.outerSpaceWidth = outerSpace.clientWidth;
        
        let alienSlowness = 500; //the higher the slower
        this.moveTimer = setInterval(this.moveAlien,alienSlowness, this.graphicElement, this);
    }

    private removeAlien(){
        clearInterval(this.moveTimer);
        this.graphicElement?.remove();
    }

    private moveAlien(alien : HTMLDivElement, refToAlien : Alien){
        let alienPosition : number = alien.offsetTop;
        console.log('Moving alien');
        if (alienPosition<refToAlien.outerSpaceHeight){
            alienPosition+=10;
            alien.style.top = alienPosition.toString();
        }
        else
            refToAlien.removeAlien();
    } 

    private createAlienDivElement(outerSpace : HTMLElement) : HTMLDivElement {
        let scWidth : number = outerSpace.offsetWidth; 
    
        let alienDiv = outerSpace.ownerDocument.createElement('div');
        alienDiv.className = 'alien';

        alienDiv.style.left = (outerSpace.offsetLeft+(scWidth/2)).toString();
        alienDiv.style.top = outerSpace.style.top;
 
        outerSpace.append(alienDiv);
        return alienDiv;
    }

}


