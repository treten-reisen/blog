import z, {ZodError, ZodSchema} from "zod"

export const parseResponse = async <T extends ZodSchema>(response: Response, schema: T): Promise<z.infer<T>> => {
  const data = await response.json().catch(() => {
    console.log(`Error parsing response from ${response.url}`)
  })

  try {
    return await schema.parseAsync(data)
  } catch (error) {
    console.log(`Error parsing response from ${response.url}:`)
    console.log(JSON.stringify(data, undefined, 2))
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error.issues, undefined, 2))
    }
    throw error
  }
}
