const Product=require('../../model/product')
module.exports=function(router){
    router.get('/product',function(req,res){
        Product.find({},(err,product)=>{
        if(err){
            res.json({success:false,message:err});
        }
        else {
            if(!product){
                res.json({success:false, message:'No products'})
            }
            else {
                res.json({success:true,product:product});
            }
        }
    
    })
    })

    router.post('/product',function(req,res){
        let note=new Product(req.body)
        note.save(function(err,note){
            if(err){
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })
    router.put('/product',(req,res)=>{
        if(!req.body._id){
            res.json({sucess:false,message:'No id provided'});

        }else{
            Product.findOne({_id:req.body._id},(err,standup)=>{
                if(err){
                    res.json({sucess:false,message:'No id provided'});
                }
                else{
                    standup.productname=req.body.productname;
                    standup.productdesc=req.body.productdesc;
                    standup.pproductprice=req.body.pproductprice;                   //while running   http://localhost:8081/api/Updatestandup
                    standup.manudate=req.body.manudate;
                    standup.expdate=req.body.expdate;
                    standup.barcode=req.body.barcode;
                    standup.save((err)=>{
                        if(err){
                            res.json({sucess:false,message:err});
                        }else{
                            res.json({sucess:true,message:'product updates!'});
                        }
                    })
                }
            })
        }
    })

    router.delete('/deleteproduct/:id',(req,res)=>{
                   
        if(!req.params.id){
            res.json({success:false,message:'No id provided'})
        }
        else{
            Product.findOne({_id:req.params.id},(err,product)=>{
             if(err){
                 res.json({success:false,message:'no id'});
             }else{
            product.remove((err)=>{
                if(err){
                    res.json({success:false,message:err})
                }
                else{
                    res.json({success:true,message:'deleted'})
                }
            })
        }
    
    })
}
    })
    
}
