import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NatationActivity from '@/models/NatationActivity';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await NatationActivity.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'activité" },
      { status: 500 }
    );
  }
}
