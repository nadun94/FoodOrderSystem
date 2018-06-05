module.exports = (app)=>{
    var foodOrderController = require('./order.Controller')

    app.route('/add-order-by-phone')
    .post((req,res)=>{
        console.log(req.body)
        foodOrderController.insertOrder(req.body) 
        .then((data)=>{
            // res.status(data.status).send({message:data.message})
            res.send(JSON.stringify({'message':'passed.'}))
        })
        .catch((err)=>{
            // res.status(data.status).send({message:data.message})
            res.send(JSON.stringify({'message':'failed.'}))
        })
        } )

        app.route('/add-food')
        .post((req,res)=>{
            console.log(req.body)
            foodOrderController.insertFood(req.body) 
            .then((data)=>{
                // res.status(data.status).send({message:data.message})
                res.send(JSON.stringify({'message':'passed.'}))
            })
            .catch((err)=>{
                // res.status(data.status).send({message:data.message})
                res.send(JSON.stringify({'message':'failed.'}))
            })
            } )

        app.route('/hi')
        .get((req,res)=>{
            foodOrderController.searchAllFoods() 
            .then((data)=>{
                console.log(data)
                res.send(JSON.stringify({'data':data,'message':'Passed'}))
            })
            .catch((err)=>{
                // res.status(data.status).send({message:data.message})
                res.send(JSON.stringify({'data':null,'message':'failed.'}))
            })
            } )


}   