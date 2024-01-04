import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    products: {
      type: [
        {
          pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
          },
          quantity: {
            type: Number || 1,
            required: true,
          },
        },
      ],
      default: [],
      required: true,
    },
  });

export default mongoose.model('Cart', CartSchema)