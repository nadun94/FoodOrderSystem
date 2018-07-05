var mongoose = require('../UserModel/UserModel');

var UserModel = mongoose.model('FoodUser');


var UserControllerMain = function(){

    //insert user
  this.insertUser = (data)=>{
        return new Promise((resolve,reject)=>{
                var userMdl= new UserModel({
                    id:data.id,
                    name:data.name,
                    username:data.username,
                    password:data.pass,
                    phone:data.phone,
                    email:data.email,
                })

                userMdl.save().then(
                    ()=>{
                        resolve({status:200,message:"New User is added."})
                    }).catch((err)=>{
                        reject({status:500,message:"Error inserting data"})
                        console.log(err)
                    })
        
    })

    

}


this.searchUser= (username)=>{
    console.log(username)
    return new Promise((resolve,reject)=>{
        UserModel.find({username:username.toString()}).then((data)=>{
            resolve({status:200,message:"Success "})
        }
            
        ).catch((err)=>{
            reject({status:500,message:"Error"})
        })
    })

}


}

module.exports= new UserControllerMain();