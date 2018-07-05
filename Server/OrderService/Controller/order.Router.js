module.exports = (app)=>{
    var foodOrderController = require('./order.Controller')

    // save food order list, bill and payment information (purchased using Dialog mobile)
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


        // route for adding foods to the database. user interface is not created for this part
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

            //Get all foods from the database. (This is called each time when home page is loaded in the client)
        app.route('/get-all-foods')
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