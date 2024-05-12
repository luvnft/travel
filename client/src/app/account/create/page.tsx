"use client";
import React, { ChangeEvent, useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import {
    UploadCloud as UploadIcon,
    Wifi as WifiIcon,
    Square as SquareParkingIcon,
    Spade as SpadeIcon,
    Menu as MenuIcon,
    Dumbbell as DumbbellIcon,
    BarChart2 as BarChartIcon,
    Wallet as WalletIcon,
    X as RemoveIcon
} from 'lucide-react';
import Navbar from '@/components/navbar';

import {CityCombobox} from '@/components/hotel/CitiesDropdown';
import {  City } from "@/services/cities";

interface Image {
    src: string;
    id: number;
    name: string;
}

export default function CreateHotel() {

    const [images, setImages] = useState<Image[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const newImages = files.map((file, index) => ({
                src: URL.createObjectURL(file),
                id: new Date().getTime() + index,
                name: file.name 
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
        }
    };


    const removeImage = (id: number) => {
        setImages(images => images.filter(image => image.id !== id));
    };
    
    const handleSelectCity = (city: City) => {
        setSelectedCity(city);
    };

    return (

        <div>
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 md:p-6">
                <div className="space-y-6">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Hotel Name</Label>
                            <Input id="name" placeholder="Enter hotel name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe your hotel" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="Enter hotel address" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amenities">Amenities</Label>
                            <Select id="amenities" multiple>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select amenities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pool">Pool</SelectItem>
                                    <SelectItem value="gym">Gym</SelectItem>
                                    <SelectItem value="spa">Spa</SelectItem>
                                    <SelectItem value="restaurant">Restaurant</SelectItem>
                                    <SelectItem value="bar">Bar</SelectItem>
                                    <SelectItem value="parking">Parking</SelectItem>
                                    <SelectItem value="wifi">Wifi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <CityCombobox onSelectCity={handleSelectCity} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="photos">Photos</Label>
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                                    <UploadIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Drag and drop your photos here or click to upload.
                                    </p>
                                    <Input id="photos" multiple type="file" onChange={handleImageChange} />
                                    {images.length > 0 ? images.map(image => (
                                        <div key={image.id} className="flex justify-between items-center p-2 hover:bg-gray-100">
                                            <span className="text-sm text-gray-800">{image.name}</span>
                                            <button
                                                onClick={() => removeImage(image.id)}
                                                className="p-1 rounded-full bg-red-500 hover:bg-red-700 text-white"
                                                aria-label="Remove image"
                                            >
                                                <RemoveIcon size={16} />
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="text-center p-2 text-sm text-gray-500">No images uploaded</div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                        </div>
                    </div>
                    <Button className="w-full" type="submit">
                        Create Hotel
                    </Button>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 md:p-6 space-y-4">
                    <Carousel className="w-full max-w-[400px] mx-auto">
                        <CarouselContent>
                            {images.length > 0 ? (
                                images.map(image => (
                                    <CarouselItem key={image.id}>
                                        <img
                                            alt="Uploaded image"
                                            className="rounded-lg w-full aspect-[4/3] object-cover"
                                            src={image.src}
                                            width={400}
                                            height={300}
                                        />
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <img
                                        alt="Placeholder image"
                                        className="rounded-lg w-full aspect-[4/3] object-cover"
                                        src="https://placehold.co/600x400"
                                        width={400}
                                        height={300}
                                    />
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Hotel Acme</h3>
                        <p className="text-gray-500 dark:text-gray-400">123 Main St, New York, NY 10001</p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Discover the perfect blend of comfort and style at Hotel Acme. Our hotel offers a range of amenities to
                            ensure your stay is unforgettable.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                        {selectedCity ? `Discover ${selectedCity.city}, a city of ${selectedCity.population} inhabitants.` : 'Discover the perfect blend of comfort and style at Hotel Acme. Our hotel offers a range of amenities to ensure your stay is unforgettable.'}
                    </p>
                        <div className="flex items-center gap-2">
                            <WalletIcon className="w-5 h-5" />
                            <DumbbellIcon className="w-5 h-5" />
                            <SpadeIcon className="w-5 h-5" />
                            <MenuIcon className="w-5 h-5" />
                            <BarChartIcon className="w-5 h-5" />
                            <SquareParkingIcon className="w-5 h-5" />
                            <WifiIcon className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

