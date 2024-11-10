import express from 'express'
import { addFood, food_list, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter=express.Router();

//image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)

foodRouter.get('/list',food_list)
foodRouter.post('/remove',removeFood)



export default foodRouter;