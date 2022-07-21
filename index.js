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
const courses= await Course.find({name:/.*react*./i})
   .sort({name:-1})  //-1 for decending order
   console.log(courses)
}



// function for Update
async function courseUpdate(id){
//    const course=await Course.findById(id)
//    if (!course){
//     console.log("could not find that Id Course")
//     return
//    }

//    course.set({
//     auther:"another another auther"
//    })

//      const result=await course.save()
//      console.log(result)




     // second method Document Update First
    const result= await Course.update({_id:id},{
    $set:{
     auther:"again Huzefa",
     isPublished:true  
    }
   })   // here first parameter is query and second parameter is object to update
   
   console.log(result)

}

courseUpdate("62d8330c436cc429ed5e7b8b")




