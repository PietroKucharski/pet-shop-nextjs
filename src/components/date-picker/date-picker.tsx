'use client';

import {
  Calendar as CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from '../ui/popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { addDays, format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '../ui/calendar';

export const DatePicker = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const getInitialDate = useCallback(() => {
    if (!dateParam) return;

    const [year, month, day] = dateParam.split('-').map(Number);
    const parsedData = new Date(year, month - 1, day);

    if (!isValid(parsedData)) return new Date();

    return parsedData;
  }, [dateParam]);

  const [date, setDate] = useState<Date | undefined>(getInitialDate);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const updateURLWithDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('date', format(selectedDate, 'yyyy-MM-dd'));

    router.push(`${pathName}?${newParams.toString()}`);
  };

  const handleNavigateDay = (days: number) => {
    const newDate = addDays(date || new Date(), days);
    updateURLWithDate(newDate);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    updateURLWithDate(selectedDate);
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    const newDate = getInitialDate();

    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate);
    }
  }, [date, getInitialDate]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => handleNavigateDay(-1)}>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-content-brand" />
              {date ? (
                format(date, 'dd/MM/yyyy')
              ) : (
                <span>Selecione uma data</span>
              )}
            </div>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            autoFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" onClick={() => handleNavigateDay(1)}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
