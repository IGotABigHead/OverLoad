import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NatationActivity from '@/models/NatationActivity';

export async function GET() {
  try {
    await connectDB();
    const activities = await NatationActivity.find().sort({ date: -1 });
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Erreur GET natation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des activités' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Validation des données
    if (!data.date) {
      return NextResponse.json({ error: 'La date est requise' }, { status: 400 });
    }

    // Convertir la date en objet Date
    const activityData = {
      ...data,
      date: new Date(data.date),
    };

    if (
      !activityData.nages ||
      !Array.isArray(activityData.nages) ||
      activityData.nages.length === 0
    ) {
      return NextResponse.json({ error: 'Au moins une nage est requise' }, { status: 400 });
    }

    // Validation de chaque nage
    for (const nage of activityData.nages) {
      if (!nage.type || !['crawl', 'brasse', 'dos', 'papillon', '4nages'].includes(nage.type)) {
        return NextResponse.json({ error: `Type de nage invalide: ${nage.type}` }, { status: 400 });
      }
      if (!nage.distance || typeof nage.distance !== 'number' || nage.distance <= 0) {
        return NextResponse.json(
          { error: `Distance invalide pour la nage ${nage.type}` },
          { status: 400 }
        );
      }
    }

    const activity = await NatationActivity.create(activityData);
    return NextResponse.json(activity, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST natation:', error);
    return NextResponse.json(
      {
        error: "Erreur lors de la création de l'activité",
        details: error?.message || 'Erreur inconnue',
      },
      { status: 500 }
    );
  }
}
