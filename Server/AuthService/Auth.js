module.exports = function(app){
    const userContrller = require('./AuthController/Auth.Controller')
    const jwt = require('jwt-simple');
    const config_log = require('./AuthController/authConfig')

    //user authentication by getting data from database
    app.route('/login')
    .post((req,res)=>{
userContrller.searchUser(req.body.username)
.then((data)=>{
    if(data.username == req.body.username && data.password == req.body.pass){
        var token = jwt.encode({ username: req.body.username }, config_log.JWT_SECRET);
                            console.log("authentication success")
        res.send(JSON.stringify({"token":token,"username":data.username,"message":"Authentication successfull"}))
    }
    else{
        res.send(JSON.stringify({"token":null,"data":null, "message":"Invalid Credentials."}))
    }
}).catch((err)=>{
    console.log("Error in authenticating user")
})
    })

    //insert user data to the database.
    app.route('/add-user')
    .post((req,res)=>{
        console.log(req.body)
        userContrller.insertUser(req.body) 
        .then((data)=>{
            res.send(JSON.stringify({'message':'passed.'}))
        })
        .catch((err)=>{
            res.send(JSON.stringify({'message':'failed.',"error":err}))
        })
        } )

}