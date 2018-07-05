module.exports = function(app){
    const bankController = require('./bctrl.js')


    app.route('/add-order-by-credit-card')
    .post((req,res)=>{
        console.log(req.body)
        bankController.insertUser(req.body) 
        .then((data)=>{
            res.send(JSON.stringify({'message':'passed.'}))
        })
        .catch((err)=>{
            res.send(JSON.stringify({'message':'failed.',"error":err}))
        })
        } )

}