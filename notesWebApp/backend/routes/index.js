const express = require('express')
const router = express.Router()
const authMiddleware= require('../middleware/authMiddleware')
const { PrismaClient } = require('@prisma/client');
const {z}=require('zod');
const prisma= new PrismaClient();

const createNoteSchema= z.object({
    title:z.string(),
    content:z.string()
})

const updateNoteSchema= z.object({
    title:z.string(),
    content:z.string()
})


router.post('/notes',authMiddleware,async(req,res)=>{
    
    const userid= req.userid;
    console.log()
    const {content,title}= req.body;
    if (!content || !userid) { 
        return res.status(400).json({ msg: "Missing required fields" });
      }

    const {success} = createNoteSchema.safeParse(req.body);
    // console.log(success)

    if (!success) {
        return res.status(400).json({
            msg: "Invalid request body"
        });
    }

    

    const currentDate = new Date().getTime();
    
    // console.log(req.body);
    const response = await prisma.note.create({
        data:{
            title:req.body.title,
            content:req.body.content,
            user: { connect: { id: userid } },
            date: `${currentDate}`,
        }
})
// console.log(response)
res.json({
    id:response.id,
    title:response.title,
    content:response.content,
    date:response.date
})

    
})


router.put('/update',async(req,res)=>{

    const {id,content,title}= req.body;
    if(!id){
        return res.status(400).json({ msg: "Missing required fields" });
    }


    const {success} = updateNoteSchema.safeParse(req.body);
    // console.log(success)

    if (!success) {
        return res.status(400).json({
            msg: "Invalid request body"
        });
    }


    const response= await prisma.note.update({
         where:{
            id:req.body.id,
         },
         data:{
            title:req.body.title,
            content:req.body.content
         }
    })
    // console.log(response);
    res.json({
        msg:"data updated successfully"
    })

})

router.delete('/delete',async(req,res)=>{

    const {id}= req.body;
    if(!id){
        return res.status(400).json({ msg: "Id is required" });
    }

    const response= await prisma.note.delete({
        where:{
            id:req.body.id,
        }
    })

    // console.log(response)


    res.json({
        msg:"data deleted successfully"
    })  
})



router.get('/getall',authMiddleware,async(req,res)=>{
   
    const response= await prisma.note.findMany({
        where:{
            userid:req.userid
        }
    })
    console.log(response)
    res.json({
       data:response,
    })  
})




module.exports=router;