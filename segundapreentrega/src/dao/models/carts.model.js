import mongoose from 'mongoose';
const productItem = mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref:"products", quantity:{type:Number, require:true}}
})
const CartSchema = new mongoose.Schema({
    products: {type: [productItem], default:[]}
  });

export default mongoose.model('Cart', CartSchema)


