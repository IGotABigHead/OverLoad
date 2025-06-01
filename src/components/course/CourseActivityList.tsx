import { CourseActivity } from '@/types/course';

interface CourseActivityListProps {
  activities: CourseActivity[];
  onDelete: (id: string) => void;
}

export default function CourseActivityList({ activities, onDelete }: CourseActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={`course-activity-${activity._id}`} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {new Date(activity.date).toLocaleDateString('fr-FR')}
              </h3>
              <p className="text-gray-600">
                {activity.duree} minutes - {activity.distance} km
              </p>
              {activity.notes && <p className="mt-2 text-gray-700 text-sm">{activity.notes}</p>}
            </div>
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
          </div>
        </div>
      ))}
      {activities.length === 0 && (
        <p className="text-gray-500 text-center py-4">Aucune course enregistrée</p>
      )}
    </div>
  );
}
