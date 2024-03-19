
import { z } from "zod";

export type CreateLeadFormData = z.infer<typeof createTouristFormSchema>;

export const createTouristFormSchema = z.object({
  email: z.string().toLowerCase(),
  name: z.string().min(1,"Este campo no puede estar vacío").transform(
    name => {
      return name.trim().split(' ').map(word => {
        return word[0].toUpperCase().concat(word.substring(1));
      }).join(' ')
    }
  ),
  lastname: z.string().min(1,"Este campo no puede estar vacío").transform(
    name => {
      return name.trim().split(' ').map(word => {
        return word[0].toUpperCase().concat(word.substring(1));
      }).join(' ')
    }
  ),
  phone: z.string(),
  location: z.string().min(1, "Este campo no puede estar vacío"),
});