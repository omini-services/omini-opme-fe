import { format, isDate, isValid, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { SelectSingleEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { Control, FieldPath, FieldValues, useController } from "react-hook-form"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Input } from "./input"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "./popover"

export interface DatePickerInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  control?: Control<T>;
  name: FieldPath<T>;
  className?: string;
}

export default function DatePickerInput<T extends FieldValues>({ control, name, className, ...props }: DatePickerInputProps<T>) {
  const [date, setDate] = React.useState<Date>()
  const [inputValue, setInputValue] = React.useState('')

  const { field } = useController({
    name,
    control,
  });

  useEffect(() => {
    if (isDate(field.value)) {
      setDate(field.value)
      setInputValue(format(field.value, "dd/MM/yyyy"))
      return;
    }

    const date = parse(field.value, 'dd/MM/yyyy', new Date());
    if (isValid(date)) {
      setDate(date)
      return;
    }

    setInputValue('')
    setDate(undefined);

  }, [field.value])

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    let formattedDate = inputValue;

    formattedDate = formattedDate.replace(/[^\d]/g, "");

    if (formattedDate.length > 2 && formattedDate[2] !== '/') {
      formattedDate = formattedDate.slice(0, 2) + '/' + formattedDate.slice(2);
    }
    if (formattedDate.length > 5 && formattedDate[5] !== '/') {
      formattedDate = formattedDate.slice(0, 5) + '/' + formattedDate.slice(5);
    }

    setInputValue(formattedDate)

    if (formattedDate.length === 10) {
      field.onChange(formattedDate)
    } else {
      setDate(undefined)
    }
  };

  const handleSelectDate: SelectSingleEventHandler = React.useCallback((selected) => {
    setDate(selected);
    if (selected) {
      field.onChange(selected);
    } else {
      field.onChange('');
    }
  }, [])

  return (
    <Popover>
      <PopoverAnchor asChild>
        <fieldset className={cn("relative", className)}>
          <PopoverTrigger asChild>
            <Button
              aria-label="Pick a date"
              variant={"secondary"}
              className={cn(
                "absolute right-1.5 top-1/2 h-7 -translate-y-1/2 rounded-sm border px-2 font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <Input value={inputValue} onChange={handleInputChange} maxLength={10} {...props} />
        </fieldset>
      </PopoverAnchor>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
