import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CourseActivity from '@/models/CourseActivity';

export async function DELETE(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID de course manquant' }, { status: 400 });
    }

    const result = await CourseActivity.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: 'Course non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE course:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la course', details: error.message },
      { status: 500 }
    );
  }
}
