import z, { ZodError, ZodTypeAny } from "zod"

export const parseResponse = async <T extends ZodTypeAny>(response: Response, schema: T): Promise<z.infer<T>> => {
  const data = await response.json()
  try {
    return schema.parseAsync(data)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error.issues, undefined, 2))
    }
    throw error
  }
}
