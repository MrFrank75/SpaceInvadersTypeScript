class Alien {
    private graphicElement: HTMLDivElement | undefined;
    private moveTimer : NodeJS.Timer | undefined;
    private outerSpaceWidth : number;
    private outerSpaceHeight : number;

    private readonly AlienCssClass = 'alien';
    
    private _topPosition : number;
    private _leftPosition : number;

    private readonly MOVEMENT_SIZE_PX = 10;
    private readonly MOVEMENT_FREQUENCY_MS = 2000;

    public get topPosition() : number {
        return this._topPosition;
    }

    public get leftPosition() : number {
        return this._leftPosition;
    }

    constructor() {
        this.outerSpaceHeight = 0;
        this.outerSpaceWidth = 0;
        this._topPosition = 0
        this._leftPosition = 0;
    }
   
    invade(outerSpace : HTMLElement) {
        this.graphicElement = this.createAlienDivElement(outerSpace);
        this.outerSpaceHeight = outerSpace.clientHeight;
        this.outerSpaceWidth = outerSpace.clientWidth;
        
        let alienSlowness = this.MOVEMENT_FREQUENCY_MS; //the higher the slower
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
            alienPosition+=refToAlien.MOVEMENT_SIZE_PX;
            alien.style.top = alienPosition.toString();
        }
        else
            refToAlien.removeAlien();
    } 

    private createAlienDivElement(outerSpace : HTMLElement) : HTMLDivElement {
        
        let alienDiv = outerSpace.ownerDocument.createElement('div');
        alienDiv.className = this.AlienCssClass;

        let initialLeftPos = this.getRandomInt(outerSpace.clientWidth);

        alienDiv.style.left = initialLeftPos.toString();
        alienDiv.style.top = outerSpace.style.top;
 
        outerSpace.append(alienDiv);
        return alienDiv;
    }

    private getRandomInt(max : number) : number {
        return Math.floor(Math.random() * max);
      }

}


