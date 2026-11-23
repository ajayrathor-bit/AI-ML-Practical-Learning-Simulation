import { Info } from 'lucide-react';

interface SimulationNoticeProps {
  label?: string;
}

export function SimulationNotice({
  label = 'Interactive Simulation · Sample Educational Data (Not a live model prediction)',
}: SimulationNoticeProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <Info className="h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
