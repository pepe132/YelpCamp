
const {Schema,model}=require('mongoose');

const CommentSchema=Schema({
    text:{
        type:String,
       
    },
    author:{
        type:String,
        
    },
    
})

//IMOORTANTE: aqui es donde se va a mostrar que argumentos va a llegar la respuesta 

/*CategoriaSchema.methods.toJSON=function () {
    const {__v,estado,...categoria}=this.toObject()//estoy sacando la version y el password de la respuesta y tofos lod demas se almacenan

    return categoria
    
}*/


module.exports=model('Comment',CommentSchema)