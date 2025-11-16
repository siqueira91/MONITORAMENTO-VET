import HealthStatusBadge from '../HealthStatusBadge';

export default function HealthStatusBadgeExample() {
  return (
    <div className="p-4 flex gap-2">
      <HealthStatusBadge temperatura={38.5} frequenciaCardiaca={80} especie="Cão" />
      <HealthStatusBadge temperatura={40.5} frequenciaCardiaca={160} especie="Cão" />
      <HealthStatusBadge temperatura={42.0} frequenciaCardiaca={200} especie="Cão" />
    </div>
  );
}
