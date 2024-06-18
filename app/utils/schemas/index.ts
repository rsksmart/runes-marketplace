import { z } from 'zod'

export const formSchema = z.object({
  listing_type: z.string(),
  price: z.string().min(0, { message: 'Price is required.' }),
  token_id: z
    .string()
    .min(0, { message: 'Token is required' }),
  address: z
    .string()
    .length(42, { message: 'Address cannot exceed 42 characters.' }),
})
