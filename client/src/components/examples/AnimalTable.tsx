import AnimalTable from '../AnimalTable';
import { type Animal } from '@shared/schema';

export default function AnimalTableExample() {
  const mockAnimals: Animal[] = [
    {
      id: "1",
      nome: "Rex",
      especie: "Cão",
      idade: 5,
      temperatura: 38.5,
      frequenciaCardiaca: 85,
      atividade: "Ativo"
    },
    {
      id: "2",
      nome: "Luna",
      especie: "Gato",
      idade: 3,
      temperatura: 39.0,
      frequenciaCardiaca: 180,
      atividade: "Repouso"
    }
  ];

  return (
    <div className="p-4">
      <AnimalTable 
        animals={mockAnimals}
        onEdit={(animal) => console.log('Edit:', animal)}
        onDelete={(id) => console.log('Delete:', id)}
      />
    </div>
  );
}
