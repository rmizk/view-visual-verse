import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  trend?: {
    value: string;
    label: string;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend 
}) => {
  return (
    <article className="flex min-w-60 max-w-xs flex-col items-start flex-[1_0_0] border border-slate-200 bg-slate-50 rounded-lg border-solid max-sm:min-w-full max-sm:max-w-full">
      <header className="flex items-center gap-4 self-stretch pt-6 pb-3 px-6">
        <h3 className="flex-[1_0_0] text-slate-950 text-sm font-normal leading-[20.02px]">
          {title}
        </h3>
        <div className="opacity-50" dangerouslySetInnerHTML={{ __html: icon }} />
      </header>
      <div className="flex flex-col items-start gap-1 self-stretch pt-0 pb-6 px-6">
        <div className="text-slate-950 text-2xl font-bold leading-6 tracking-[-0.6px]">
          {value}
        </div>
        {trend && (
          <div className="flex justify-center items-center gap-1 px-0 py-0.5">
            <span className="text-slate-500 text-xs font-normal leading-[15.96px]">
              {trend.value}
            </span>
            <span className="text-slate-500 text-xs font-normal leading-[15.96px]">
              {trend.label}
            </span>
          </div>
        )}
        {!trend && (
          <div className="text-slate-500 text-xs font-normal leading-[15.96px]">
            {subtitle}
          </div>
        )}
      </div>
    </article>
  );
};
