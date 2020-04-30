const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({

    productname:{type:String},
    productdesc:{type:String},
    productprice:{type:String},
    manudate:{type:Date, default:Date.now},
    expdate:{type:Date, default:Date.now},
    barcode:{type:String}
})

module.exports=mongoose.model('Product',ProductSchema);