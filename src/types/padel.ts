export type PadelActivityType = 'training' | 'tournament';

export interface PadelActivity {
  _id: string;
  type: PadelActivityType;
  date: Date;
  duration: number; // en minutes
  location: string;
  notes?: string;
  // Champs spécifiques aux tournois
  tournamentName?: string;
  result?: string;
  // Champs spécifiques aux entraînements
  score?: string; // Format: "6-4, 6-3"
  level?: string; // Format: "4", "4/5", "5"
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePadelActivity = Omit<PadelActivity, '_id' | 'createdAt' | 'updatedAt'>;
