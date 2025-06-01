import mongoose from 'mongoose';

const exerciceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Exercice || mongoose.model('Exercice', exerciceSchema);
