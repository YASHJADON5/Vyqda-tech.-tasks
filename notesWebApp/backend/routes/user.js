const express = require('express')
const authMiddleware= require('../middleware/authMiddleware')
const user= express.Router();
const {z}= require('zod');
const {PrismaClient} = require('@prisma/client')
const jwt =require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY;

const prisma= new PrismaClient();


const signUpBody= z.object({
    fullName:z.string(),
    email:z.string().email(),
    password:z.string()
})
const signInBody= z.object({
    email:z.string().email(),
    password:z.string()
})

user.post('/signup', async(req,res)=>{

    const {success} = signUpBody.safeParse(req.body);

    if(!success){
        return res.json({
            msg:'data is insufficient'
        })
    }
    try{

        const checkUser= await prisma.user.findUnique({
            where:{
                email:req.body.email
            }
        })

        if(checkUser){
            return res.status(400).json({
                msg: 'User already exists'
              });
        
        }

    
    const response= await prisma.user.create({
        data:{
            fullname:req.body.fullName,
            email:req.body.email,
            password:req.body.password
        }
    })
    // console.log(response)
    // console.log()

    const token= jwt.sign({email:req.body.email,id:response.id},JWT_KEY,{expiresIn:'24h'})


    res.json({
        token:token,
      });
    }
    catch(err){
        // console.log(err)
          res.status(403).json({
            msg:"somthing breaks"
          })
    }


})











user.post('/signin', async(req,res)=>{

    const {success} = signInBody.safeParse(req.body);

    if(!success){
        return res.json({
            msg:'data is insufficient'
        })
    }
    try{

    
    const response= await prisma.user.findUnique({
        where:{
            email:req.body.email,  
        }
    })
    console.log(response,1)

    if(response){
        const token = jwt.sign({email:req.body.email,id:response.id},JWT_KEY,{expiresIn:'24h'});

        res.json({
            token: token,
          });
        }
        else{
            
            res.json({
                msg: 'User not found',
              });
            }


    }

    catch(err){
        
          res.status(403).json({
            msg:"somthing breaks"
          })
    }


})







module.exports=user














