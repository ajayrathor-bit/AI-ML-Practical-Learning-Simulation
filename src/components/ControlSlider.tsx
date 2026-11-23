import { useId } from 'react';
import { HoverTooltip, type TooltipMeta } from './HoverTooltip';

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatValue?: (val: number) => string;
  onChange: (value: number) => void;
  tooltip?: TooltipMeta;
}

export function ControlSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  formatValue,
  onChange,
  tooltip,
}: ControlSliderProps) {
  const id = useId();
  const display = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <HoverTooltip tooltip={tooltip} placement="top" align="end" fullWidth>
      <div className="space-y-2 rounded-lg p-1.5 -m-1.5 transition-colors hover:bg-slate-800/30">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={id} className="text-sm font-medium text-slate-200">
            {label}
          </label>
          <span className="font-mono text-xs font-medium text-cyan-300 tabular-nums">
            {display}
          </span>
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="lab-slider w-full cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-mono text-slate-500 tabular-nums">
          <span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
          <span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
        </div>
      </div>
    </HoverTooltip>
  );
}
