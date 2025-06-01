'use client';

import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <main className="min-h-screen pt-[125px] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Calendrier d'entraînement</h1>
        <Calendar
          onDateSelect={date => {
            console.log('Date sélectionnée:', date);
            // Ici vous pourrez ajouter la logique pour afficher les entraînements du jour
          }}
        />
      </div>
    </main>
  );
}
