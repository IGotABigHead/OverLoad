import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PadelActivity from '@/models/PadelActivity';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await PadelActivity.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Activité supprimée avec succès' });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'activité" },
      { status: 500 }
    );
  }
}
