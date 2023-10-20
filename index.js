const express = require('express');
const app= express();
const jwt = require('jsonwebtoken');

app.use(express.json());
const jwtSecret='paw@n123';

const posts=[
    {
        username:'Pawan',
        title:'post1'
    },
    {
        username:'sapkota',
        title:'post2'
    }

]

app.get('/posts',(req,res)=>{
    console.log(posts)
    res.json(posts)

})

app.post('/login',authToken,(req,res)=>{
    //Authenticate the user
    const username =req.body.username
    const user = {name:username}

   const accessToken =  jwt.sign(user,jwtSecret);
   res.json({Token:accessToken})
})

function authToken(req,res,next){

}

app.listen(3000)
