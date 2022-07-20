const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const port = 8080

const Campground=require('./models/campground')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');

/*Campground.create(
    {
        name:'Sale Hill',
        image:'https://pixabay.com/get/g281ae17f14c48d221816868e935460e4c40f247d23b2b8ff258ba0955484349ae4ff67ab9212f0edfb903d915f3620b6_340.jpg'
    },
    function (err,campground){
        if (err) {
            console.log(err);
            
        }else{
            console.log('NEWLY created camprogund');
            console.log(campground);

        }
        
    }
)*/

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')


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

            res.render('index',{campgrounds:allCampgrounds})
        }

    })
    

})

//NEW-show form to create new campground
app.get('/campgrounds/new',(req,res)=>{
    res.render("new")

})

//SHOW-shows more info in campgrounds
app.get('/campgrounds/:id',(req,res)=>{
    //find the campground with provided ID
    Campground.findById(req.params.id,(err,foundCamp)=>{
        if (err) {
            console.log(err);
            
        }else{
            //render show template with that campground
            res.render('show',{campground:foundCamp})

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

app.listen(port,function() {
    console.log("hola");
    
})