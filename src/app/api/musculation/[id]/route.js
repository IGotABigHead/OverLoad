import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MusculationActivity from '@/models/MusculationActivity';

export async function DELETE(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID de musculation manquant' }, { status: 400 });
    }

    const result = await MusculationActivity.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: 'Activité musculation non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE musculation:', error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'activité musculation", details: error.message },
      { status: 500 }
    );
  }
}
