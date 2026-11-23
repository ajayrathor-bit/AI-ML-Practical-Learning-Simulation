import { useId, useState, type ReactNode } from 'react';

export interface TooltipMeta {
  title: string;
  description: string;
  trainingEffect: string;
}

interface HoverTooltipProps {
  tooltip?: TooltipMeta;
  children: ReactNode;
  placement?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  fullWidth?: boolean;
}

export function HoverTooltip({
  tooltip,
  children,
  placement = 'top',
  align = 'center',
  fullWidth = false,
}: HoverTooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  if (!tooltip) {
    return <>{children}</>;
  }

  const verticalClass =
    placement === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2';
  const horizontalClass =
    align === 'start'
      ? 'left-0'
      : align === 'end'
      ? 'left-0 sm:left-auto sm:right-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <div
      className={`relative ${fullWidth ? 'block w-full' : 'inline-flex'}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? tooltipId : undefined}
    >
      {children}
      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`pointer-events-none absolute z-30 w-64 max-w-[85vw] rounded-xl border border-slate-700/90 bg-[#091020]/95 p-3 shadow-2xl shadow-slate-950/90 backdrop-blur-sm space-y-1.5 ${verticalClass} ${horizontalClass}`}
        >
          <div className="text-[11px] font-semibold text-cyan-300">
            {tooltip.title}
          </div>
          <p className="text-[11px] leading-snug text-slate-200">
            {tooltip.description}
          </p>
          <p className="border-t border-slate-800 pt-1.5 text-[10.5px] leading-snug text-slate-400">
            <span className="font-semibold text-purple-300">Training Impact: </span>
            {tooltip.trainingEffect}
          </p>
        </div>
      )}
    </div>
  );
}
