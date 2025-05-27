import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Product_ID: { type: String, required: true, },
    Name: { type: String, required: [true, 'Product name is required'], trim: true, },
    Description: { type: String, required: [true, 'Product description is required'], },
    Brand: { type: String, required: true, },
    Category: { type: String, required: true, },
    Variants: [
        {
            Size: { type: String },
            Color: { type: String },
            Stock: { type: Number, required: true, min: [0, 'Stock cannot be negative'] },
            Price: { type: Number, required: true, min: [0, 'Amount must be positive'], },
        }
    ],
    Discount: { type: Number, default: 0, },
    Images: [
      {
        Url: { type: String, required: true },
        Alt: { type: String },
      },
    ],
    Status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending', },
    ReviewFeedback: { type: String, default: '',  },
    ReviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin',  },
    ReviewedAt: { type: Date, },
    Product_Rating: {
      Average: { type: Number, default: 0, },
      Count: { type: Number, default: 0,},
    },
    Product_Reviews: [
      {
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        Rating: { type: Number, required: true },
        Comment: { type: String },
        CreatedAt: { type: Date, default: Date.now },
      },
    ],
    IsFeatured: { type: Boolean, default: false, },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'vendor', required: true, },
    Delivery: [
        {
            Days_Required: { type: Number, required: true },
            Condition: { type: String, enum: ['Free delivery', 'Free delivery on orders above $price', '$price delivery charge'], default: 'Free delivery', },
            ConditionValue: { type: Number, default: null, },
        }
    ],
    ReturnPolicy: [
        {
            Available: { type: Boolean, required: true },
            ValidTill: { type: String, enum:['$day easy returns', 'No returns available'], default: 'No returns available' },
            returnDays: { type: Number,  default: 0, },
        }
    ]
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export class Product_Service {



}

const prod_service = new Product_Service;
export default prod_service;

// export { Product };