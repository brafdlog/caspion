export const displayName = 'Json';
export const description = 'Create a new Json file with the transactions, or merge them into existing file';

export const fields = {
  filename: {
    displayName: 'Path to file',
    type: 'string',
    requierd: true,
    validation: (value) => value && value.length > 0
  }
};

export const convertFieldsToConfig = (fieldsWithValues) => fieldsWithValues;

export const output = async (transactions, config) => {
  console.log(transactions, config);
};
