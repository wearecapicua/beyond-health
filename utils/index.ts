// @ts-nocheck

import { FormStep } from "components/forms/steps/form-steps";
import { fieldMap } from "./field-map"

export const incrementString = (inputString: string) => {
  const parts = inputString.split('-')
  const prefix = parts[0]
  const currentNumber = parseInt(parts[1])

  if (isNaN(currentNumber)) {
    throw new Error("Invalid input string format");
  }

  const nextNumber = currentNumber + 1
  const nextString = `${prefix}-${nextNumber}`

  return nextString as FormStep
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

  return nextString as FormStep
}

export const keyedData = (data: any) => {
  let keyedDataObj = {};

  Object.keys(data).forEach((fieldName) => {
    if (fieldMap[fieldName] && data[fieldName] !== "none") {
      const fieldNumber = fieldMap[fieldName];

      if (typeof fieldNumber === "number") {
        keyedDataObj[fieldNumber] = data[fieldName];
      } else if (typeof fieldNumber === "object") {
        const subFieldMap = fieldNumber;
        let subObj = {}
      
        Object.keys(data[fieldName]).forEach((subFieldName) => {
          subObj[subFieldName] = data[fieldName][subFieldName];
        });
        if (!keyedDataObj[subFieldMap.fieldNumber]) {
          keyedDataObj[subFieldMap.fieldNumber] = subObj;
        }
      }
    }
  });
  return keyedDataObj;
};
