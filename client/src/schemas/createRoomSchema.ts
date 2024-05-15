import { z } from 'zod';

export const createRoomSchema = z.object({
  hotelId: z.string().nonempty("Hotel ID is required"),
  type: z.enum(['single', 'double', 'suite', 'deluxe', 'presidential']),
  price: z.number().min(0, "Price must be at least 0"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  amenities: z.array(z.enum(['wifi', 'air conditioning', 'mini-bar', 'room safe', 'television', 'balcony'])),
  description: z.string().nonempty("Description is required"),
  images: z.array(z.string()),
});

export type CreateRoomFormValues = z.infer<typeof createRoomSchema>;
