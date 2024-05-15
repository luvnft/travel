"use client";

import SidebarFilter from '@/components/hotel/SidebarFilter';
import HotelCard from '@/components/hotel/HotelCard';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from 'react';
import Navbar from '@/components/Navbar';
import { getHotelList } from '@/services/hotel'; 



export interface Hotel {
    _id: string;
    name: string;
    address: string;
    city: string;
    longitude: string;
    latitude: string;
    cheapestPrice: number;
    description: string;
    rating: number;
    amenities: string[];
    images: string[];
    rooms: any[];  
    cityId: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}



export default function HotelListingPage() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchHotels = async () => {
            setIsLoading(true);
            try {
                const data = await getHotelList();
                setHotels(data);
                setFilteredHotels(data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching hotels:', err);
                setError('Failed to fetch hotels');
                setHotels([]);
                setFilteredHotels([]);
                setIsLoading(false);
            }
        };
        fetchHotels();
    }, [])
    
    useEffect(() => {
        const filtered = hotels.filter(hotel =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHotels(filtered);
    }, [searchTerm, hotels]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const sortHotels = (by: 'price' | 'rating') => {
        const sortedHotels = [...filteredHotels].sort((a, b) => {
            if (by === 'price') {
                return a.cheapestPrice - b.cheapestPrice;
            } else if (by === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });
        setFilteredHotels(sortedHotels);
    };

    return (
        <div>
            <Navbar />
            <div className="flex p-5">
                <div className="w-64 p-2 hidden md:block">
                    <SidebarFilter />
                </div>
                <div className="flex-1 p-4">
                    <div className="mb-4">
                        <Input className="w-full" placeholder="Search hotels..." value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <div className="mb-4 flex justify-end space-x-2">
                        <Button onClick={() => sortHotels('price')} className="px-4 py-2 rounded bg-gray-200">Sort by Price</Button>
                        <Button onClick={() => sortHotels('rating')} className="px-4 py-2 rounded bg-gray-200">Sort by Rating</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredHotels.map(hotel => (
                            <HotelCard key={hotel._id} hotel={hotel} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}
