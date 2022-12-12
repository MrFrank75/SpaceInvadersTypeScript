/// <reference path="Alien.ts" />
/// <reference path="Spacecraft.ts" />
/// <reference path="Bullet.ts" />
/// <reference path="CollisionMonitor.ts" />
/// <reference path="CollisionTable.ts" />

var _spaceCraft = new Spacecraft();
var _alienGeneratorTimer : NodeJS.Timer | undefined;
var _collisionMonitor : CollisionMonitor;
    
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
        let bullet : Bullet | undefined =_spaceCraft.shoot(outerSpace, _collisionMonitor);
        let bullet : Bullet | undefined =_spaceCraft.shoot(outerSpace, _collisionMonitor);
        if (bullet == undefined)
            return;
    }
}

function startGame() {
    
    let outerSpace : HTMLDivElement | null = document.getElementById('outerSpace') as HTMLDivElement;
    if (outerSpace == undefined)
        return;



    //start the collision monitor
    console.log(`Start game for rows: ${outerSpace.clientHeight} - columns: ${outerSpace.clientWidth}`);
    _collisionMonitor = new CollisionMonitor(outerSpace.clientHeight, outerSpace.clientWidth);
    _collisionMonitor.designCollisionGrid(outerSpace);
    _collisionMonitor.addSpaceCraftMonitor(_spaceCraft);
    _collisionMonitor.start();

    //add space craft
    _spaceCraft.fly(outerSpace);

    //start the aliens generation
    generateAlien(outerSpace);
    setInterval(generateAlien, 2000, outerSpace);
}

function generateAlien(outerSpace : HTMLDivElement){
    let alien = new Alien();
    alien.invade(outerSpace);
}


document.getElementById('outerSpace')?.addEventListener('keydown', keyDownHandler);
startGame();





