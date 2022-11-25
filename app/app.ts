/// <reference path="Alien.ts" />
/// <reference path="Spacecraft.ts" />
/// <reference path="Bullet.ts" />

var _spaceCraft = new Spacecraft();
var alienGeneratorTimer : NodeJS.Timer | undefined;
    
function keyDownHandler(event: KeyboardEvent) : void {
    console.log(event.code);
 //   let outerSpace: HTMLDivElement = document.getElementById('outerSpace') as HTMLDivElement;

    if (event.code === "ArrowUp" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight"){
            _spaceCraft.moveit(event);
        }
 
    if (event.code === "Space"){
        let outerSpace : HTMLDivElement | null = document.getElementById('outerSpace') as HTMLDivElement;
        if (outerSpace == undefined)
            return;
        _spaceCraft.shoot(outerSpace);
    }
}

function startGame() {
    //add an alien
    let outerSpace : HTMLDivElement | null = document.getElementById('outerSpace') as HTMLDivElement;
    if (outerSpace == undefined)
        return;

    _spaceCraft.fly(outerSpace);

    //aliens generation
    setInterval(generateAlien, 2000, outerSpace);
}

function generateAlien(outerSpace : HTMLDivElement){
    let alien = new Alien();
    alien.invade(outerSpace);
}


document.getElementById('outerSpace')?.addEventListener('keydown', keyDownHandler);
startGame()





