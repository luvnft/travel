"use client";

import SidebarFilter from '@/components/hotel/SidebarFilter';
import HotelCard from '@/components/hotel/HotelCard';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from 'react';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/navbar';
interface Hotel {
    id: number;
    name: string;
    imageUrl: string;
    rating: number;
    location: string;
    description: string;
    price: number;
    amenities: string[];
}
const hotels = [
    {
        id: 1,
        name: "Four Seasons Resort",
        imageUrl: "https://www.fourseasons.com/content/dam/fourseasons/images/web/APL/APL_137_original.jpg",
        rating: 5,
        location: "Bali, Indonesia",
        description: "Experience an unforgettable stay at our luxurious beachfront resort with state-of-the-art amenities and breathtaking ocean views.",
        price: 399,
        amenities: ["wifi", "pool", "gym", "spa", "restaurant"]
    },
    {
        id: 2,
        name: "Mountain Escape",
        imageUrl: "https://www.fourseasons.com/content/dam/fourseasons/images/web/APL/APL_137_original.jpg",
        rating: 4,
        location: "Aspen, Colorado",
        description: "Enjoy a cozy stay at our mountain lodge offering stunning views, ski-in/ski-out access, and a warm, rustic ambiance.",
        price: 299,
        amenities: ["wifi", "parking", "gym", "restaurant"]
    },
    {
        id: 3,
        name: "Urban Hotel Central",
        imageUrl: "https://www.fourseasons.com/content/dam/fourseasons/images/web/APL/APL_137_original.jpg",
        rating: 3,
        location: "New York, USA",
        description: "Perfectly located in the heart of the city, close to major attractions and shopping districts. Ideal for business and leisure travelers.",
        price: 249,
        amenities: ["wifi", "parking", "restaurant"]
    }
];

export default function HotelListingPage() {
    const [filteredHotels, setFilteredHotels] = useState(hotels);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filtered = hotels.filter(hotel =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHotels(filtered);
    }, [searchTerm]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const sortHotels = (by: 'price' | 'rating') => {
        const sortedHotels = [...filteredHotels].sort((a, b) => {
            if (by === 'price') {
                return a.price - b.price;
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
            <div className="flex">
                <div className="w-64">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredHotels.map(hotel => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}
