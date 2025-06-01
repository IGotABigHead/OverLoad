import mongoose from 'mongoose';

const nageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['crawl', 'brasse', 'dos', 'papillon', '4nages'],
  },
  distance: {
    type: Number,
    required: true,
  },
});

const natationActivitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    nages: [nageSchema],
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NatationActivity ||
  mongoose.model('NatationActivity', natationActivitySchema);
