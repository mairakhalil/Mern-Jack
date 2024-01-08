import NewUser from "../models/newUser.model.js"

export const createUser = async(req,res,next)=>{
    try{
        const user = await NewUser.create({
            name: req.body.name,
            shape: req.body.shape,
            color: req.body.color,
            // timestamp: req.timestamp
        })
        const savedUser = await user.save();
        res.status(201).json(savedUser)
    }catch(err){
           return res.status(501).send(err)
    }
}

export const getuser = async(req,res,next)=>{
    try{
        const getUser = await NewUser.find()
        if(!getUser) return next(createError(404,"Data not found"))
        res.status(200).send(getUser)
    }catch(err){
       return res.status(501).send(err)
    }
}

export const deleteUser = async(req,res,next)=>{
    try{
        // const {id} = req.params
        const getUser = await NewUser.findByIdAndDelete(req.params.id)
        console.log("hhhh")
        if(!getUser) return next(createError(404,"Data not found"))
        res.status(200).send(getUser)
    }catch(err){
       return res.status(501).send(err)
    }
}

export const updateUser = async(req,res,next)=>{
    try{
        const {id} = req.params
        const userData = req.body
        if(!userData) return next(createError(404,"Data not found"));

        const user = await NewUser.findByIdAndUpdate(id, userData, {new:true});
        res.status(200).json({success:true, data:user})
    }catch(err){
       return res.status(501).send(err)
    }
}