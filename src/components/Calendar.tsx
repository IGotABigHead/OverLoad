'use client';
import { useState, useEffect } from 'react';
import { MusculationActivity } from '@/types/musculation';
import { PadelActivity } from '@/types/padel';
import { CourseActivity } from '@/types/course';
import { NatationActivity } from '@/types/natation';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

interface ActivityDetails {
  type: 'musculation' | 'padel' | 'course' | 'natation';
  activity: MusculationActivity | PadelActivity | CourseActivity | NatationActivity;
}

export default function Calendar({ onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [musculationActivities, setMusculationActivities] = useState<MusculationActivity[]>([]);
  const [padelActivities, setPadelActivities] = useState<PadelActivity[]>([]);
  const [courseActivities, setCourseActivities] = useState<CourseActivity[]>([]);
  const [natationActivities, setNatationActivities] = useState<NatationActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDetails | null>(null);

  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  useEffect(() => {
    fetchAllActivities();
  }, []);

  const fetchAllActivities = async () => {
    try {
      const [musculationRes, padelRes, courseRes, natationRes] = await Promise.all([
        fetch('/api/musculation'),
        fetch('/api/padel'),
        fetch('/api/course'),
        fetch('/api/natation'),
      ]);

      if (!musculationRes.ok || !padelRes.ok || !courseRes.ok || !natationRes.ok) {
        throw new Error('Erreur lors du chargement des activités');
      }

      const [musculationData, padelData, courseData, natationData] = await Promise.all([
        musculationRes.json(),
        padelRes.json(),
        courseRes.json(),
        natationRes.json(),
      ]);

      setMusculationActivities(musculationData);
      setPadelActivities(padelData);
      setCourseActivities(courseData);
      setNatationActivities(natationData);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

  const handleActivityClick = (type: ActivityDetails['type'], activity: any) => {
    setSelectedActivity({ type, activity });
  };

  const handleClosePopup = () => {
    setSelectedActivity(null);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(new Date(newYear, currentDate.getMonth()));
  };

  const renderActivityDetails = () => {
    if (!selectedActivity) return null;

    const { type, activity } = selectedActivity;

    // Temporarily prevent rendering the overlay to debug black screen issue
    return null; // Comment out or remove this line if the Calendar overlay is not the issue

    const renderMusculationDetails = (activity: MusculationActivity) => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Séance de musculation</h3>
        <div className="space-y-2">
          {activity.exercices.map((exercice, index) => (
            <div
              key={`${activity._id}-exercice-${exercice.nom}-${index}`}
              className="bg-gray-50 p-3 rounded-lg"
            >
              <p className="font-medium">{exercice.nom}</p>
              <div className="mt-2 space-y-1">
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
          <div className="mt-4">
            <p className="text-sm text-gray-600">{activity.notes}</p>
          </div>
        )}
      </div>
    );

    const renderPadelDetails = (activity: PadelActivity) => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {activity.type === 'training' ? 'Entraînement' : 'Tournoi'} de Padel
        </h3>
        <div className="space-y-2">
          <p>Lieu: {activity.location}</p>
          <p>Durée: {activity.duration} minutes</p>
          {activity.type === 'tournament' && (
            <>
              <p>Niveau: {activity.level}</p>
              {activity.result && <p>Résultat: {activity.result}</p>}
            </>
          )}
          {activity.type === 'training' && (
            <>
              {activity.score && <p>Score: {activity.score}</p>}
              <p>Niveau: {activity.level}</p>
            </>
          )}
        </div>
        {activity.notes && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">{activity.notes}</p>
          </div>
        )}
      </div>
    );

    const renderCourseDetails = (activity: CourseActivity) => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Course</h3>
        <div className="space-y-2">
          <p>Distance: {activity.distance} km</p>
          <p>Durée: {activity.duree} minutes</p>
        </div>
        {activity.notes && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">{activity.notes}</p>
          </div>
        )}
      </div>
    );

    const renderNatationDetails = (activity: NatationActivity) => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Séance de natation</h3>
        <div className="space-y-2">
          {activity.nages.map((nage, nageIndex) => (
            <div
              key={`${activity._id}-nage-${nage.type}-${nageIndex}`}
              className="bg-gray-50 p-3 rounded-lg"
            >
              <p className="font-medium">{nage.type}</p>
              {nage.distance && <p className="text-sm text-gray-600">Distance: {nage.distance}m</p>}
            </div>
          ))}
        </div>
        {activity.notes && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">{activity.notes}</p>
          </div>
        )}
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl w-[480px] shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              {type === 'musculation' && renderMusculationDetails(activity as MusculationActivity)}
              {type === 'padel' && renderPadelDetails(activity as PadelActivity)}
              {type === 'course' && renderCourseDetails(activity as CourseActivity)}
              {type === 'natation' && renderNatationDetails(activity as NatationActivity)}
            </div>
            <button onClick={handleClosePopup} className="ml-4 text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-28 w-28 border border-gray-100 p-2 bg-gray-50"></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDateKey(date);

      const musculationActivitiesForDay = musculationActivities.filter(
        activity => formatDateKey(new Date(activity.date)) === dateKey
      );
      const padelActivitiesForDay = padelActivities.filter(
        activity => formatDateKey(new Date(activity.date)) === dateKey
      );
      const courseActivitiesForDay = courseActivities.filter(
        activity => formatDateKey(new Date(activity.date)) === dateKey
      );
      const natationActivitiesForDay = natationActivities.filter(
        activity => formatDateKey(new Date(activity.date)) === dateKey
      );

      const isSelected =
        selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === currentDate.getMonth() &&
        selectedDate?.getFullYear() === currentDate.getFullYear();
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-28 w-28 border border-gray-100 p-2 cursor-pointer transition-all duration-200
            ${isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : 'hover:bg-gray-50'}
            ${isToday ? 'bg-blue-50/50' : ''}`}
        >
          <div
            className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}
          >
            {day}
          </div>
          <div className="space-y-1 max-h-[calc(100%-2rem)] overflow-y-auto">
            {musculationActivitiesForDay.map(activity => (
              <div
                key={`musculation-${activity._id}-${dateKey}`}
                onClick={e => {
                  e.stopPropagation();
                  handleActivityClick('musculation', activity);
                }}
                className="bg-green-100 text-green-800 rounded-md px-2 py-1 text-xs font-medium truncate hover:bg-green-200 transition-colors duration-200 cursor-pointer"
              >
                Musculation
              </div>
            ))}
            {padelActivitiesForDay.map(activity => (
              <div
                key={`padel-${activity._id}-${dateKey}`}
                onClick={e => {
                  e.stopPropagation();
                  handleActivityClick('padel', activity);
                }}
                className="bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-xs font-medium truncate hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
              >
                Padel
              </div>
            ))}
            {courseActivitiesForDay.map(activity => (
              <div
                key={`course-${activity._id}-${dateKey}`}
                onClick={e => {
                  e.stopPropagation();
                  handleActivityClick('course', activity);
                }}
                className="bg-purple-100 text-purple-800 rounded-md px-2 py-1 text-xs font-medium truncate hover:bg-purple-200 transition-colors duration-200 cursor-pointer"
              >
                Course
              </div>
            ))}
            {natationActivitiesForDay.map(activity => (
              <div
                key={`natation-${activity._id}-${dateKey}`}
                onClick={e => {
                  e.stopPropagation();
                  handleActivityClick('natation', activity);
                }}
                className="bg-yellow-100 text-yellow-800 rounded-md px-2 py-1 text-xs font-medium truncate hover:bg-yellow-200 transition-colors duration-200 cursor-pointer"
              >
                Natation
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold text-gray-800">
            {months[currentDate.getMonth()]}
          </span>
          <select
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>

      {selectedActivity && renderActivityDetails()}
    </div>
  );
}
