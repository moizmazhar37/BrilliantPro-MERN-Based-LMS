const mongoose = require('mongoose')


const QuestionSchema = new mongoose.Schema({
    statement: {
        type: String,
    },
    options: {
        type: [String]
    },
    answer: {
        type: String
    }
})

const AssessmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    time:{
        type: Number
    },
    questions:{
        type: [QuestionSchema]
    },
    passing_criteria:{
        type: Number
    }
 })

 
const LearnerSchema = new mongoose.Schema(
    {
        username:{
            type: String,
           
        },
        name:{
            type: String,
          
        },
        email: {
            type: String,
       
        },
        password: {
            type: String,
         
        },
        courses_enrolled: {
            type: [String]
        },
        progress:{
            type: [Number]
        },
        certificates:{
            type: [String]
        }
    }
)


const CourseSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    learners:{
        type: [LearnerSchema]
    },
    assessments:{
        type: [AssessmentSchema]
    },
    materials: {
        type: [String]
    },
    course_image:{
        type: String
    },
    start_date:{
        type: Date
    },
    end_date:{
     type: Date
    },
    enrollment_link:{
        type: String
    },
    description:{
        type: String
    },
    certificate:{
        type: String
    }
 })

 const ProgressSchema = new mongoose.Schema({
     learner_id: {
        type: String
     },
     course_id: {
        type: String
     },
     progress_value: {
        type: Number
     }
 })


module.exports = {
    Learner :mongoose.model('Learner', LearnerSchema),
    Course: mongoose.model('Course', CourseSchema),
    Assessment: mongoose.model('Assessment', AssessmentSchema),
    Question: mongoose.model('Question', QuestionSchema),
    Progress: mongoose.model('Progress',ProgressSchema)
}