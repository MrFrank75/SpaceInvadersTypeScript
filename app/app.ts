function startGame(){
    var messageElement = document.getElementById('messages');
    messageElement!.innerText = "Welcome to MultiMath! We are starting a new game...."
}

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

    if (event.code === "Space")
        shoot(outerSpace, spaceCraft);    

}


function shoot(outerSpace : HTMLDivElement, spaceCraft : HTMLDivElement) {
    let iDiv : HTMLDivElement = document.createElement('div');
    iDiv.className = 'bullet';
    iDiv.style.left = spaceCraft.style.left;
    iDiv.style.top = spaceCraft.style.top;
    
    outerSpace.appendChild(iDiv);
}

document.getElementById('startGame')?.addEventListener('click', startGame);
document.getElementById('outerSpace')?.addEventListener('keydown', keyDownHandler);
