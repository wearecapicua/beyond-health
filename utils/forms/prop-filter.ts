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
  'has_insurance',
  'form_step',
  'stripe_customer_id'
];

export const filterFormData = <T>(obj: T): Partial<T> => {
  const filteredObject: Partial<T> = {};
  for (const prop of expectedProperties) {
    // Use a type assertion to inform TypeScript that obj is of type Record<string, unknown>
    if ((obj as Record<string, unknown>).hasOwnProperty(prop)) {
      /* @ts-ignore */
      filteredObject[prop as keyof T] = obj[prop];
    }
  }
  return filteredObject;
};
