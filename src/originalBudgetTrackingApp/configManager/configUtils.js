export const getDefaultValues = (vendor) => Object.keys(vendor.fields).reduce((defaultValues, key) => {
  const { defaultValue } = vendor.fields[key];
  defaultValues[key] = defaultValue === undefined ? null : defaultValue;
  return defaultValues;
}, {});
