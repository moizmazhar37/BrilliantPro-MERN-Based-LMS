const express = require('express')
const router = express.Router()
const Models = require('../Models/Models')
const progress = Models.Progress

router.post('/', (req,res) => {
    const Progress = new progress({
        learner_id: req.body.learner_id,
        course_id: req.body.course_id,
        progress_value: req.body.progress_value
    })
    Progress.save().then(data => res.json(data)).catch(err => res.json({message: err}))
})


router.get('/', async (req, res) => {
    await progress.find().then(data => res.json(data)).catch(err => res.json({message: err}))
})
router.get('/course/:course_id', async (req, res) => {
    await progress.find({ course_id: req.params.course_id}).then(data => res.json(data)).catch(err => res.json({message: err}))
})

router.get('/learner/:learner_id', async (req, res) => {
    await progress.find({learner_id: req.params.learner_id}).then(data => res.json(data)).catch(err => res.json({message: err}))
})

router.put('/:learner_id/:course_id', async (req, res) => {
    const Progress = await progress.findOne({learner_id: req.params.learner_id, course_id: req.params.course_id});
    Progress.progress_value += req.body.points
    if (Progress.progress_value > 100){
        Progress.progress_value = 100
    }
    Progress.save().then(data => res.json(data)).catch(err => res.json({message: err}))
})


router.get('/:learner_id/:course_id', async (req, res) => {
    await progress.findOne({learner_id: req.params.learner_id, course_id: req.params.course_id}).then(data => res.json(data)).catch(err => res.json({message: err}))
})



router.delete('/:learner_id/:course_id', async (req,res) => {
    try{
        console.log('Deleting a progress')
        await progress.deleteOne({learner_id: req.params.learner_id, course_id: req.params.course_id});
        res.send('progress has been deleted')
    }
    catch(err){
        res.json({message: err});
    }
})



module.exports = router