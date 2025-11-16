import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { type Animal } from "@shared/schema";
import HealthStatusBadge from "./HealthStatusBadge";

interface AnimalTableProps {
  animals: Animal[];
  onEdit?: (animal: Animal) => void;
  onDelete?: (id: string) => void;
}

export default function AnimalTable({ animals, onEdit, onDelete }: AnimalTableProps) {
  if (animals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="text-empty-state">
        <p className="text-muted-foreground text-lg mb-2">Nenhum animal registrado</p>
        <p className="text-sm text-muted-foreground">Adicione o primeiro animal para começar o monitoramento</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Espécie</TableHead>
            <TableHead className="text-right">Idade</TableHead>
            <TableHead className="text-right">Temperatura</TableHead>
            <TableHead className="text-right">Freq. Cardíaca</TableHead>
            <TableHead>Atividade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id} data-testid={`row-animal-${animal.id}`}>
              <TableCell className="font-medium" data-testid={`text-nome-${animal.id}`}>
                {animal.nome}
              </TableCell>
              <TableCell data-testid={`text-especie-${animal.id}`}>
                {animal.especie}
              </TableCell>
              <TableCell className="text-right" data-testid={`text-idade-${animal.id}`}>
                {animal.idade} anos
              </TableCell>
              <TableCell className="text-right" data-testid={`text-temperatura-${animal.id}`}>
                {animal.temperatura.toFixed(1)}°C
              </TableCell>
              <TableCell className="text-right" data-testid={`text-frequencia-${animal.id}`}>
                {animal.frequenciaCardiaca} bpm
              </TableCell>
              <TableCell data-testid={`text-atividade-${animal.id}`}>
                {animal.atividade}
              </TableCell>
              <TableCell>
                <HealthStatusBadge 
                  temperatura={animal.temperatura}
                  frequenciaCardiaca={animal.frequenciaCardiaca}
                  especie={animal.especie}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => onEdit?.(animal)}
                    data-testid={`button-edit-${animal.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => onDelete?.(animal.id)}
                    data-testid={`button-delete-${animal.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
