const {User} = require('../models/UserModel')

exports.registerUser = (req,res)=>{
    const user = new User(req.body)

    user.save((err,doc) => {
        if(err){
            return res.status(422).json({
                success: false,
                message: "Please enter a unique email & username",
                data:err
            })
        }else{
            return res.status(200).json({
                success: true,
                message: "Successfully registered",
                data:err
        })
        }
    })
}

exports.loginUser = (req,res)=>{

    User.findOne(({email:req.body.email}), (err,user)=>{
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Invalid email'
            })
        }

        

        user.comparePassword(req.body.password, (err,isMatch)=>{
            if(!isMatch){
                return res.status(401).json({
                    success: false,
                    message: 'Invalid password'
                })
            }
            user.generateToken((err,token) => {
                if(err){
                    return res.status(404).json({
                        success: false,
                        message: 'Unable to generrate jwt',
                        data: err
                    })
                }
                return res.status(200).json({
                    success:true,
                    message:'Successfully logged in',
                    data: {
                        "token":token
                    }
                })
            })
            
        })
    })
    
}