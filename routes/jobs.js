const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');

/// Getting all
router.get('/',async (req, res)=>{
    try {
        const jobs = await Job.find();
        res.json(jobs)
    } catch (error) {
        res.status(500).json({message:error.message})
    }


})

/// Getting one
router.get('/:id',getJob,(req, res)=>{
    res.json(res.job);
})

/// Creating one
router.post('/',async (req, res)=>{
    const job = new Job({
        name:req.body.name,
        postedBy:req.body.user,
        description:req.body.description,
    })
    try{
        const newJob = await job.save();
        res.status(201).json(newJob);
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

/// Updating one
router.patch('/:id',getJob, async (req, res)=>{
    let attr = [ "name","postedBy","description","postDate"]
    attr.forEach(a=>{
        req.job[a] = req.body[a]||req.job[a];
    })
    try{
        const updatedJob = await res.Job.save()
        res.json(updatedJob)  
    }catch{

    }
})
/// Deleting one
router.delete('/:id',getJob, async (req, res)=>{
    try{
        await res.job.remove()
        res.json({"message":'Deleted Subscriber'})
    }catch(err){
        res.status(500).json({message:err.message})
    }

})

async function getJob(req,res, next){
    let job
    try{
        job = await Job.findById(req.params.id);
        if(job==null){
            return res.json(404).json({message:'Cannot find Job'});
        }
    }catch(err){
        return res.json(500).json({message:err.message})
    }
     res.job = job;
     next()
}

module.exports = router