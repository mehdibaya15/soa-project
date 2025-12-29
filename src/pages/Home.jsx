import { useState } from "react";
import PersonList from "../components/PersonList";
import PersonForm from "../components/PersonForm";

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Gestion des personnes
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        <PersonForm
          selectedPerson={selectedPerson}
          onSuccess={() => {
            setSelectedPerson(null);
            setRefresh(!refresh);
          }}
        />

        <div className="flex-1">
          <PersonList key={refresh} onEdit={setSelectedPerson} />
        </div>
      </div>
    </div>
  );
}
