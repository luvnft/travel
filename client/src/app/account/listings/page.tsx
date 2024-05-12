import React from 'react';
import Navbar from '@/components/navbar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ListFilter, Users2, CreditCard, ShoppingCart, LineChart } from "lucide-react";
import ListingCard from "@/components/account/ListingCard";
import { Separator } from "@/components/ui/separator"



export default function ListingsPage() {
    const listings = [
        {
            title: "The Ritz-Carlton, New York",
            pricePerNight: 399,
            description: "Experience luxury and sophistication at The Ritz-Carlton, New York. Situated in the heart of the city, this iconic hotel offers breathtaking views, world-class amenities, and impeccable service.",
            imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230466222.jpg?k=c9221d86295955a7f13b424b6642d9cb1e6cc91838b3db36bcb8472635f2fb28&o=&hp=1"
        },
        {
            title: "The Ritz-Carlton, New York",
            pricePerNight: 399,
            description: "Experience luxury and sophistication at The Ritz-Carlton, New York. Situated in the heart of the city, this iconic hotel offers breathtaking views, world-class amenities, and impeccable service.",
            imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230466222.jpg?k=c9221d86295955a7f13b424b6642d9cb1e6cc91838b3db36bcb8472635f2fb28&o=&hp=1"
        },
        {
            title: "The Ritz-Carlton, New York",
            pricePerNight: 399,
            description: "Experience luxury and sophistication at The Ritz-Carlton, New York. Situated in the heart of the city, this iconic hotel offers breathtaking views, world-class amenities, and impeccable service.",
            imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230466222.jpg?k=c9221d86295955a7f13b424b6642d9cb1e6cc91838b3db36bcb8472635f2fb28&o=&hp=1"
        },
        {
            title: "The Ritz-Carlton, New York",
            pricePerNight: 399,
            description: "Experience luxury and sophistication at The Ritz-Carlton, New York. Situated in the heart of the city, this iconic hotel offers breathtaking views, world-class amenities, and impeccable service.",
            imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230466222.jpg?k=c9221d86295955a7f13b424b6642d9cb1e6cc91838b3db36bcb8472635f2fb28&o=&hp=1"
        },
        {
            title: "The Ritz-Carlton, New York",
            pricePerNight: 399,
            description: "Experience luxury and sophistication at The Ritz-Carlton, New York. Situated in the heart of the city, this iconic hotel offers breathtaking views, world-class amenities, and impeccable service.",
            imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230466222.jpg?k=c9221d86295955a7f13b424b6642d9cb1e6cc91838b3db36bcb8472635f2fb28&o=&hp=1"
        },
    ];

    const dashboardData = {
        listingsCount: 14,
        transactionsCount: 120,
        revenue: 58000,
        occupancyRate: 75
    };


    return (

        <div>

            <Navbar />
            <div className="p-8">

                <div className="flex items-center justify-between my-4">
                    <h1 className="text-3xl font-bold">My Listings</h1>

                </div>
                <Separator orientation="vertical" />

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {/* Number of Listings */}
                    <Card className="bg-background shadow-sm rounded-lg">
                        <CardHeader className="flex justify-between items-center p-4">
                            <CardTitle className="text-lg font-bold">Listings</CardTitle>
                            <Users2 className="h-6 w-6 text-blue-500" />
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-2xl font-semibold">{dashboardData.listingsCount}</p>
                            <p className="text-sm text-gray-500">Total Listings</p>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button variant="outline" className="w-full">View Listings</Button>
                        </CardFooter>
                    </Card>

                    {/* Number of Transactions */}
                    <Card className="bg-background shadow-sm rounded-lg">
                        <CardHeader className="flex justify-between items-center p-4">
                            <CardTitle className="text-lg font-bold">Transactions</CardTitle>
                            <CreditCard className="h-6 w-6 text-green-500" />
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-2xl font-semibold">{dashboardData.transactionsCount}</p>
                            <p className="text-sm text-gray-500">Completed this month</p>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button variant="outline" className="w-full">View Transactions</Button>
                        </CardFooter>
                    </Card>

                    {/* Revenue */}
                    <Card className="bg-background shadow-sm rounded-lg">
                        <CardHeader className="flex justify-between items-center p-4">
                            <CardTitle className="text-lg font-bold">Revenue</CardTitle>
                            <ShoppingCart className="h-6 w-6 text-purple-500" />
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-2xl font-semibold">${dashboardData.revenue.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Total Revenue</p>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Progress value={60} max={100} />
                        </CardFooter>
                    </Card>

                    {/* Occupancy Rate */}
                    <Card className="bg-background shadow-sm rounded-lg">
                        <CardHeader className="flex justify-between items-center p-4">
                            <CardTitle className="text-lg font-bold">Occupancy Rate</CardTitle>
                            <LineChart className="h-6 w-6 text-orange-500" />
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-2xl font-semibold">{dashboardData.occupancyRate}%</p>
                            <p className="text-sm text-gray-500">Current month</p>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Badge variant="success">Healthy</Badge>
                        </CardFooter>
                    </Card>
                </div>

                <div className="flex items-center justify-end my-4">
                    <div className="mt-4">
                        <Button variant="solid" className="bg-blue-500 hover:bg-blue-600 text-white">Add Hotel</Button>
                    </div>
                </div>

                {listings.map((listing, index) => (
                    <ListingCard
                        key={index}
                        title={listing.title}
                        pricePerNight={listing.pricePerNight}
                        description={listing.description}
                        imageUrl={listing.imageUrl}
                    />
                ))}
            </div>
        </div>

    );
}
