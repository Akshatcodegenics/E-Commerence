import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        Order_ID: { type: String, required: true},
        Customer_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        Order_Date: { type: Date, default: Date.now },
        Delivery_Date: { type: Date },
        Tracking_ID: { type: String, required: true },
        Order_Items: [
            {
                Product_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                Product_Name: { type: String, required: true },
                Product_Qty: { type: Number, required: true, default: 1 },
                Product_Size: { type: String },
                Product_Price: { type: String, required: true },
                Product_Color: { type: String },
            }
        ],
        Total_Items: { type: Number, required: true },
        Total_Amount: { type: Number, min: [0, 'Amount must be positive'], required: true },
        CouponCode: { type: String, default: null, },
        DiscountAmount: { type: Number, default: 0, min: [0, 'Discount cannot be negative'], },
        Status: { type: String, enum: ['Processing', 'Dispatched', 'Delivered', 'Returned', 'Refund Generated'], default: 'Processing', },
        Payment_Status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending', },
        Payment_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', },
        ShippingAddress: {
            Name: { type: String, required: true },
            Phone: { type: String, required: true },
            Street: { type: String, required: true },
            City: { type: String, required: true },
            State: { type: String, required: true },
            ZipCode: { type: String, required: true },
        },
        Notes: { type: String, default: '', },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export class Order_Service {



}

const order_service = new Order_Service;
export default order_service;

// export { Order };