import { NextResponse } from 'next/server';

// Simuler une base de données en mémoire
let activities: any[] = [];

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    activities = activities.filter(activity => activity.id !== params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la séance' },
      { status: 500 }
    );
  }
}
