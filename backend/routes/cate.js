
var express = require('express');
var router = express.Router();
var cateModel = require("../model/CategoryModel");
const CategoryModel = require('../model/CategoryModel');
const authen = require('./auth');
/* GET users listing. */
router.get('/', async function(req, res, next) {
    const data =  await cateModel.find();
    res.json(data);
});

  // hien thong tin theo id
  
  router.get('/:id',async function (req,res,next){
    try{
      const {id}=req.params;
      const data = await CategoryModel.findById({_id:id});
      res.json(data);
      console.log(data);
    }
    catch(console){
      res.json({status:false});
    }
  } );


module.exports = router;


// tạo kết nối mongoo
// tạo model ==> mẫu của dữ liệu
// route nối model
// view => chuyện của FE
// use route  
