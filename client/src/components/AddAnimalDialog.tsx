import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAnimalSchema, type InsertAnimal, type Animal } from "@shared/schema";

interface AddAnimalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertAnimal) => void;
  editingAnimal?: Animal | null;
}

const especies = ["Cão", "Gato", "Cavalo", "Vaca", "Coelho", "Pássaro", "Outro"];
const atividades = ["Ativo", "Moderado", "Repouso", "Sedentário"];

export default function AddAnimalDialog({ open, onOpenChange, onSubmit, editingAnimal }: AddAnimalDialogProps) {
  const form = useForm<InsertAnimal>({
    resolver: zodResolver(insertAnimalSchema),
    defaultValues: {
      nome: "",
      especie: "",
      idade: 0,
      temperatura: 38.0,
      frequenciaCardiaca: 80,
      atividade: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (editingAnimal) {
        form.reset({
          nome: editingAnimal.nome,
          especie: editingAnimal.especie,
          idade: editingAnimal.idade,
          temperatura: editingAnimal.temperatura,
          frequenciaCardiaca: editingAnimal.frequenciaCardiaca,
          atividade: editingAnimal.atividade,
        });
      } else {
        form.reset({
          nome: "",
          especie: "",
          idade: 0,
          temperatura: 38.0,
          frequenciaCardiaca: 80,
          atividade: "",
        });
      }
    }
  }, [open, editingAnimal, form]);

  const handleSubmit = (data: InsertAnimal) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-add-animal">
        <DialogHeader>
          <DialogTitle>
            {editingAnimal ? "Editar Animal" : "Adicionar Novo Animal"}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do animal e suas métricas de saúde
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rex" {...field} data-testid="input-nome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="especie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espécie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-especie">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {especies.map(especie => (
                          <SelectItem key={especie} value={especie}>
                            {especie}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="idade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade (anos)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 5" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      data-testid="input-idade"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="temperatura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperatura (°C)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="Ex: 38.5" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        data-testid="input-temperatura"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="frequenciaCardiaca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Freq. Cardíaca (bpm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ex: 85" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-frequencia"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="atividade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de Atividade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-atividade">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {atividades.map(atividade => (
                        <SelectItem key={atividade} value={atividade}>
                          {atividade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                Cancelar
              </Button>
              <Button type="submit" data-testid="button-submit">
                {editingAnimal ? "Salvar Alterações" : "Adicionar Animal"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
