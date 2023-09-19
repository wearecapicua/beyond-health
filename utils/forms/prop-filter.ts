const expectedProperties: string[] = [
  'first_name',
  'last_name',
  'gender',
  'birthdate',
  'country',
  'phone_number',
  'notice_hair_loss',
  'medications',
  'conditions',
  'questions',
  'stage',
  'product',
  'shipping_address',
  'billing_address',
  'has_health_card',
  'has_insurance'
];

export const filterFormData = <T>(obj: T): Partial<T> => {
  const filteredObject: Partial<T> = {};
  for (const prop of expectedProperties) {
    if (obj.hasOwnProperty(prop)) {
      filteredObject[prop] = obj[prop];
    }
  }
  return filteredObject;
};