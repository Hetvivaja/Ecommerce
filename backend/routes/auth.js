const express=require('express');
const router=express.Router();

const users=[
    {username:'admin', password:'12345'}
];

router.post('/login',(req,res)=>{
    const{username,password}=req.body;
    console.log('Received:', username, password);

    const user=users.find(u=>u.username===username && u.password===password);
    if(user){
        req.session.user=user;
        res.redirect('/dashboard');
    }
    else{
        res.status(401).send("Invalid credentials");
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
});

module.exports=router;