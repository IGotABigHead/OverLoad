'use client';

import { NatationActivity } from '@/types/natation';

interface NatationActivityListProps {
  activities: NatationActivity[];
  onDelete?: (id: string) => void;
}

export default function NatationActivityList({ activities, onDelete }: NatationActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">Aucune séance de natation enregistrée</div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div
          key={`natation-activity-${activity._id}`}
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
            {activity.nages.map((nage, nageIndex) => (
              <div key={`${activity._id}-nage-${nageIndex}`} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-800">
                  {nage.type} - {nage.distance}
                </p>
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
