import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    Order_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, },
    Customer_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    PaymentMethod: { type: String, enum: ['COD + Online', 'Online'], required: true, },
    PaymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending', },
    Transaction_ID: { type: String,  default: null, },
    AmountPaid: { type: Number, required: true, min: [0, 'Amount must be positive'], },
    PaymentDate: { type: Date, default: Date.now, },
    Refund_ID: { type: String, default: null, },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

export class Payment_Service {


}

const payment_service = new Payment_Service;
export default payment_service;
