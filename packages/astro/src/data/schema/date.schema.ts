import * as dateFns from "date-fns"
import { z } from "zod"

export const dateStringSchema = z
  .string()
  .refine(val => dateFns.isValid(dateFns.parseISO(val)), "Not a valid date")
  .transform(date => dateFns.parseISO(date))
