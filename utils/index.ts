export const incrementString = (inputString: string) => {
  const parts = inputString.split('-')
  const prefix = parts[0]
  const currentNumber = parseInt(parts[1])

  if (isNaN(currentNumber)) {
    throw new Error("Invalid input string format");
  }

  const nextNumber = currentNumber + 1
  const nextString = `${prefix}-${nextNumber}`

  return nextString
}

export const decrementString = (inputString: string) => {
  const parts = inputString.split('-')
  const prefix = parts[0]
  const currentNumber = parseInt(parts[1])

  if (isNaN(currentNumber)) {
    throw new Error("Invalid input string format");
  }

  const nextNumber = currentNumber - 1
  const nextString = `${prefix}-${nextNumber}`

  return nextString
}