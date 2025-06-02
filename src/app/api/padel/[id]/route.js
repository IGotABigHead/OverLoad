import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PadelActivity from '@/models/PadelActivity';

export async function DELETE(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID de padel manquant' }, { status: 400 });
    }

    const result = await PadelActivity.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: 'Activité padel non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE padel:', error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'activité padel", details: error.message },
      { status: 500 }
    );
  }
}
