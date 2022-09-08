export function mapValues<T extends string, From, To>(
  obj: Record<T, From>,
  mapper: (from: From, index: number) => To
): Record<T, To> {
  const myObject: Partial<Record<T, To | Promise<To>>> = {}

  const keys = Object.keys(obj) as T[]
  keys.forEach(function (key, index) {
    myObject[key] = mapper(obj[key], index)
  })

  return myObject as Record<T, To>
}

export async function mapValuesAsync<T extends string, From, To>(
  obj: Record<T, From>,
  mapper: (from: From, key: T) => Promise<To>
): Promise<Record<T, To>> {
  const myObject: Partial<Record<T, To>> = {}

  const keys = Object.keys(obj) as T[]
  for (const key of keys) {
    const value = await mapper(obj[key], key)
    myObject[key] = value
  }

  return myObject as Record<T, To>
}
