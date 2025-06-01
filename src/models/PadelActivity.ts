import mongoose from 'mongoose';

const padelActivitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['training', 'tournament'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    notes: String,
    // Champs spécifiques aux tournois
    tournamentLevel: String,
    result: String,
    // Champs spécifiques aux entraînements
    score: String,
    level: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PadelActivity ||
  mongoose.model('PadelActivity', padelActivitySchema);
