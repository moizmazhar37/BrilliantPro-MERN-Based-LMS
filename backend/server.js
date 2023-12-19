const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()

//onst CONNECTION_STR = "mongodb+srv://ahmed:ahmed123@cluster0.fmo1x.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 4000;
const app = express();
const CoursesRoute = require('./Routes/Courses');
const LearnersRoute = require('./Routes/Learners')
const ProgressesRoute = require('./Routes/Progresses')
app.use(cors());
app.use(bodyparser.json());
app.use('/Assets',express.static('Assets'))
app.use('/Learners', LearnersRoute)
app.use('/Courses', CoursesRoute)
app.use('/Progresses', ProgressesRoute)


app.get('/',(req,res) => {
    res.send('we are home')
})


mongoose.connect(process.env.CONNECTION_STR, () => {
    console.log('connected to database!')
    app.listen(PORT, () => (console.log('Here we go!')))
})


