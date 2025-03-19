const { default: mongoose } = require('mongoose');
const Product = require('../model/productModel');

const add_product = async (req, res) => {
// console.log(req.body);
    try {
        const product = new Product({
          name: req.body.name,
          sku: req.body.sku,
          description: req.body.description,
          category: req.body.category,
          logo: req.body.logo,
          source: req.user.role,
          assignedTo: req.body.assignedTo
            
        });

        const productData = await Product.findOne({ name: req.body.name });
        if (productData) {
        res
            .status(400)
            .send({ success: false, msg: "This Product is already exists." });
        } else {
        const product_data = await product.save();
        res.status(200).send({ success: true, data: product_data });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({success: false, msg: error.message})
    } 
}

// const getcategories = async (req, res) => {

//   try {
//     const cdata = await Category.find({});
//     res.status(200).send({success: true, msg:"category details fetched successfully.", data: cdata});
//   } catch (error) {
//     res.status(400).send({success: false, msg: error.message});
//   }
  
// }

// const delete_category = async (req, res) => {
//     const deleteid = req.params.id;
//     try {
        
//         const del_category = await Category.findByIdAndRemove({_id:deleteid});
//         res.status(200).send({ success: true,  msg:"Category has delete successfully."});
        
//       } catch (error) {
//         res.status(400).send({success: false, msg: error.message});
//       }

// }

const deleteproduct = async (req, res) => {
    const deleteid = req.params.id;
    
    try {
      // if(req.user._id != deleteid){
      //   return res.status(200).send({success: true, msg:"Authrization token is not matched."});
      // }
      
      const del_product = await Product.findOneAndDelete({_id:deleteid, assignedTo: req.user._id});
      res.status(200).send({ success: true,  msg:"User has deleted successfully."});
      
    } catch (error) {
      res.status(400).send({success: false, msg: error.message});
    }
}

const getproduct = async (req, res) => {
  const id = req.params.id;
  
  try {
    // if(req.user._id != id){
    //   return res.status(200).send({success: true, msg:"Authrization token is not matched."});
    // }
  
    // const userdata = await Product.findById({_id:id});
    const productdata = await Product.find({_id:id, assignedTo: req.user._id}).populate('assignedTo', req.user._id);
    console.log(productdata);
    if(productdata.length === 0){
      res.status(200).send({success: true, msg:"No Data Found.", data: productdata});
    }
    res.status(200).send({success: true, msg:"Product details fetched successfully.", data: productdata});
  } catch (error) {
    res.status(400).send({success: false, msg: error.message});
  }
  
}

const updateproduct = async (req, res) =>{
  const pid = req.params.id;

  try {
    // if(req.user._id != pid){
    //   return res.status(200).send({success: true, msg:"Authrization token is not matched."});
    // }

    if (!mongoose.isValidObjectId(pid)) {
      return res.status(404).json({success: false, message: "Please provide valid Product id"});
    }

    const userdata = Product.find({ _id : pid});
    
    if(!userdata) return res.status(404).json({success: false, msg:"user is not found !!!"});
    const new_pname = req.body.name;
    // const new_psku = req.body.sku;
    const new_pdescription = req.body.description;
    const new_category = req.body.category;
    const new_assignedTo = req.body.assignedTo;
    const new_source = req.body.source;
    
    const updatedata = await Product.findOneAndUpdate({ _id:pid, assignedTo: req.user._id }, {
      $set: {
        name: new_pname, description: new_pdescription, category: new_category, assignedTo: new_assignedTo, source: new_source,
      }},{new: true});
    
    if(updatedata) res.status(200).json({success: true, msg:`Product updated with ${updatedata} successfully.`})
    
  } catch (error) {
    res.status(400).json({success: false, msg: error.message});
  }
}

const getallproducts = async (req, res) => {
  const role = req.user.role;
  let allProductDetails = '';
  try {
    if(role === "admin"){
    allProductDetails = await Product.find();
    }else{
      allProductDetails = await Product.find({assignedTo: req.user._id});
    }
    // if(allUserDetails){
      res.status(200).send({success:true,msg:"All Products Data has been Fetched Successfully.", result:allProductDetails});
    // }

  } catch (error) {
    res.status(400).json({success: false, msg: error.message});
  }
  
}

const assignProductToUsers = async (req, res) =>{
  const pid = req.params.id;
  const assign_from = req.user._id;
  const assign_to = req.body.assign_to;

  try {
    if(req.user.role === 'admin'){
      return res.status(200).send({success: true, msg:"Access Denied."});
    }

    const productdata = await Product.findOne({ _id : pid});
    const uniqueArray= [
      ...new Set([...assign_to, ...productdata.assignedTo])
    ];
    
    const updatedata = await Product.findByIdAndUpdate({ _id:pid }, {
      $set: {
        assignedTo:uniqueArray
      }},{new: true});
    
    if(updatedata) res.status(200).json({success: true, msg:`Product assign successfully.`})
    
  } catch (error) {
    res.status(400).json({success: false, msg: error.message});
  }
}

module.exports = {
    add_product,
    getproduct,
    deleteproduct,
    updateproduct,
    getallproducts,
    assignProductToUsers
};