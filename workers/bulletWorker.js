
onmessage = (messageEvent) => {
    let currentpos = parseInt(messageEvent.data);

    function moveBullet(){
        if (currentpos>0){
            currentpos-=10;
            postMessage(currentpos);
        }
        else
            clearInterval(moveBullet);
    } 

    setInterval(moveBullet,100);
}

