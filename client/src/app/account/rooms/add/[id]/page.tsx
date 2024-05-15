"use client";
import React, { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoomSchema, CreateRoomFormValues } from '@/schemas/createRoomSchema';
import { createRoom, CreateRoomData } from '@/services/room';
import { uploadImage } from '@/services/image';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UploadCloud as UploadIcon, X as RemoveIcon } from 'lucide-react';
import {
    Wifi as WifiIcon,
    Fan as AirConditioningIcon,
    Minimize2 as MiniBarIcon,
    Shield as RoomSafeIcon,
    Tv as TelevisionIcon,
    Layout as BalconyIcon,
  } from 'lucide-react';

const amenitiesWithIcons = [
  { name: 'wifi', Icon: WifiIcon },
  { name: 'air conditioning', Icon: AirConditioningIcon },
  { name: 'mini-bar', Icon: MiniBarIcon },
  { name: 'room safe', Icon: RoomSafeIcon },
  { name: 'television', Icon: TelevisionIcon },
  { name: 'balcony', Icon: BalconyIcon },
];

const roomTypes: CreateRoomFormValues['type'][] = ['single', 'double', 'suite', 'deluxe', 'presidential'];

interface Image {
  file: File;
  id: number;
  name: string;
}

export default function CreateRoom() {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const { toast } = useToast();
  const form = useForm<CreateRoomFormValues>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      hotelId: "",
      type: "single",
      price: 0,
      quantity: 1,
      amenities: [],
      description: "",
      images: [],
    }
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages = files.map((file, index) => ({
        file: file,
        id: new Date().getTime() + index,
        name: file.name 
      }));
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (id: number) => {
    setImages(images => images.filter(image => image.id !== id));
  };

  const onSubmit: SubmitHandler<CreateRoomFormValues> = async (data) => {
    try {
      // Upload images first
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const uploadResponse = await uploadImage(image.file);
          return uploadResponse.imageUrl;
        })
      );

      const roomData: CreateRoomData = {
        hotelId: data.hotelId,
        type: data.type,
        price: data.price,
        quantity: data.quantity,
        amenities: selectedAmenities,
        description: data.description,
        images: uploadedImages,
      };

      const newRoom = await createRoom(roomData);
      console.log('Room created successfully:', newRoom);

      toast({
        title: "Success",
        description: "Room created successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error creating room:', error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hotelId">Hotel ID</Label>
            <Input id="hotelId" placeholder="Enter hotel ID" {...form.register("hotelId")} />
            {form.formState.errors.hotelId && (
              <p className="text-red-500 text-sm">{form.formState.errors.hotelId.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Room Type</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{form.watch("type")}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Room Type</DropdownMenuLabel>
                {roomTypes.map(type => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={form.watch("type") === type}
                    onCheckedChange={() => form.setValue("type", type)}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {form.formState.errors.type && (
              <p className="text-red-500 text-sm">{form.formState.errors.type.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="Enter price per night" {...form.register("price", { valueAsNumber: true })} />
            {form.formState.errors.price && (
              <p className="text-red-500 text-sm">{form.formState.errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="Enter room quantity" {...form.register("quantity", { valueAsNumber: true })} />
            {form.formState.errors.quantity && (
              <p className="text-red-500 text-sm">{form.formState.errors.quantity.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Amenities</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Amenities</DropdownMenuLabel>
                {amenitiesWithIcons.map(({ name, Icon }) => (
                  <DropdownMenuCheckboxItem
                    key={name}
                    checked={selectedAmenities.includes(name)}
                    onCheckedChange={(checked) => {
                      setSelectedAmenities(prev =>
                        checked ? [...prev, name] : prev.filter(a => a !== name)
                      );
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {name}
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {form.formState.errors.amenities && (
              <p className="text-red-500 text-sm">{form.formState.errors.amenities.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the room" {...form.register("description")} />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm">{form.formState.errors.description.message}</p>
            )}
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
                  <div key={image.id} className="flex justify-between items-center p-2 m-3 bg-gray-500 rounded-md hover:bg-gray-100 text-gray-600">
                    <span className="text-sm text-gray-800">{image.name}</span>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-1 mx-2 rounded-full bg-red-500 hover:bg-red-700 text-white"
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
          <Button className="w-full" type="submit">
            Create Room
          </Button>
        </form>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Selected Amenities</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {selectedAmenities.map((amenity) => {
              const Icon = amenitiesWithIcons.find(a => a.name === amenity)?.Icon;
              return Icon ? (
                <div key={amenity} className="flex items-center gap-1 text-sm p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                  <Icon className="w-4 h-4" />
                  {amenity}
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
