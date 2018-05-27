var mongoose = require('../models/SchemaMapper');

var orderModel = mongoose.model('Orders');
var foodModel = mongoose.model('Food');

var OrderControllerMain = function(){

    //insert order
  this.insertOrder = (data)=>{
        return new Promise((resolve,reject)=>{
                var fdOdr= new orderModel({
                    list:data.list,
                    totalPrice:data.totalPrice,
                    payment_method:data.payment_method,
                    credit_card:data.credit_card,
                    pay_by_phone:data.pay_by_phone,


                })

                fdOdr.save().then(
                    ()=>{
                        resolve({status:200,message:"New Order is added."})
                    }).catch(()=>{
                        reject({status:500,message:"Error inserting data"})
                    })
        
    })
}

//insert foods
this.insertFood = (data)=>{
    return new Promise((resolve,reject)=>{
            var food= new foodModel({
               id:data.id,
               foodName:data.foodName,
               price:data.price,
            })

            food.save().then(
                ()=>{
                    resolve({status:200,message:"New Food items is added."})
                }).catch(()=>{
                    reject({status:500,message:"Error inserting data"})
                })
    
})
}

// this.update = (id)=>{
//     return new Promise((resolve,reject)=>{
//         orderModel.update({_id:id},data).then(()=>{
//                 resolve({status:200,message:"Successfully updated"})
//         }
            
//         ).catch(()=>{
//             reject({status:500,message:"Error updating the data"})
//         })
//     })
// }

this.searchAllFoods = ()=>{
    
       return (foodModel.find().sort({ createdAt: -1 }));
         
}

// this.search= (id)=>{
//     return new Promise((resolve,reject)=>{
//         orderModel.find({_id:id}).populate('User').exec().then(
//             resolve({status:200,message:"Success "}
//         )
//         ).catch(()=>{
//             reject({status:500,message:"Error"})
//         })
//     })

// }
// this.delete = (id)=>{
//     return new Promise((resolve,reject)=>{
//         orderModel.remove({_id:id})
//         .then(()=>{
//             resolve({status:200,message:"Successfull"})
//         }).catch(()=>{
//             reject({status:500,message:"error"})
//         })
//     })
// }
}

module.exports= new OrderControllerMain();