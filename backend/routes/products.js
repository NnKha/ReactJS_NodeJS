var express = require('express');
const ProductModel = require('../model/ProductModel');
var router = express.Router();
const multer = require("multer");
const authen = require('./auth');


/* GET users listing. */
//[GET] /products/
router.get('/',async function(req, res, next) {
  const data = await ProductModel.find();
  res.json(data)

});



// get product by category
//locolhosst:3000/product/cate/...
// lấy 4 sản phẩm theo cate, lọc
//  /products/cate/
// router.get('/cate/:id',async function (req,res,next){
//   try{
//     const {id}=req.params;
//     const { page = 1, limit = 5 } = req.query;

//     const totalProducts = await ProductModel.countDocuments({ 'categoryId': id });
//     const totalPages = Math.ceil(totalProducts / limit);

//     const data = await ProductModel.find({'categoryId':id})
//       .limit(4);

//     // const dataLimit = await ProductModel.find({'categoryId':id})
//     //   .sort({ createdAt: -1 })
//     //   .limit(4);
    
//     res.json({
//         data,
//         // dataLimit,
//         currentPage: page,
//         totalPages,
//         totalProducts
//     })
    
//   }
//   catch(console){
//     res.json({status:false});
//   }
// } );
router.get("/new/category/:id", async function (req, res, next) {
  try {
      const id = req.params.id;
      const data = await ProductModel
          .find({ categoryId: id })
          .sort({ createdAt: -1 })
          .limit(4);
      res.json(data);
  } catch (err) {
      next(err);
  }
});

router.get("/cate/:id", async function (req, res, next) {
  try {
      const { id } = req.params;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 4;
      const skip = (page - 1) * limit;

      const data = await ProductModel
          .find({ categoryId: id })
          .skip(skip)
          .limit(limit);

      const count = await ProductModel.countDocuments({ categoryId: id });
      const totalPages = Math.ceil(count / limit);

      // lấy 4 sp mới nhất theo cate 
      const dataLimit = await ProductModel.find({'categoryId':id})
        .sort({ createdAt: -1 })
        .limit(4);

      res.json({
          data,
          currentPage: page,
          totalPages,
          totalItems: count,
          dataLimit
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Lỗi server" });
  }
});

// search sản phẩm
router.get("/search", async function (req, res, next) {
  const { name } = req.query;
  const data = await ProductModel.find({
      name_product: { $regex: name, $options: "i" },
  });
  res.json(data);
});

router.get('/top', async (req, res) => {
  try {
      
      const topSellingProducts = await ProductModel.find()
          .sort({ sold: -1 })
          .limit(10);

      const newestProducts = await ProductModel.find()
          .sort({ createdAt: -1 })  
          .limit(10);

      const cheapestProducts = await ProductModel.find()
          .sort({ price_new: 1 })
          .limit(10);
      res.json({
          topSellingProducts,
          newestProducts,
          cheapestProducts
      });
  } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
  }
});

// api phân trang
router.get('/pagination',async function (req,res,next){
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / limit);

  res.json({
    data: paginatedData,
    currentPage: page,
    totalPages: totalPages
  });
} );



// hiện chi tiết sản phẩm
router.get('/:id',async function (req,res,next){
  try{
    const {id}=req.params;
    const data = await ProductModel.findById({'_id':id});
    res.json(data);
    console.log(data);
  }
  catch(console){
    res.json({status:false});
  }
} );



module.exports = router;
