import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
import {createError} from '../utills/createError.js';

export const register = async(req,res,next)=>{
    try{
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = await User.create({
            ...req.body,
            password:hash
        })
        res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
}

export const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return next(createError(404,"User Not Found"))

        const isCorrect = bcrypt.compareSync(req.body.password,user.password);
        if(!isCorrect) return next(createError(400,"wrong password or email"));

        const token = jwt.sign({
            id:user._id,
            role:user.role
        },
        process.env.JWT_KEY)

        const {password, ...info} = user._doc;
        res.cookie("accessToken",{
            sameSite:'none',
            secure:true
        }).status(200).send(info)
    }catch(err){
        next(err)
    }
}

export const logout = (req, resp) => {
    resp.clearCookie("accessToken",{
        sameSite: "none",
        secure: true
    }).status(200).send("user has been logged out")
};