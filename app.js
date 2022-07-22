const bodyParser = require('body-parser')
const express = require('express');
const app = express()

const port = 8080
const passport=require('passport')
const LocalStrategy=require('passport-local')

const seedDB=require('./seeds')

const Campground=require('./models/campground')
const Comment=require('./models/comments')
const User=require('./models/user')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))
seedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret:'Once again Rusty wins cutest dogs',
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next){
    res.locals.currentUser=req.user;
    next();
    
})

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

            res.render('campgrounds/index',{campgrounds:allCampgrounds, currentUser:req.user})
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

app.get('/campgrounds/:id/comments/new',isLoggedIn,function(req,res){
    //find campground by id 
    Campground.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err);
            
        }else{
            
            res.render('comments/new',{campground:campground})
        }
    })
})

app.post('/campgrounds/:id/comments',isLoggedIn,function (req,res) {
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
//-------------------------
//AUTH ROUTES
//-------------------------

//Show register form

app.get('/register',function(req,res){
    res.render('register')
    
})

//handle sign up logic

app.post('/register',function(req,res){
    const newUser=new User({username:req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if (err) {
            console.log(err);
            return res.render('register')
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/campgrounds')

        })

    })
    
})

//show login form

app.get('/login',function (req,res){
    res.render('login')
    
})

//handling login logic

app.post('/login',passport.authenticate('local',
    {
        successRedirect:'/campgrounds',
        failureRedirect:'/login'

    }),function (req,res){
})

//logic route

app.get('/logout',function (req,res){
    req.logOut()
    res.redirect('/campgrounds')
    
})

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
    
}

app.listen(port,function() {
    console.log("hola");
    
})


//serverus 123456