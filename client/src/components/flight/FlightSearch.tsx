"use client";


import { useState } from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/DatePicker";
import { DatePickerWithRange } from "@/components/ui/DateRange";
import { DateRangePicker } from '../ui/DateRangePicker';
import SearchInputs from '@/components/flight/SearchInput';


export default function FlightSearchCard() {
    const [isOneWay, setIsOneWay] = useState(false);
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    const handleOneWayChange = (checked: boolean) => {
        setIsOneWay(checked);
        if (!checked) {
            setReturnDate(null);
        }
    };

    return (
        <div className="container py-8 lg:py-32 flex justify-center">
            <Card className="w-full max-w-lg lg:max-w-xl shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Find Your Next Flight</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4 p-4">
                        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                            <SearchInputs />
                        </div>
                        <div>
                            {isOneWay ? (
                                <DatePicker
                                    selected={departureDate}
                                    onSelect={setDepartureDate}
                                />
                            ) : (
                                <DateRangePicker
                                    onUpdate={(values) => console.log(values)}
                                    initialDateFrom="2023-01-01"
                                    initialDateTo="2023-12-31"
                                    align="start"
                                    locale="en-GB"
                                    showCompare={false}
                                />
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0">
                            <Checkbox id="one-way" checked={isOneWay} onCheckedChange={handleOneWayChange} />
                            <label htmlFor="one-way" className="text-sm font-medium leading-none">
                                One-Way
                            </label>
                        </div>
                        <Button className="w-full mt-4" type="submit">
                            Search Flights
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
