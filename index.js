const express=require('express')
require("./mongoose1")
const User=require("./userModel")
const jwt=require("jsonwebtoken")


const app=express()
const port=process.env.PORT || 3000


app.use(express.json())

app.post('/users',function(req,res){
    const user=new User(req.body)
    user.save().then(function(){
        res.status(201)
        res.send(user)
    }).catch(function(e){
        res.status(400)
        res.send(e)
    })
})

app.get("/allusers",function(req,res){
    try{
    const t=req.header('Authorization').replace('Bearer ','')
    const decoded=jwt.verify(t,"123")
    User.findOne({_id:decoded._id,tokens:t}).then(function(user){
        if(!user){
            return res.status(404).send({Error:"Not authorized"})
        }
        User.find({}).then(function(result){
            res.status(200)
            res.send({authorized:user.name,Result:result})
        }).catch(function(e){
            res.status(500).send(e)
        })

    }).catch(function(e){
        return res.status(400).send()
    })
    }catch(e){
        return res.status(400).send()
    }
})

app.get("/user/logout",function(req,res){
    try{
        const t=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(t,"123")
        User.findOne({_id:decoded._id,tokens:t}).then(function(user){
            user.tokens=user.tokens.filter(function(i){
                if(i==t)
                    return false
                else    
                    return true
            })

            user.save()
            res.status(200).send({Logout:"Success"})

        }).catch(function(error){
            res.status(400).send()
        })
        }catch(e){
        return res.status(404).send()
    }
})

app.post("/user/login",function(req,res){
        const e=req.body.email
        const a=req.body.age
        User.find({email:e,age:a}).then(function(user){
            if(user.length==0){
                return res.status(404).send()
            }
            const token=jwt.sign({_id:user[0]._id.toString()},"123")
            user[0].tokens.push(token)
            user[0].save()
            res.status(200).send({Loggedin:user[0],Token:token})
        }).catch(function(error){
                res.status(500).send(error)
            })
        })

app.delete("/delete/:id",function(req,res){
    const _id=req.params.id
    console.log(_id)
    User.findByIdAndDelete(_id).then(function(result){
        if(!result){
            return res.status(404).send()
        }else{
            res.status(200)
            res.send(result)
        }
    }).catch(function(error){
        res.status(400)
        res.send(error)
    })
})

app.patch("/update/:id",function(req,res){
    const _id=req.params.id
    console.log(_id)

    const updates=Object.keys(req.body)
    const allowed=['name','age']
    const isValid=updates.every(function(e){
        return allowed.includes(e)
    })

    if(!isValid){
        return res.status(400).send({error:"Invalid update."})
    }

    User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true}).then(function(result){
        if(!result){
            return res.status(404).send()
        }
        res.send(result)
    }).catch(function(e){res.status(500).send(e)})

})

app.get("/user/:id",function(req,res){
    const _id=req.params.id
    User.findById(_id).then(function(result){
        if(!result){
            return res.status(404).send()
        }
        res.send(result)
    }).catch(function(e){
        res.status(400).send(e)
    })
})

app.listen(port,function(){
    console.log("Server Up.")
})