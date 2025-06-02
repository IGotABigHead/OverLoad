'use client';

import { useState, useEffect } from 'react';
import CourseActivityForm from '@/components/course/CourseActivityForm';
import CourseActivityList from '@/components/course/CourseActivityList';
import Pagination from '@/components/Pagination';
import { CourseActivity } from '@/types/course';

type CreateCourseActivity = Omit<CourseActivity, '_id'>;

const ITEMS_PER_PAGE = 5;

export default function CoursePage() {
  const [activities, setActivities] = useState<CourseActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/course');
      if (!response.ok) throw new Error('Erreur lors du chargement des courses');
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAddActivity = async (activity: CreateCourseActivity) => {
    try {
      const response = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de la course");

      const newActivity = await response.json();
      setActivities(prev => [newActivity, ...prev]);
      setCurrentPage(1); // Retour à la première page après l'ajout
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await fetch(`/api/course/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression de la course');

      setActivities(prev => prev.filter(activity => activity._id !== id));
      // Ajuster la page courante si nécessaire
      const totalPages = Math.ceil((activities.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  // Calcul de la pagination
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivities = activities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:ml-20 mt-30">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 md:ml-20 mt-30">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Erreur !</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:ml-20 mt-30 pr-30">
      <h1 className="text-3xl font-bold mb-8">Mes Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ajouter une course</h2>
          <CourseActivityForm onSubmit={handleAddActivity} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Mes courses</h2>
          <CourseActivityList activities={paginatedActivities} onDelete={handleDeleteActivity} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
