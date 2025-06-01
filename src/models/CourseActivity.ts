import mongoose from 'mongoose';

const courseActivitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    duree: {
      type: Number,
      required: true,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CourseActivity ||
  mongoose.model('CourseActivity', courseActivitySchema);
