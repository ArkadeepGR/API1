const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient
const ObjectId=mongodb.ObjectID

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='tm'



mongoClient.connect(connectionURL,{useNewUrlParser:true},function(error,client){
    if(error){
        console.log("Unable to connect to database.")
    }
    else{
        console.log("Connected")
        const db=client.db(databaseName)

        db.collection('users').deleteOne({name:"Aman"}).then(function(result){
            console.log(result)
        }).catch(function(error){
            console.log(error)
        })

        /*
        db.collection('users').updateOne({_id:new ObjectId("5f0d609cf63694333c5c8069")},{
            $set:{
                name:"Mike"
            }
        }).then(function(result){
            console.log(result)
        }).catch(function(error){
            console.log(error)
        })
        */
        /*
        db.collection('users').findOne({name:'Rohit'},function(error,result){
            if(error){
                console.log("Failed")
            }else{
                console.log(result)
            }
        })*/

        /*
        db.collection('users').findOne({_id:new ObjectId("5f0d62ce52c0d11e9431a573")},function(error,result){
            if(error){
                console.log("Failed")
            }else{
                console.log(result)
            }
        })
        */

        /*
        db.collection('users').find({name:"Aman"}).toArray(function(error,result){
            if(error){
                return console.log("Failed")
            }
            console.log(result)
        })

        db.collection('users').find({name:"Aman"}).count(function(error,result){
            if(error){
                return console.log("Failed")
            }
            console.log(result)
        })
        */

        /*
        db.collection('users').insertMany([
            {name:'Rohit',age:'30'},{name:'Karan',age:'12'}
        ],function(error,result){
            if(error){
                console.log("Failed")
            }else{
                console.log(result.ops)
            }
        })
          */  
        /*
        db.collection('users').insertOne({
            name:'Aman',
            age:27
        },function(error,result){
            if(error){
                console.log("Failed");
            }else{
                console.log(result.ops)
            }
        })
        */
    }
})