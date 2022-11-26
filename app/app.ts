/// <reference path="Alien.ts" />
/// <reference path="Spacecraft.ts" />
/// <reference path="Bullet.ts" />
/// <reference path="CollisionMonitor.ts" />

var _spaceCraft = new Spacecraft();
var _alienGeneratorTimer : NodeJS.Timer | undefined;
var _collisionMonitor = new CollisionMonitor();
    
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
        let bullet : Bullet | undefined =_spaceCraft.shoot(outerSpace);
        if (bullet == undefined)
            return;

        _collisionMonitor.addBulletMonitoring(bullet);
    }
}

function startGame() {
    
    let outerSpace : HTMLDivElement | null = document.getElementById('outerSpace') as HTMLDivElement;
    if (outerSpace == undefined)
        return;

    //add space craft
    _spaceCraft.fly(outerSpace);

    //start the collision monitor
    _collisionMonitor.addSpaceCraftMonitor(_spaceCraft);
    _collisionMonitor.start();

    //start the aliens generation
    setInterval(generateAlien, 2000, outerSpace);
}

function generateAlien(outerSpace : HTMLDivElement){
    let alien = new Alien();
    alien.invade(outerSpace);
    _collisionMonitor.addAlienMonitoring(alien);
}


document.getElementById('outerSpace')?.addEventListener('keydown', keyDownHandler);
startGame()





