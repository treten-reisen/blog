import { z } from "zod"
import * as dateFns from "date-fns"

export const dateStringSchema = z
  .string()
  .refine(val => dateFns.isValid(dateFns.parseISO(val)), "Not a valid date")
  .transform(date => dateFns.parseISO(date))
