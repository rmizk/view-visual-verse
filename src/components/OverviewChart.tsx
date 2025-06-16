import React from 'react';

interface ChartData {
  month: string;
  value: number;
  height: number;
}

interface OverviewChartProps {
  data?: ChartData[];
  title?: string;
}

const defaultData: ChartData[] = [
  { month: 'Jan', value: 6000, height: 211 },
  { month: 'Feb', value: 4500, height: 151 },
  { month: 'Mar', value: 1500, height: 60 },
  { month: 'Apr', value: 3000, height: 121 },
  { month: 'May', value: 7500, height: 302 },
  { month: 'Jun', value: 4500, height: 151 },
  { month: 'Jul', value: 3000, height: 121 },
  { month: 'Aug', value: 5000, height: 181 },
  { month: 'Sep', value: 1500, height: 60 },
  { month: 'Oct', value: 1500, height: 60 },
  { month: 'Nov', value: 6000, height: 211 },
  { month: 'Dec', value: 2500, height: 91 }
];

const yAxisLabels = ['$6000', '$4500', '$3000', '$1500', '$0'];

export const OverviewChart: React.FC<OverviewChartProps> = ({ 
  data = defaultData,
  title = "Overview"
}) => {
  return (
    <section className="flex h-[412px] flex-col items-start flex-[1_0_0] border border-slate-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-slate-50 rounded-lg border-solid max-md:w-full max-md:h-[300px]">
      <header className="self-stretch text-slate-950 text-base font-bold leading-4 gap-1 p-6">
        <h2>{title}</h2>
      </header>
      <div className="flex items-start gap-3 flex-[1_0_0] self-stretch pt-0 pb-6 px-6 max-sm:flex-col max-sm:gap-4">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between items-end self-stretch max-sm:flex-row max-sm:justify-between max-sm:items-center max-sm:self-stretch">
          {yAxisLabels.map((label, index) => (
            <div key={index} className="text-[#888] text-xs font-normal leading-[20.04px]">
              {label}
            </div>
          ))}
        </div>
        
        {/* Chart Bars */}
        <div className="flex items-end gap-3 flex-[1_0_0] self-stretch max-sm:h-[200px] max-sm:items-end">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col justify-end items-start gap-0.5 flex-[1_0_0] self-stretch">
              <div className="flex flex-col justify-end items-center gap-0.5 flex-[1_0_0] self-stretch relative">
                <div 
                  className="rounded w-full bg-slate-900 transition-all duration-300 hover:bg-slate-700 cursor-pointer"
                  style={{ height: `${item.height}px` }}
                  title={`${item.month}: $${item.value}`}
                  role="img"
                  aria-label={`${item.month}: $${item.value}`}
                />
              </div>
              <div className="flex-[1_0_0] text-slate-500 text-center text-xs font-normal leading-[20.04px] h-5 self-stretch">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
