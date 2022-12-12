/// <reference path="Bullet.ts" />

class Spacecraft {

    private readonly SpacecraftCssClass = 'spacecraft';
    private graphicElement: HTMLDivElement | undefined;

    private readonly MOVEMENT_LENGTH_PX = 20;

    constructor() {
    }
   

    private createSpacecraftDivElement(outerSpace : HTMLDivElement) : HTMLDivElement {
        let scWidth : number = outerSpace.offsetWidth; 
    
        let spacecraftDiv = outerSpace.ownerDocument.createElement('div');
        spacecraftDiv.className = this.SpacecraftCssClass;

        spacecraftDiv.style.left = (outerSpace.offsetLeft+(scWidth/2)).toString();
        spacecraftDiv.style.top = "600px";
 
        outerSpace.append(spacecraftDiv);
        return spacecraftDiv;
    }
    
    fly(outerSpace : HTMLDivElement) {
        this.graphicElement = this.createSpacecraftDivElement(outerSpace);
    }

    moveit(event : KeyboardEvent){

        if (this.graphicElement==null)
            return;

        let posLeft : number = this.graphicElement.offsetLeft -this.graphicElement.clientLeft;
        let posTop : number = this.graphicElement.offsetTop - this.graphicElement.clientTop

        if (event.code === "ArrowLeft") {
            let pos: number = posLeft - this.MOVEMENT_LENGTH_PX;
            this.graphicElement.style.left = pos.toString();
        }
        if (event.code === "ArrowRight") {
            let pos: number = posLeft + this.MOVEMENT_LENGTH_PX;
            this.graphicElement.style.left = pos.toString();
        }
        if (event.code === "ArrowUp") {
            let pos: number = posTop - this.MOVEMENT_LENGTH_PX;
            this.graphicElement.style.top = pos.toString();
       }
        if (event.code === "ArrowDown") {
            let pos: number = posTop + this.MOVEMENT_LENGTH_PX;
            this.graphicElement.style.top = pos.toString();
        }
    }

    public shoot (outerSpace : HTMLDivElement) : Bullet {

            if (this.graphicElement==undefined)
                throw new Error('Something bad happened');

            let scWidth : number = this.graphicElement?.offsetWidth as number; 
            let leftPos : number = (this.graphicElement.offsetLeft+(scWidth/2));
            let topPos : number = this.graphicElement.offsetTop;
        
            let bulletObject = new Bullet(outerSpace, leftPos, topPos);
            bulletObject.shoot();

            return bulletObject;
    }
  }