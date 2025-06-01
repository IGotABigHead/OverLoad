'use client';

import { useState } from 'react';
import { NatationActivity, Nage, TypeNage } from '@/types/natation';

interface NatationActivityFormProps {
  onSubmit: (activity: Omit<NatationActivity, '_id'>) => void;
}

export default function NatationActivityForm({ onSubmit }: NatationActivityFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
  });

  const [nages, setNages] = useState<Nage[]>([]);
  const [currentNage, setCurrentNage] = useState<Omit<Nage, '_id'>>({
    type: 'crawl',
    distance: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nages.length === 0) {
      alert('Veuillez ajouter au moins une nage');
      return;
    }
    onSubmit({
      date: formData.date,
      nages,
      notes: formData.notes,
    });
    setFormData({
      date: '',
      notes: '',
    });
    setNages([]);
    setCurrentNage({
      type: 'crawl',
      distance: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNageChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentNage(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNage = () => {
    if (!currentNage.distance) {
      alert('Veuillez entrer une distance');
      return;
    }
    setNages(prev => [...prev, { ...currentNage, _id: Date.now().toString() }]);
    setCurrentNage({
      type: 'crawl',
      distance: 0,
    });
  };

  const removeNage = (_id: string) => {
    setNages(prev => prev.filter(nage => nage._id !== _id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Nages</h3>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type de nage
            </label>
            <select
              id="type"
              name="type"
              value={currentNage.type}
              onChange={handleNageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="crawl">Crawl</option>
              <option value="brasse">Brasse</option>
              <option value="dos">Dos</option>
              <option value="papillon">Papillon</option>
              <option value="4nages">4 Nages</option>
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
              Distance (mètres)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={currentNage.distance}
              onChange={handleNageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <button
            type="button"
            onClick={addNage}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Ajouter
          </button>
        </div>

        {nages.length > 0 && (
          <div className="mt-4 space-y-2">
            {nages.map(nage => (
              <div
                key={nage._id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <span>
                  {nage.type.charAt(0).toUpperCase() + nage.type.slice(1)}
                  {nage.distance ? ` - ${nage.distance}m` : ''}
                </span>
                <button
                  type="button"
                  onClick={() => removeNage(nage._id)}
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
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Commentaires sur votre séance..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Enregistrer la séance
      </button>
    </form>
  );
}
