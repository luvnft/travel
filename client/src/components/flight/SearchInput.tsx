import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAirports, Airport } from '@/services/flight';
import { InputLoading } from "@/components/ui/InputLoading";
import { Label } from "@/components/ui/label";

interface LoadingState {
    departure: boolean;
    arrival: boolean;
}

interface AirportResults {
    departureResults: Airport[];
    arrivalResults: Airport[];
}

const SearchInputs: React.FC = () => {
    const [departure, setDeparture] = useState<string>('');
    const [arrival, setArrival] = useState<string>('');
    const [loading, setLoading] = useState<LoadingState>({ departure: false, arrival: false });
    const [results, setResults] = useState<AirportResults>({ departureResults: [], arrivalResults: [] });
    const [showDropdown, setShowDropdown] = useState<{ departure: boolean; arrival: boolean }>({ departure: false, arrival: false });

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setShowDropdown({ departure: false, arrival: false });
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const debounce = (func: (...args: any[]) => void, wait: number) => {
        let timeout: NodeJS.Timeout | undefined = undefined;
        return (...args: any[]) => {
            const later = () => {
                clearTimeout(timeout!);
                func(...args);
            };
            timeout = setTimeout(later, wait);
        };
    };

    const fetchAirportsCall = async (field: string, value: string) => {
        setLoading(prev => ({ ...prev, [field]: true }));
        try {
            const data = await fetchAirports(value);
            setResults(prev => ({ ...prev, [`${field}Results`]: data }));
            setShowDropdown(prev => ({ ...prev, [field]: true }));
        } catch (error) {
            console.error('Error fetching airports:', error);
        } finally {
            setLoading(prev => ({ ...prev, [field]: false }));
        }
    };

    const fetchAirportsDebounced = useCallback(debounce(fetchAirportsCall, 300), []);

    useEffect(() => {
        if (departure.length >= 3) {
            fetchAirportsDebounced('departure', departure);
        } else {
            setShowDropdown({ ...showDropdown, departure: false });
        }
    }, [departure, fetchAirportsDebounced]);

    useEffect(() => {
        if (arrival.length >= 3) {
            fetchAirportsDebounced('arrival', arrival);
        } else {
            setShowDropdown({ ...showDropdown, arrival: false });
        }
    }, [arrival, fetchAirportsDebounced]);

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4" ref={wrapperRef}>
            <div className="space-y-1.5 relative">
                <Label htmlFor="departure">Departure</Label>
                <InputLoading 
                    id="departure" 
                    placeholder="From" 
                    value={departure} 
                    onChange={e => setDeparture(e.target.value)} 
                    loading={loading.departure}
                    onFocus={() => setShowDropdown(prev => ({ ...prev, departure: true }))}
                />
                {showDropdown.departure && results.departureResults.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white shadow-md max-h-60 overflow-auto">
                        {results.departureResults.map((airport, index) => (
                            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setDeparture(airport.name);
                                    setShowDropdown({ departure: false, arrival: false });
                                }}>
                                {airport.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="space-y-1.5 relative">
                <Label htmlFor="arrival">Arrival</Label>
                <InputLoading 
                    id="arrival" 
                    placeholder="To" 
                    value={arrival} 
                    onChange={e => setArrival(e.target.value)} 
                    loading={loading.arrival}
                    onFocus={() => setShowDropdown(prev => ({ ...prev, arrival: true }))}
                />
                {showDropdown.arrival && results.arrivalResults.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white shadow-md max-h-60 overflow-auto">
                        {results.arrivalResults.map((airport, index) => (
                            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setArrival(airport.name);
                                    setShowDropdown({ departure: false, arrival: false });
                                }}>
                                {airport.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchInputs;
