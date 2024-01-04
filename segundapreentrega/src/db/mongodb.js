import mongoose from 'mongoose';

const URI = 'mongodb+srv://coder47340:coder2023@cluster0.nlorspw.mongodb.net/ecommerce';

export const initDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Database coneccted successfuly 🚀');
  } catch (error) {
    console.error('Ha ocurrido un error al intentar conectarnos a la MongoDB 😨.', error.message);
  }
};