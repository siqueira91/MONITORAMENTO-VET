import DashboardCard from '../DashboardCard';
import { Heart } from 'lucide-react';

export default function DashboardCardExample() {
  return (
    <div className="p-4">
      <DashboardCard
        title="Total Animais"
        value={12}
        icon={Heart}
        description="Registrados no sistema"
      />
    </div>
  );
}
