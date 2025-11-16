import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Heart, AlertTriangle, Clock } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import AnimalTable from "@/components/AnimalTable";
import AddAnimalDialog from "@/components/AddAnimalDialog";
import { type Animal, type InsertAnimal } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const { toast } = useToast();

  const { data: animals = [], isLoading } = useQuery<Animal[]>({
    queryKey: ["/api/animals"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertAnimal) => {
      const res = await apiRequest("POST", "/api/animals", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/animals"] });
      toast({
        title: "Sucesso",
        description: "Animal adicionado com sucesso",
      });
      setDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao adicionar animal",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertAnimal }) => {
      const res = await apiRequest("PUT", `/api/animals/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/animals"] });
      toast({
        title: "Sucesso",
        description: "Animal atualizado com sucesso",
      });
      setEditingAnimal(null);
      setDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao atualizar animal",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/animals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/animals"] });
      toast({
        title: "Sucesso",
        description: "Animal removido com sucesso",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao remover animal",
        variant: "destructive",
      });
    },
  });

  const handleAddAnimal = (data: InsertAnimal) => {
    createMutation.mutate(data);
  };

  const handleEditAnimal = (animal: Animal) => {
    setEditingAnimal(animal);
    setDialogOpen(true);
  };

  const handleUpdateAnimal = (data: InsertAnimal) => {
    if (editingAnimal) {
      updateMutation.mutate({ id: editingAnimal.id, data });
    }
  };

  const handleDeleteAnimal = (id: string) => {
    if (confirm("Tem certeza que deseja remover este animal?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingAnimal(null);
    }
  };

  const criticalAnimals = animals.filter(a => {
    const tempCritical = a.temperatura < 37 || a.temperatura > 40;
    const hrCritical = (a.especie === "Cão" && (a.frequenciaCardiaca < 40 || a.frequenciaCardiaca > 160)) ||
                       (a.especie === "Gato" && (a.frequenciaCardiaca < 120 || a.frequenciaCardiaca > 240));
    return tempCritical || hrCritical;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold" data-testid="text-page-title">
                Monitoramento Veterinário
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Sistema de acompanhamento de saúde animal
              </p>
            </div>
            <Button 
              onClick={() => setDialogOpen(true)}
              data-testid="button-add-animal"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Animal
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            title="Total Animais"
            value={isLoading ? "-" : animals.length}
            icon={Heart}
            description="Registrados no sistema"
          />
          <DashboardCard
            title="Alertas Críticos"
            value={isLoading ? "-" : criticalAnimals}
            icon={AlertTriangle}
            description="Requerem atenção imediata"
          />
          <DashboardCard
            title="Última Atualização"
            value="Agora"
            icon={Clock}
            description="Em tempo real"
          />
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Lista de Animais</h2>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          ) : (
            <AnimalTable 
              animals={animals}
              onEdit={handleEditAnimal}
              onDelete={handleDeleteAnimal}
            />
          )}
        </div>
      </main>

      <AddAnimalDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        onSubmit={editingAnimal ? handleUpdateAnimal : handleAddAnimal}
        editingAnimal={editingAnimal}
      />
    </div>
  );
}
