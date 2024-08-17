var express = require('express');
const OrderModel = require('../model/OrderModel')
var router = express.Router();
const multer = require("multer");
const authen = require('./auth');


// http://localhost:3000/orders
router.get('/',async function(req, res, next) {
  const data = await OrderModel.find();
  res.json(data)

});


// thêm đơn hàng

router.post('/', async function (req, res, next) {
  try {
    const data = req.body;
    const result = await OrderModel.create(data);
    
    if (result) {
      res.status(201).json(result); // 201 Created
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo đơn hàng mới" });
  }
});

// hiện đơn hàng theo id
router.get('/:id',async function (req,res,next){
  try{
    const {id}=req.params;
    const data = await OrderModel.findById({'_id':id});
    res.json(data);
    console.log(data);
  }
  catch(console){
    res.json({status:false});
  }
} );



module.exports = router;
