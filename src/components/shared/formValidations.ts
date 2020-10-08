export function required(value) {
  return !!value || 'Required.';
}

export function positive(value: number) {
  return value > 0 || 'Must be grater than 0';
}
