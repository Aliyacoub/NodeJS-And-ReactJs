const mongoose=require("mongoose");

const Schema=mongoose.Schema;



const CommentSchema=new Schema({

    content:{

        type:String,

        required:true
    },

    author:{

        type:Schema.Types.ObjectId,

        ref:'User'
    },

    create_at:{

        type:Date,

       default:Date.now  
   
    },

});

const PostSchema=new Schema({
    title:{

        type:String,

        required:true
    },

    content:{

        type:String,
        
        required:true
    },

    author:{

        type:Schema.Types.ObjectId,

        ref:'User'
    },

    comments:[
        
        CommentSchema,
    ],

    create_at:{

        type:Date,

       default:Date.now  
   
    },
    
});


const Post=mongoose.model('Post',PostSchema);

module.exports=Post;