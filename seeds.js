const mongoose=require('mongoose')
const Campground=require('./models/campground')

const Comment=require('./models/comments')

const data=[
    {
        name:'Cloud image',
        image:'https://images.pexels.com/photos/130576/pexels-photo-130576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        description:'hello'
    },
    {
        name:'Camp hill',
        image:'https://cdn.pixabay.com/photo/2019/12/28/14/00/chromehill-4724725__340.jpg',
        description:'hello'
    }

]

function seedDB() {
    //remove all campgrounds
    Campground.deleteMany({},(err)=>{
        if (err) {
            console.log(err);
            
        }
        console.log('remove campgrounds');
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if (err) {
                    console.log(err);
                    
                }else{
                    console.log('added info');
                    //add a few comments
                    Comment.create(
                        {
                            text:'This place is great, but it is really cold',
                            author:'Homer'
                        },function(err,comment) {
                            if (err) {
                                console.log(err);
                                
                            }else{

                                campground.comments.push(comment)
                                campground.save();
                                console.log('Created new comment');
                            }
                            
                        }
                    )
                }
            })
        })
    })
   
    
}

module.exports=seedDB;
