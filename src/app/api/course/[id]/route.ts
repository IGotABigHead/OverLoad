import { NextResponse } from 'next/server';

// Simuler une base de données en mémoire
let courses: any[] = [];

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    courses = courses.filter(course => course.id !== params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la course' },
      { status: 500 }
    );
  }
}
