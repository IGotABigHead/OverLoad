import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NatationActivity from '@/models/NatationActivity';

// Simuler une base de données en mémoire
let activities: any[] = [];

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    await NatationActivity.findByIdAndDelete(context.params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'activité" },
      { status: 500 }
    );
  }
}
