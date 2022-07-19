const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')

const campgrounds=[
    {name:'Salmon creek',image:'https://pixabay.com/get/gc36055c734928575a588e73952050fcf60f63d18b37a542837a9413ab2174cff1c12e46a237678a8e230d418e2ea3361_340.jpg'},
    {name:'Siko creek',image:'https://pixabay.com/get/g281ae17f14c48d221816868e935460e4c40f247d23b2b8ff258ba0955484349ae4ff67ab9212f0edfb903d915f3620b6_340.jpg'},
    {name:'Mountain creek',image:'https://pixabay.com/get/gd0f496b5feeca632ceb7165226adef6b35c01c77ee9a73ebbe069568c6af0a33284cf8ff8f82deded35892267b4c5190_340.jpg'},
    {name:'Salmon creek',image:'https://pixabay.com/get/gc36055c734928575a588e73952050fcf60f63d18b37a542837a9413ab2174cff1c12e46a237678a8e230d418e2ea3361_340.jpg'},
    {name:'Siko creek',image:'https://pixabay.com/get/g281ae17f14c48d221816868e935460e4c40f247d23b2b8ff258ba0955484349ae4ff67ab9212f0edfb903d915f3620b6_340.jpg'},
    {name:'Mountain creek',image:'https://pixabay.com/get/gd0f496b5feeca632ceb7165226adef6b35c01c77ee9a73ebbe069568c6af0a33284cf8ff8f82deded35892267b4c5190_340.jpg'},
]

app.get('/',(req,res)=>{
    res.render('landing')

})

app.get('/campgrounds',(req,res)=>{
    
    res.render('campgrounds',{campgrounds:campgrounds})

})

app.get('/campgrounds/new',(req,res)=>{
    res.render("new")

})

app.post('/campgrounds',(req,res)=>{
    const name=req.body.name
    const image=req.body.image
    const newCamp={name:name,image:image}

    campgrounds.push(newCamp)

    res.redirect("/campgrounds")

})

app.listen(port,function() {
    console.log("hola");
    
})