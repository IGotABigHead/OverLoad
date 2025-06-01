'use client';

import { useState } from 'react';
import { PadelActivity, PadelActivityType, CreatePadelActivity } from '@/types/padel';

interface PadelActivityFormProps {
  onSubmit: (activity: CreatePadelActivity) => void;
}

export default function PadelActivityForm({ onSubmit }: PadelActivityFormProps) {
  const [type, setType] = useState<PadelActivityType>('training');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [tournamentLevel, setTournamentLevel] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState('');
  const [level, setLevel] = useState('4');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const activity: CreatePadelActivity = {
      type,
      date: new Date(date),
      duration: parseInt(duration),
      location,
      notes,
      ...(type === 'tournament' && {
        tournamentLevel,
        result,
      }),
      ...(type === 'training' && {
        score,
        level,
      }),
    };

    onSubmit(activity);
    // Reset form
    setDate('');
    setDuration('');
    setLocation('');
    setNotes('');
    setTournamentLevel('');
    setResult('');
    setScore('');
    setLevel('4');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type d'activité</label>
        <select
          value={type}
          onChange={e => setType(e.target.value as PadelActivityType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="training">Entraînement</option>
          <option value="tournament">Tournoi</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Durée (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {type === 'tournament' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Niveau du tournoi</label>
            <input
              type="text"
              value={tournamentLevel}
              onChange={e => setTournamentLevel(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Résultat</label>
            <input
              type="text"
              value={result}
              onChange={e => setResult(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </>
      )}

      {type === 'training' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Score</label>
            <input
              type="text"
              value={score}
              onChange={e => setScore(e.target.value)}
              placeholder="Ex: 6-4, 6-3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Niveau</label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="4">4</option>
              <option value="4/5">4/5</option>
              <option value="5">5</option>
              <option value="5/6">5/6</option>
              <option value="6">6</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Ajouter l'activité
      </button>
    </form>
  );
}
