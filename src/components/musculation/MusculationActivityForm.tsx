import { useState, useEffect } from 'react';
import { MusculationActivity, Exercice, Serie } from '@/types/musculation';

interface MusculationActivityFormProps {
  onSubmit: (activity: Omit<MusculationActivity, '_id'>) => void;
}

export default function MusculationActivityForm({ onSubmit }: MusculationActivityFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
  });

  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [currentExercice, setCurrentExercice] = useState<Exercice>({
    nom: '',
    series: [],
  });
  const [currentSerie, setCurrentSerie] = useState<Serie>({
    repetitions: '',
    poids: '',
  });
  const [availableExercices, setAvailableExercices] = useState<string[]>([]);
  const [showCustomExercice, setShowCustomExercice] = useState(false);
  const [customExercice, setCustomExercice] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExercices();
  }, []);

  const fetchExercices = async () => {
    try {
      const response = await fetch('/api/exercices');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des exercices');
      }
      const data = await response.json();
      setAvailableExercices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const deleteExercice = async (exercice: string) => {
    try {
      const response = await fetch('/api/exercices', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exercice }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'exercice");
      }

      const updatedExercices = await response.json();
      setAvailableExercices(updatedExercices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const addCustomExercice = async () => {
    if (!customExercice.trim()) {
      alert("Veuillez entrer un nom pour l'exercice");
      return;
    }

    try {
      const response = await fetch('/api/exercices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exercice: customExercice }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'exercice");
      }

      const updatedExercices = await response.json();
      setAvailableExercices(updatedExercices);
      setCurrentExercice(prev => ({
        ...prev,
        nom: customExercice,
      }));
      setCustomExercice('');
      setShowCustomExercice(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exercices.length === 0) {
      alert('Veuillez ajouter au moins un exercice');
      return;
    }
    onSubmit({
      date: formData.date,
      exercices,
      notes: formData.notes,
    });
    setFormData({
      date: '',
      notes: '',
    });
    setExercices([]);
    setCurrentExercice({
      nom: '',
      series: [],
    });
    setCurrentSerie({
      repetitions: '',
      poids: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExerciceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCurrentExercice(prev => ({
      ...prev,
      nom: value,
    }));
  };

  const handleSerieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSerie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSerie = () => {
    if (!currentSerie.repetitions) {
      alert('Veuillez entrer le nombre de répétitions');
      return;
    }
    setCurrentExercice(prev => ({
      ...prev,
      series: [...prev.series, currentSerie],
    }));
    setCurrentSerie({
      repetitions: '',
      poids: '',
    });
  };

  const removeSerie = (index: number) => {
    setCurrentExercice(prev => ({
      ...prev,
      series: prev.series.filter((_, i) => i !== index),
    }));
  };

  const addExercice = () => {
    if (!currentExercice.nom) {
      alert('Veuillez sélectionner un exercice');
      return;
    }

    setExercices(prev => [...prev, currentExercice]);
    setCurrentExercice({
      nom: '',
      series: [],
    });
  };

  const removeExercice = (index: number) => {
    setExercices(prev => prev.filter((_, i) => i !== index));
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
        <h3 className="text-lg font-medium text-gray-900">Exercices</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="exercice" className="block text-sm font-medium text-gray-700">
                Exercice
              </label>
              <div className="flex gap-2">
                <select
                  id="exercice"
                  name="exercice"
                  value={currentExercice.nom}
                  onChange={handleExerciceChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un exercice</option>
                  {availableExercices.map(exercice => (
                    <option key={exercice} value={exercice}>
                      {exercice}
                    </option>
                  ))}
                </select>
                {currentExercice.nom && (
                  <button
                    type="button"
                    onClick={() => deleteExercice(currentExercice.nom)}
                    className="mt-1 px-3 py-2 text-red-600 hover:text-red-800 focus:outline-none"
                    title="Supprimer cet exercice"
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
                <button
                  type="button"
                  onClick={() => setShowCustomExercice(!showCustomExercice)}
                  className="mt-1 px-3 py-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  title="Ajouter un exercice personnalisé"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {showCustomExercice && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customExercice}
                    onChange={e => setCustomExercice(e.target.value)}
                    placeholder="Nom de l'exercice"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomExercice}
                    className="mt-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Séries</h4>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="repetitions" className="block text-sm font-medium text-gray-700">
                  Répétitions
                </label>
                <input
                  type="number"
                  id="repetitions"
                  name="repetitions"
                  value={currentSerie.repetitions}
                  onChange={handleSerieChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="12"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="poids" className="block text-sm font-medium text-gray-700">
                  Poids (kg)
                </label>
                <input
                  type="number"
                  id="poids"
                  name="poids"
                  value={currentSerie.poids}
                  onChange={handleSerieChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="20"
                />
              </div>

              <button
                type="button"
                onClick={addSerie}
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Ajouter série
              </button>
            </div>

            {currentExercice.series.length > 0 && (
              <div className="mt-4 space-y-2">
                {currentExercice.series.map((serie, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>
                      Série {index + 1}: {serie.repetitions} répétitions
                      {serie.poids ? ` - ${serie.poids}kg` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSerie(index)}
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

            <button
              type="button"
              onClick={addExercice}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ajouter l'exercice
            </button>
          </div>
        </div>

        {exercices.length > 0 && (
          <div className="mt-4 space-y-4">
            <h4 className="text-md font-medium text-gray-900">Exercices ajoutés</h4>
            {exercices.map((exercice, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h5 className="font-medium">{exercice.nom}</h5>
                    <div className="space-y-1">
                      {exercice.series.map((serie, serieIndex) => (
                        <p key={serieIndex} className="text-gray-600">
                          Série {serieIndex + 1}: {serie.repetitions} répétitions
                          {serie.poids ? ` - ${serie.poids}kg` : ''}
                        </p>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExercice(index)}
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
