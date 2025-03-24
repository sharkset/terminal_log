import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"

interface DashboardSelectProps {
  options: string[];
  row: number;
  onSelectChange: (selectedValue: number, row: number) => void;
  className?: string
  initial: string
}

export default function DashboardSelect({ options, onSelectChange, row, className, initial }: DashboardSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>(initial);

  const handleChange = (newValue: string) => {
    setSelectedValue(options?.[Number(newValue)]);
    onSelectChange(Number(newValue), row);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className={`w-full text-primary border-transparent border-b-primary rounded-none focus:border-transparent focus:border-b-white data-[placeholder]:text-primary [&_svg:not([class*='text-'])]:text-primary cursor-pointer ${className}`}>
        <SelectValue placeholder={selectedValue}/>
      </SelectTrigger>
      <SelectContent className="bg-secondary text-foreground border-none">
        {options.map((item, index) => (
          <SelectItem key={item} value={index.toString()} className="bg-none hover:bg-primary">{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};