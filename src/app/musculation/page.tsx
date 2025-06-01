'use client';

import { useState, useEffect } from 'react';
import MusculationActivityForm from '@/components/musculation/MusculationActivityForm';
import MusculationActivityList from '@/components/musculation/MusculationActivityList';
import Pagination from '@/components/Pagination';
import { MusculationActivity } from '@/types/musculation';

const ITEMS_PER_PAGE = 3;

export default function MusculationPage() {
  const [activities, setActivities] = useState<MusculationActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/musculation');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des activités');
      }
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (activity: Omit<MusculationActivity, '_id'>) => {
    try {
      const response = await fetch('/api/musculation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'activité");
      }

      const newActivity = await response.json();
      setActivities(prev => [newActivity, ...prev]);
      setCurrentPage(1); // Retour à la première page après l'ajout
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/musculation/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'activité");
      }

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:ml-20 mt-30">
      <h1 className="text-3xl font-bold mb-8">Mes séances de musculation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ajouter une séance</h2>
          <MusculationActivityForm onSubmit={handleSubmit} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Mes séances</h2>
          <MusculationActivityList activities={paginatedActivities} onDelete={handleDelete} />
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
