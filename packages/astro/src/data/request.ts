import z, { ZodError, ZodTypeAny } from "zod"

export const parseResponse = async <T extends ZodTypeAny>(response: Response, schema: T): Promise<z.infer<T>> => {
  const data = await response.json()

  try {
    const parsedSchema = await schema.parseAsync(data)
    return parsedSchema
  } catch (error) {
    console.log("Error parsing the object:")
    console.log(JSON.stringify(data, undefined, 2))
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error.issues, undefined, 2))
    }
    throw error
  }
}
