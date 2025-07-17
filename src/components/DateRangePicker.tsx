
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  value?: { from: Date; to: Date };
  onChange?: (value: { from: Date; to: Date }) => void;
  placeholder?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  value,
  onChange,
  placeholder = "Select date range"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDateRange = (dateRange?: { from: Date; to: Date }) => {
    if (!dateRange) return placeholder;
    
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    };

    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
  };

  return (
    <div className="flex w-[309px] flex-col items-start gap-2 p-0 max-sm:w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center self-stretch border border-slate-200 bg-white px-3 py-2 rounded-md border-solid hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        aria-label="Select date range"
        aria-expanded={isOpen}
      >
        <span className="flex-[1_0_0] text-slate-950 text-sm font-normal leading-[20.02px] text-left">
          {formatDateRange(value)}
        </span>
        <div className="flex justify-end items-center pl-4">
          <Calendar className="w-4 h-4 text-slate-950" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg z-10 p-4">
          <p className="text-sm text-slate-500">Date picker functionality would be implemented here</p>
        </div>
      )}
    </div>
  );
};
