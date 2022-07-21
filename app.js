const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const port = 8080

const seedDB=require('./seeds')

const Campground=require('./models/campground')
const Comment=require('./models/comments')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))
seedDB();


app.get('/',(req,res)=>{
    res.render('landing')

})

//INDEX-show all campgrounds
app.get('/campgrounds',(req,res)=>{
    //get all campgrounds frmo db

    Campground.find({},(err,allCampgrounds)=>{
        if (err) {
            console.log(err);
            
        }else{

            res.render('campgrounds/index',{campgrounds:allCampgrounds})
        }

    })
    

})

//NEW-show form to create new campground
app.get('/campgrounds/new',(req,res)=>{
    res.render("campgrounds/new")

})

//SHOW-shows more info in campgrounds
app.get('/campgrounds/:id',(req,res)=>{
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if (err) {
            console.log(err);
            
        }else{
            //render show template with that campground
            res.render('campgrounds/show',{campground:foundCamp})
        }
    })
})

//CREATE-add new campground to DB
app.post('/campgrounds',(req,res)=>{
    const name=req.body.name
    const image=req.body.image
    const desc=req.body.description
    const newCamp={name:name,image:image,description:desc}

    //create a new campground and save to db

    Campground.create(newCamp,(err,newly)=>{
        if (err){
            console.log(err);
            
        }else{

            res.redirect("/campgrounds")
        }
    })
})

//------------------------------------------------------
//COMMENTS ROUTES
//-------------------------------------------------

app.get('/campgrounds/:id/comments/new',function(req,res){
    //find campground by id 
    Campground.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err);
            
        }else{
            
            res.render('comments/new',{campground:campground})
        }
    })
})

app.post('/campgrounds/:id/comments',function (req,res) {
    Campground.findById(req.params.id,function (err,campground){
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        }else{
            Comment.create(req.body.comment,function (err,comment) {
                if (err){
                    console.log(err);
                    
                }else{
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect('/campgrounds/' + campground._id)

                }  
            })

        }    
    })   
})

app.listen(port,function() {
    console.log("hola");
    
})