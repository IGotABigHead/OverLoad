import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CourseActivity from '@/models/CourseActivity';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await CourseActivity.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la course' },
      { status: 500 }
    );
  }
}
