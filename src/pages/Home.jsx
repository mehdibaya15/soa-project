import { useState } from "react";
import PersonList from "../components/PersonList";
import PersonForm from "../components/PersonForm";

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (person) => {
    setSelectedPerson(person);
  };

  const handleFormSuccess = () => {
    setSelectedPerson(null);
    // Force refresh of PersonList by changing the key
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Gestion des Personnes
          </h1>
          <p className="text-gray-600">
            Ajoutez, modifiez ou supprimez des personnes de votre liste
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {selectedPerson ? "Modifier une personne" : "Ajouter une personne"}
            </h2>
            <PersonForm
              selectedPerson={selectedPerson}
              onSuccess={handleFormSuccess}
              onCancel={() => setSelectedPerson(null)}
            />
          </div>

          {/* List Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <PersonList 
              key={refreshTrigger}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}