const text = 'Hey! My name is Pawan..';

 let index=0;
 function writeText(){
     document.body.innerText=text.slice(0,index);

     index++;
     console.log(text)
     if(index === text.length){
         index=0;
     }

     document.body.appendChild(text)

 }
 setInterval(writeText, 100);

    

     
        
    
