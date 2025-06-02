'use client';

import { useState, useEffect } from 'react';
import PadelActivityForm from '@/components/padel/PadelActivityForm';
import PadelActivityList from '@/components/padel/PadelActivityList';
import Pagination from '@/components/Pagination';
import { PadelActivity } from '@/types/padel';
import { CreatePadelActivity } from '@/types/padel';

const ITEMS_PER_PAGE = 3;

export default function PadelPage() {
  const [activities, setActivities] = useState<PadelActivity[]>([]);
  const [filter, setFilter] = useState<'all' | 'training' | 'tournament'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/padel');
      if (!response.ok) throw new Error('Erreur lors du chargement des activités');
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

  const handleAddActivity = async (activity: CreatePadelActivity) => {
    try {
      const response = await fetch('/api/padel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'activité");

      const newActivity = await response.json();
      setActivities(prev => [newActivity, ...prev]);
      setCurrentPage(1); // Retour à la première page après l'ajout
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await fetch(`/api/padel/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression de l'activité");

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

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      <h1 className="text-3xl font-bold mb-8">Mes activités Padel</h1>

      <div className="mb-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('training')}
            className={`px-4 py-2 rounded-md ${
              filter === 'training'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Entraînements
          </button>
          <button
            onClick={() => setFilter('tournament')}
            className={`px-4 py-2 rounded-md ${
              filter === 'tournament'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tournois
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ajouter une activité</h2>
          <PadelActivityForm onSubmit={handleAddActivity} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Mes activités</h2>
          <PadelActivityList activities={paginatedActivities} onDelete={handleDeleteActivity} />
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
