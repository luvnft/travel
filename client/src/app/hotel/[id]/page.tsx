"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getHotelById, Hotel } from '@/services/hotel';
import ViewHotel from '@/components/hotel/ViewHotel';
import Loading from '@/components/Loading';
import Navbar from '@/components/navbar';
import { getRoomsByHotel, Room } from '@/services/room';
import ViewRoom from '@/components/room/ViewRoom';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange';
import CheckoutHotel from '@/components/hotel/CheckoutHotel';

interface SelectedRoom {
  roomId: string;
  roomName: string;
  roomType: string;
  roomPrice: number;
  roomCount: number;
}

const HotelViewPage: React.FC = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        const hotelData = await getHotelById(id as string);
        const roomData = await getRoomsByHotel(id as string);
        setHotel(hotelData);
        setRooms(roomData);
      } catch (err) {
        setError("Failed to fetch hotel data");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [id]);

  const handleCounterChange = (roomId: string, count: number) => {
    setSelectedRooms(prevSelectedRooms => {
      const existingRoom = prevSelectedRooms.find(room => room.roomId === roomId);
      if (count > 0) {
        if (existingRoom) {
          return prevSelectedRooms.map(room =>
            room.roomId === roomId ? { ...room, roomCount: count } : room
          );
        } else {
          const roomDetails = rooms.find(room => room._id === roomId);
          if (roomDetails) {
            return [
              ...prevSelectedRooms,
              {
                roomId,
                roomName: roomDetails.name,
                roomType: roomDetails.type,
                roomPrice: roomDetails.price,
                roomCount: count
              }
            ];
          }
        }
      } else {
        return prevSelectedRooms.filter(room => room.roomId !== roomId);
      }
      return prevSelectedRooms;
    });
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Navbar />
      {hotel && (
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold">Checkout and book {hotel.name}</h1>
        </div>
      )}
      {error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      ) : hotel ? (
        <div className="space-y-8">
          <ViewHotel hotel={hotel} />
          <DatePickerWithRange className="w-full max-w-md" />
          {rooms.map((room) => (
            <ViewRoom key={room._id} room={room} onCounterChange={handleCounterChange} />
          ))}
          {selectedRooms.length > 0 && (
            <CheckoutHotel
              hotelName={hotel.name}
              hotelPicture={hotel.images[0] || '/placeholder.svg'}
              selectedRooms={selectedRooms}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Hotel Not Found</h2>
            <p className="text-gray-500">The hotel you are looking for does not exist.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelViewPage;
