const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log("connected to MongoDb"))
.catch(err=>console.error("Could not connect",err))



//Defineing Schema
const courseSchema=new mongoose.Schema({
    name:String,
    auther:String,
    tags:[String],
    date:{type:Date, default:Date.now},
    isPublished:Boolean
})


//compiling scheme to model which gives a class
const Course=mongoose.model("Course",courseSchema)


// function for creating Course
async function createCourse(){
// creating object of my Course
const course=new Course({
    name:"React js",
    auther: "Huzefa Tariq",
    tags:["React Js","FrontEnd"],
    isPublished:true
})

const result=await course.save()
console.log(result)
}



// function for Geting Course 
async function getCourses(){
   const courses= await Course.find()
   .limit(2)
   .select({name:1,tags:1})
   .sort({name:-1})  //-1 for decending order
   console.log(courses)
}

getCourses()




