const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  mainCategory: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true }, 
  description: { type: String, required: true },
  category: { type: String, required: true },
  original_price: { type: String, required: true },
  offer_percent: { type: String, required: true },
  brand_name: { type: String, required: true },
  brand_image: { type: String, required: true },
  size: { type: [String], required: true },
  image: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  reviews: {
    ratings: { type: String, required: true },
    count: { type: String, required: true }
  },
  totalstock:{type:Number, set: (value) => Number(value),required:true},
  availablestock:{type:Number,set: (value) => Number(value),required:true},
  vendorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
