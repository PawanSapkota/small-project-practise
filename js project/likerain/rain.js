function createLike(){
    const dollar = document.createElement('div');
    dollar.classList.add('dollar');
    dollar.style.left =Math.random()*100 +'vw';
    dollar.style.animationDuration = Math.random()*2+3 +"s";
    dollar.innerText= '$';


    document.body.appendChild(dollar)
}
setInterval(createLike, 200);