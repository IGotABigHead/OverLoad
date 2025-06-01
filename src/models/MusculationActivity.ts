import mongoose from 'mongoose';

const serieSchema = new mongoose.Schema({
  repetitions: {
    type: Number,
    required: true,
  },
  poids: {
    type: Number,
    required: false,
  },
});

const exerciceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  series: [serieSchema],
});

const musculationActivitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    exercices: [exerciceSchema],
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MusculationActivity ||
  mongoose.model('MusculationActivity', musculationActivitySchema);
