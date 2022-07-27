const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("connected to MongoDb"))
    .catch(err => console.error("Could not connect", err))



//Defineing Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5,
        maxlength:100,
        //  match:/regex here/   for some specied pattern
    },
    auther: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
       // required: true  // seting required true for array create problem bcz its sends empty array to db so for this write custom valdation
        validate:{
            validator: function (v){
                return v && v.length>0
            },
            message:"A course should have atleats one value"
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min:1000,
        max:5000
    },
    catagery:{
        type:String,
        required:true,
        enum:['programing','networking']
     }
})


//compiling scheme to model which gives a class
const Course = mongoose.model("Course", courseSchema)


// function for creating Course
async function createCourse() {
    // creating object of my Course
    const course = new Course({
       
        name: "checking validation for empty array",
        auther: "Huzefa Tariq",
        catagery:"networking",
        tags: [],
        isPublished: true,
        price:3000

    })

    try {
        const result = await course.save()
        console.log(result)
    }
    catch (err) {
        console.log(err.message)
    }
}

createCourse()



// function for Geting Course 
async function getCourses() {
    const courses = await Course.find({ name: /.*react*./i })
        .sort({ name: -1 })  //-1 for decending order
    console.log(courses)
}



// function for Update
async function courseUpdate(id) {
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
    //     const result= await Course.update({_id:id},{
    //     $set:{
    //      auther:"again Huzefa",
    //      isPublished:true  
    //     }
    //    })   // here first parameter is query and second parameter is object to update

    //    console.log(result)





    // 3rd method findByIDAndUpdate
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            isPublished: false
        }
    }, { new: true })
    console.log(course)

}





async function deleteCourse(id) {
    const result = await Course.deleteOne({ _id: id })
    console.log(result)
}





