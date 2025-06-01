import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Exercice from '@/models/Exercice';

const EXERCICES_PREDEFINIS = [
  'Développé couché',
  'Squat',
  'Soulevé de terre',
  'Tractions',
  'Dips',
  'Presse à cuisses',
  'Extensions jambes',
  'Curl biceps',
  'Extension triceps',
  'Élévations latérales',
  'Rowing',
  'Crunch',
  'Planche',
];

async function initializeExercices() {
  await connectDB();

  // Ajouter tous les exercices prédéfinis
  for (const nom of EXERCICES_PREDEFINIS) {
    await Exercice.findOneAndUpdate({ nom }, { nom }, { upsert: true, new: true });
  }

  const exercices = await Exercice.find().sort({ nom: 1 });
  return exercices.map(e => e.nom);
}

export async function GET() {
  try {
    const exercices = await initializeExercices();
    return NextResponse.json(exercices);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation des exercices" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const exercices = await initializeExercices();
    return NextResponse.json(exercices);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation des exercices" },
      { status: 500 }
    );
  }
}
