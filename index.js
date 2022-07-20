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

createCourse()




