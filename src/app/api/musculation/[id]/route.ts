import { NextResponse } from 'next/server';
import { activities } from '../db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const index = activities.findIndex(activity => activity.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Activité non trouvée' }, { status: 404 });
    }
    activities.splice(index, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'activité" },
      { status: 500 }
    );
  }
}
