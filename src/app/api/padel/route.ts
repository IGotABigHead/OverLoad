import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PadelActivity from '@/models/PadelActivity';

export async function GET() {
  try {
    await connectDB();
    const activities = await PadelActivity.find().sort({ date: -1 });
    return NextResponse.json(activities);
  } catch (error) {
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
    const activity = await PadelActivity.create(data);
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de l'activité" },
      { status: 500 }
    );
  }
}
