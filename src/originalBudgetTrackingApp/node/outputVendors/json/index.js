export const name = 'json';
export const description = 'Create a new Json file with the transactions, or merge them into existing file';

export const fields = {
  filename: {
    type: 'string',
    requierd: true,
    validation: (value) => value && value.length > 0
  }
};

export const convertFieldsToConfig = (fieldsWithValues) => fieldsWithValues;

export const output = async (transactions, config) => {
  console.log(transactions, config);
};
