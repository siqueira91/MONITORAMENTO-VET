import { Badge } from "@/components/ui/badge";

interface HealthStatusBadgeProps {
  temperatura: number;
  frequenciaCardiaca: number;
  especie: string;
}

function getTemperatureStatus(temp: number, especie: string): "normal" | "atencao" | "critico" {
  const normalRanges: Record<string, [number, number]> = {
    "Cão": [38.0, 39.2],
    "Gato": [38.0, 39.2],
    "Cavalo": [37.5, 38.5],
    "Vaca": [38.0, 39.5],
    "default": [37.5, 39.5]
  };
  
  const [min, max] = normalRanges[especie] || normalRanges.default;
  
  if (temp >= min && temp <= max) return "normal";
  if (temp < min - 1 || temp > max + 1) return "critico";
  return "atencao";
}

function getHeartRateStatus(hr: number, especie: string): "normal" | "atencao" | "critico" {
  const normalRanges: Record<string, [number, number]> = {
    "Cão": [60, 140],
    "Gato": [140, 220],
    "Cavalo": [28, 44],
    "Vaca": [48, 84],
    "default": [40, 120]
  };
  
  const [min, max] = normalRanges[especie] || normalRanges.default;
  
  if (hr >= min && hr <= max) return "normal";
  if (hr < min - 20 || hr > max + 20) return "critico";
  return "atencao";
}

export default function HealthStatusBadge({ temperatura, frequenciaCardiaca, especie }: HealthStatusBadgeProps) {
  const tempStatus = getTemperatureStatus(temperatura, especie);
  const hrStatus = getHeartRateStatus(frequenciaCardiaca, especie);
  
  const overallStatus = tempStatus === "critico" || hrStatus === "critico" 
    ? "critico" 
    : tempStatus === "atencao" || hrStatus === "atencao"
    ? "atencao"
    : "normal";
  
  const statusConfig = {
    normal: { label: "Normal", className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
    atencao: { label: "Atenção", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400" },
    critico: { label: "Crítico", className: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400" }
  };
  
  const config = statusConfig[overallStatus];
  
  return (
    <Badge 
      variant="secondary" 
      className={config.className}
      data-testid={`badge-status-${overallStatus}`}
    >
      {config.label}
    </Badge>
  );
}
