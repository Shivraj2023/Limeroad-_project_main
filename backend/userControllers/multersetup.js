const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploaded_images");
    },
    filename:(req,file,cb)=>{
       const uniquename=`${Date.now()}-${file.originalname}`;
        cb(null,uniquename);
    },
})

const upload= multer({storage:storage});

module.exports=upload;