"use client";

import { useEffect, useState, useRef } from "react";
import SuccessBooking from "@/components/hotel/SuccessBooking";
import Loading from "@/components/Loading";
import { createBooking, Booking } from "@/services/booking";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/helper/darkmode";
import NoDataCard from "@/components/NoDataCard";

export default function SuccessPage() {
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [parsedData, setParsedData] = useState<any>(null); 
  const bookingCreatedRef = useRef(false); // Ref to track booking creation

  useEffect(() => {
    if (typeof window !== 'undefined' && !bookingCreatedRef.current) { 
      const data = localStorage.getItem("bookingData");
      if (data) {
        const parsed = JSON.parse(data);
        setParsedData(parsed); 
        console.log('Parsed bookingData:', parsed);

        setLoading(true); 
        createBooking(parsed)
          .then(response => {
            console.log('Booking response:', response);
            setBookingData(response);
            bookingCreatedRef.current = true; // Set the ref to true after booking is created
          })
          .catch(error => console.error('Failed to create booking:', error.message))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, []);

  // Ensure the cleanup function sets the loading to false and prevents multiple calls
  useEffect(() => {
    return () => {
      setLoading(false);
      bookingCreatedRef.current = true; // Ensuring no further calls
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!bookingData) {
    return <NoDataCard />;
  }

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="self-start mt-3 flex justify-between w-full">
          <Link href="/account/bookings">
            <Button className="mx-3">
              <ChevronLeft className="mr-2 h-4 w-4" /> View My Bookings
            </Button>
          </Link>
          <div className="mx-3">
            <ModeToggle />
          </div>
        </div>
      </div>
      {parsedData && (
        <SuccessBooking
          bookingData={{
            hotelName: parsedData.hotelName,
            hotelImage: parsedData.hotelImage,
            roomsCount: parsedData.roomsCount,
            checkInDate: parsedData.checkInDate,
            checkOutDate: parsedData.checkOutDate,
          }}
        />
      )}
    </div>
  );
}
