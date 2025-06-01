export type TypeNage = 'crawl' | 'brasse' | 'dos' | 'papillon' | '4nages';

export interface Nage {
  _id: string;
  type: TypeNage;
  distance: number;
}

export interface NatationActivity {
  _id: string;
  date: string;
  nages: Nage[];
  notes: string;
}
