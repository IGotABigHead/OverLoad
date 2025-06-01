'use client';

import { PadelActivity } from '@/types/padel';

interface PadelActivityListProps {
  activities: PadelActivity[];
  onDelete?: (id: string) => void;
}

export default function PadelActivityList({ activities, onDelete }: PadelActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div
          key={activity._id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {activity.type === 'training' ? 'Entraînement' : 'Tournoi'}
              </h3>
              <p className="text-gray-600">
                {new Date(activity.date).toLocaleString('fr-FR', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </p>
              <p className="text-gray-600">Lieu: {activity.location}</p>
              <p className="text-gray-600">Durée: {activity.duration} minutes</p>

              {activity.type === 'tournament' && (
                <>
                  <p className="text-gray-600">Tournoi: {activity.tournamentName}</p>
                  {activity.result && <p className="text-gray-600">Résultat: {activity.result}</p>}
                </>
              )}

              {activity.type === 'training' && (
                <>
                  {activity.score && <p className="text-gray-600">Score: {activity.score}</p>}
                  <p className="text-gray-600">Niveau: {activity.level}</p>
                </>
              )}

              {activity.notes && (
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Notes:</span> {activity.notes}
                </p>
              )}
            </div>

            {onDelete && (
              <button
                onClick={() => onDelete(activity._id)}
                className="text-red-600 hover:text-red-800"
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
        </div>
      ))}

      {activities.length === 0 && (
        <p className="text-center text-gray-500 py-4">Aucune activité enregistrée</p>
      )}
    </div>
  );
}
