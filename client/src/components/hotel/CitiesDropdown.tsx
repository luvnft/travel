"use client";

import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";


import { getCities, City } from "@/services/cities";

export function CityCombobox({ onSelectCity }: { onSelectCity: (city: City) => void }) {
    const [cities, setCities] = useState<City[]>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const fetchedCities = await getCities();
                setCities(fetchedCities || []);
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };

        fetchCities();


    }, []);
    console.log(cities)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {value ? cities.find(city => city._id === value)?.city : "Select city..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                        {cities && cities.map((city) => (
                            <CommandItem
                                key={city._id}
                                value={city._id}
                                onSelect={(currentValue) => {
                                    setValue(currentValue);
                                    setOpen(false);
                                    onSelectCity(city);
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", value === city._id ? "opacity-100" : "opacity-0")} />
                                {city.city}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
