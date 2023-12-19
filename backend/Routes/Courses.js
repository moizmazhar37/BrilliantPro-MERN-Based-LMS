const express = require('express')
const router = express.Router()
const Models = require('../Models/Models')
const course = Models.Course
const assessment = Models.Assessment
const progress = Models.Progress
const multer = require('multer')
const path = require('path')
const res = require('express/lib/response')
const req = require('express/lib/request')

//const upload = multer({ dest: "Assets/" });

//Multer configurations
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Assets/')
    },
    filename: function (req, file, cb) {
      /*Appending extension with original name*/
      //path.extname(file.originalname)
      file.originalname = file.originalname.replace(/ /g,"_");

      cb(null,  Date.now() +'-' +file.originalname) 
    
    }
  })
  

var upload = multer({ storage: storage });



router.get('/',async (req,res) => {
    course.find(req.query).then(courses => {res.json(courses)}).catch(err => {res.json({message: err})})
})

router.get('/count', async (req,res) => {
  await course.countDocuments().then(data => {
      console.log('data', data)
      res.json(data)
  }).catch(err => res.json({message: err}))
})

router.get('/specific/:user_id', async (req, res) => {
  await course.find().elemMatch("learners", {"_id": req.params.user_id}).then(data => res.json(data)).catch(err => res.json({message: err}))
})

router.get('/:id', async (req, res) => {
    await course.findById(req.params.id).then(data => {res.json(data)}).catch(err => {res.json({message: err})})
})

router.post('/add',upload.array("files"),async (req,res) => {
    console.log('body',req.body)
    
    // console.log(req.body.name,
    // // assessments: req.body.assessments,
    // // learners: req.body.learners,

    // [req.files[0].path],
    // req.body.start_date ,
    // req.body.end_date,
    // req.files[1].path,
    // req.body.enrollment_link, req.body.description)
    for(let i = 0; i < 3; i++){
        req.files[i].path = req.files[i].path.replace(/\\/g,"/");
    }
    
    console.log('files',req.files)


    const Course = new course({
        name: req.body.name,
        // assessments: req.body.assessments,
        // learners: req.body.learners,
        materials: [req.files[0].path],
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        course_image: req.files[1].path,
        enrollment_link: req.body.enrollment_link,
        description: req.body.description,
        certificate: req.files[2].path,
        learners: req.body.learners,
        assessments: req.body.assessments
    })
    // console.log(req.body.new_course.start_date,req.body.new_course.end_date,Course.enrollment_link,Course.description)
    Course.save().then(data => {res.json(data)}).catch(err => {res.json({message: err})})
})




router.put('/settings/update/:id',async (req,res) => {
  var C = await course.findById(req.params.id)
  C.name = req.body.name
  C.description = req.body.description
  C.start_date = req.body.start_date
  C.end_date = req.body.end_date
  C.enrollment_link = req.body.enrollment_link  
  console.log(C)
  C.save().then(data => {res.json(data)}).catch(err => {res.json({message: err})})
})




router.put('/:id', async (req, res) => {
  try{
    console.log(req.body)
    await course.findOneAndUpdate({'_id': req.params.id}, req.body).then(data => res.json(data)).catch(err => {res.json({message: err})})
  }
  catch(err){
    res.json(err)
  }
})


router.delete('/:id', async (req,res) => {
  try{
      console.log('Deletin a Course!')
      await course.deleteOne({_id: req.params.id});
      await progress.deleteMany({course_id: req.params.id});
      res.send('Course has been deleted')
  }
  catch(err){
      res.json({message: err});
  }
})

// router.post('/add/again', (req, res) => {
//   console.log(req.body);
  
//   const Course = new course({
//     name: req.body.name,
//     // assessments: req.body.assessments,
//     // learners: req.body.learners,
//     materials: req.body.materials,
//     start_date: req.body.start_date,
//     end_date: req.body.end_date,
//     course_image: req.body.course_image,
//     enrollment_link: req.body.enrollment_link,
//     description: req.body.description,
//     certificate: req.body.certificate,
//     learners: req.body.learners,
//     assessments: req.body.assessments
     
//   })
//   Course.save().then(data => {res.json(data)}).catch(err => {res.json({message: err})})
// });

router.put('/:id/learners', async (req, res) => {
    console.log(req.body)
    //await course.findOneAndUpdate({_id: req.params.id}, {$pull:{learners: req.body.learner._id}}).then(data => res.json(data)).catch(err => {res.json({message: err})})
  //   await course.findByIdAndUpdate(req.params.id, {
  //     $pull: {
  //         learners: { _id: req.body._id }
  //     }
  // }, { new: true })
    const C = await course.findOne({_id: req.params.id})
    
    for (let i = 0; i < C.learners.length; i++){
      if (C.learners[i]._id == req.body._id){
        await C.learners.splice(i,1)
      }
    }
    console.log('learnersnew ', C.learners)

    //console.log(C)
    await C.save().then(() => res.send('done')).catch(err => {res.json({message: err})})
})

  


router.post('/:id/addMaterial',upload.array("files"),async (req,res) => {
  
  //req.files[0].path = req.files[0].path.replace(/\\/g,"/");
  
  const C = await course.findOne({_id: req.params.id})
  console.log(C)
  await console.log(req.files[0])
  console.log(req.files[0].path)
  req.files[0].path = await req.files[0].path.replace(/\\/g,"/")
  console.log(req.files[0].path)
  C.materials.push(req.files[0].path)
  console.log('C again', C)
  await C.save().then(data => {res.json(data)}).catch(err => {res.json({message: err})})
})


router.put('/:id/removeMaterial', async (req,res) => {
  
  //req.files[0].path = req.files[0].path.replace(/\\/g,"/");
  
  const C = await course.findOne({_id: req.params.id})
  console.log(C)
  //req.files[0].path = await req.files[0].path.replace(/\\/g,"/")
  console.log('material to remove', req.body)

  for (let i = 0; i < C.materials.length; i++){
    if (C.materials[i] == req.body.mat){
      await C.materials.splice(i,1)
    }
  }
  // C.materials.push(req.files[0].path)
  console.log('C updated materials', C.materials)
  await C.save().then(data => {res.json(data)}).catch(err => {res.json({message: err})})

})


router.put('/:id/addAssessment', async (req,res) => {
  console.log(req.body)
  const Assessment = new assessment({
    name: req.body.name,
    time: req.body.time,
    questions: req.body.questions,
    passing_criteria: req.body.passing_criteria
  })
  //res.json(Assessment)
  // we want to add it to the current course
  const C = await course.findOne({_id: req.params.id})
  C.assessments.push(Assessment)
  await C.save().then(data => {res.json(data)}).catch(err => {res.json({message: err})})
})

router.put('/:id/removeAssessment', async (req, res) => {
  const assessment_id = req.body._id
  console.log(assessment_id)
  const C = await course.findOne({_id: req.params.id})
  for (let i = 0; i < C.assessments.length; i++){
    if (C.assessments[i]._id == req.body._id){
      await C.assessments.splice(i,1)
    }
  }
  C.save().then(() => res.send('done')).catch(err => {res.json({message: err})})
  

})
router.get('/:id/Assessments', async (req, res) => {
  await course.findById(req.params.id).then(Course => {res.json(Course.assessments)}).catch(err => res.json({message: err}))
})

router.get('/:id/Assessments/:a_id', async (req, res) => {
  const Course = await course.findById(req.params.id)
  for (let i = 0; i < Course.assessments.length; i++){
    if (Course.assessments[i]._id.toString() === req.params.a_id){
      console.log('found it')
      res.json(Course.assessments[i])
      break
    }
  }

})

router.get('/:id/Assessments/:a_id/qs', async (req, res) => {
  const Course = await course.findById(req.params.id)
  for (let i = 0; i < Course.assessments.length; i++){
    if (Course.assessments[i]._id.toString() === req.params.a_id){
      console.log('found it')
      res.json(Course.assessments[i].questions)
      break
    }
  }

})
module.exports = router