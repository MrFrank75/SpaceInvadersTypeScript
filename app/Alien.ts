class Alien {
    private graphicElement: HTMLDivElement | undefined;
    private moveTimer : NodeJS.Timer | undefined;

    private outerSpaceWidth : number;
    private outerSpaceHeight : number;

    private readonly AlienCssClass = 'alien';
    
    private readonly MOVEMENT_SIZE_PX = 10;
    private readonly MOVEMENT_FREQUENCY_MS = 2000;
    private _numberOfFlashes: number = 0;
    private _isAlive: boolean = true;


    public get IsAlive() : boolean {
        return this._isAlive;
    }

    public get topPosition() : number {
        return this.graphicElement?.offsetTop as number;
    }

    public get leftPosition() : number {
        return this.graphicElement?.offsetLeft as number;
    }

    constructor() {
        this.outerSpaceHeight = 0;
        this.outerSpaceWidth = 0;
    }
   
    invade(outerSpace : HTMLElement) {
        this.graphicElement = this.createAlienDivElement(outerSpace);
        this.outerSpaceHeight = outerSpace.clientHeight;
        this.outerSpaceWidth = outerSpace.clientWidth;
        
        let alienSlowness = this.MOVEMENT_FREQUENCY_MS; //the higher the slower
        this.moveTimer = setInterval(this.moveAlien,alienSlowness, this.graphicElement, this);
    }

    kill(){
        console.log("Killed the alien");
        this._isAlive = false;
        setTimeout(this.flashAlien,100, this);       
    }

    private flashAlien(refToAlien : Alien){
        refToAlien._numberOfFlashes += 1;
        console.log(`Flashing alien ${refToAlien._numberOfFlashes}`);
        if (refToAlien._numberOfFlashes>10){
            refToAlien.removeAlien();
        }
        else{
            if (refToAlien.graphicElement==undefined)
                return;
            if (refToAlien.graphicElement.style.background == "red")
                refToAlien.graphicElement.style.background = "black";
            else
                refToAlien.graphicElement.style.background = "red";
            ;
            setTimeout(refToAlien.flashAlien, 100, refToAlien);
        }

    }

    private removeAlien(){
        clearInterval(this.moveTimer);
        this.graphicElement?.remove();

    }

    private moveAlien(alien : HTMLDivElement, refToAlien : Alien){
        let alienPosition : number = alien.offsetTop;
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


