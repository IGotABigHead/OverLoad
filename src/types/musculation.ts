export interface Serie {
  repetitions: string;
  poids?: string;
}

export interface Exercice {
  nom: string;
  series: Serie[];
}

export interface MusculationActivity {
  _id: string;
  date: string;
  exercices: Exercice[];
  notes: string;
}
