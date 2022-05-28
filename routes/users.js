const express = require('express');
const router = express.Router();
const User = require('../models/users');
/// Getting all
router.get('/',async (req, res)=>{
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }


})
/// Getting one
router.get('/:id',getUser,(req, res)=>{
    res.json(res.user);
})
/// Creating one
router.post('/',async (req, res)=>{
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        username: req.body.username

    })
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
/// Updating one
router.patch('/:id',getUser, async (req, res)=>{
    let attrs= [name,username,password,joiningDate,skills]
    attrs.forEach(a=>{
        res.user[a] = req.body[a] || res.user[a];
    })
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)  
    }catch{

    }
})
/// Deleting one
router.delete('/:id',getUser, async (req, res)=>{
    try{
        await res.user.remove()
        res.json({"message":'Deleted Subscriber'})
    }catch(err){
        res.status(500).json({message:err.message})
    }

})

async function getUser(req,res, next){
    let user
    try{
        user = await User.findById(req.params.id);
        if(user==null){
            return res.json(404).json({message:'Cannot find User'});
        }
    }catch(err){
        return res.json(500).json({message:err.message})
    }
     res.user = user;
     next()
}

module.exports = router