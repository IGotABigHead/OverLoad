import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CourseActivity from '@/models/CourseActivity';

// Simuler une base de données en mémoire
let courses: any[] = [];

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    await CourseActivity.findByIdAndDelete(context.params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la course' },
      { status: 500 }
    );
  }
}
