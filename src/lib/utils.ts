export async function wrapPromise<T>(promise: Promise<T>): Promise<[T | null, any]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}
