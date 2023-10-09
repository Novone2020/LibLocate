import mongoose from 'mongoose';

const mongooseSchema = new mongoose.Schema({
  right: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
      },
      user: {
        type: String,
        required: true
      },
      state: {
        type: Number,
        required: true
      }
    }
  ],
  left: [
    {
      _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      required: true,
      },
      user: {
        type: String,
        required: true
      },
      state: {
        type: Number,
        required: true
      }
    }
  ]
});

export const boxesModel = mongoose.model('boxes', mongooseSchema);