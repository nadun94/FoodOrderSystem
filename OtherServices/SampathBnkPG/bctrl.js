

var mongoose = require('./model.js');

var BankModel = mongoose.model('CreditCard');


var bankController = function(){

    //insert transaction to the bank databbase
  this.InsertTransaction = (data)=>{
        return new Promise((resolve,reject)=>{
                var BankModel= new BankModel({
                    card_hoder_name:data.card_hoder_name,
                    Card_number:data.Card_number,
                    cvc:data.cvc,
                    amount:data.amount  
             
                })

                BankModel.save().then(
                    ()=>{
                        resolve({status:200,message:"New Transaction is added.","reply":true})
                    }).catch((err)=>{
                        reject({status:500,message:"Error inserting data","reply":false})
                        console.log(err)
                    })
        
    })

    

}

//check validity of the accoutn

this.searchAccoutn= (accoutnNo)=>{
    console.log(accoutnNo)
    return new Promise((resolve,reject)=>{
        BankModel.find({Card_number:accoutnNo}).then((data)=>{
            resolve({status:200,message:"Success "})
        }
            
        ).catch((err)=>{
            reject({status:500,message:"Error"})
        })
    })

}


}

module.exports= new bankController();