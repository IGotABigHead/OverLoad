'use client';

import { MusculationActivity } from '@/types/musculation';

interface MusculationActivityListProps {
  activities: MusculationActivity[];
  onDelete?: (id: string) => void;
}

export default function MusculationActivityList({
  activities,
  onDelete,
}: MusculationActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">Aucune séance de musculation enregistrée</div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div
          key={activity._id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {new Date(activity.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(activity._id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {activity.exercices.map((exercice, exerciceIndex) => (
              <div
                key={`${activity._id}-exercice-${exercice.nom}-${exerciceIndex}`}
                className="bg-gray-50 p-3 rounded-lg"
              >
                <h4 className="font-medium text-gray-800 mb-2">{exercice.nom}</h4>
                <div className="space-y-1">
                  {exercice.series.map((serie, serieIndex) => (
                    <p
                      key={`${activity._id}-serie-${exercice.nom}-${serieIndex}`}
                      className="text-sm text-gray-600"
                    >
                      Série {serieIndex + 1}: {serie.repetitions} répétitions
                      {serie.poids ? ` - ${serie.poids}kg` : ''}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {activity.notes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">{activity.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
