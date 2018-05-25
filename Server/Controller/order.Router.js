module.exports = (app)=>{
    var commentController = require('./order.Controller')

    app.route('/hey')
    .post((req,res)=>{
        console.log(req.body)
        commentController.insert(req.body) 
        .then((data)=>{
            // res.status(data.status).send({message:data.message})
            res.send(JSON.stringify({'message':'passed.'}))
        })
        .catch((err)=>{
            // res.status(data.status).send({message:data.message})
            res.send(JSON.stringify({'message':'failed.'}))
        })
        } )
}   