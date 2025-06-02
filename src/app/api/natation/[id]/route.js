import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NatationActivity from '@/models/NatationActivity';

export async function DELETE(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID de natation manquant' }, { status: 400 });
    }

    const result = await NatationActivity.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: 'Activité natation non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE natation:', error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'activité natation", details: error.message },
      { status: 500 }
    );
  }
}
