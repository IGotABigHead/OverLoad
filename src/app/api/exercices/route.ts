import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Exercice from '@/models/Exercice';

// Liste initiale des exercices prédéfinis
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

let exercices = [...EXERCICES_PREDEFINIS];

export async function GET() {
  try {
    await connectDB();
    const exercices = await Exercice.find().sort({ nom: 1 });
    return NextResponse.json(exercices.map(e => e.nom));
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors du chargement des exercices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { exercice } = await request.json();
    await connectDB();

    const newExercice = new Exercice({ nom: exercice });
    await newExercice.save();

    const exercices = await Exercice.find().sort({ nom: 1 });
    return NextResponse.json(exercices.map(e => e.nom));
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'ajout de l'exercice" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { exercice } = await request.json();
    await connectDB();

    await Exercice.deleteOne({ nom: exercice });

    const exercices = await Exercice.find().sort({ nom: 1 });
    return NextResponse.json(exercices.map(e => e.nom));
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'exercice" },
      { status: 500 }
    );
  }
}
