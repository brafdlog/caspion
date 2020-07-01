export const displayName = 'Json';
export const description = 'Create a new Json file with the transactions, or merge them into existing file';

// TODO: need to think about default object
export const fields = {
  filename: {
    label: 'Output File',
    type: 'text',
    // TODO requierd applied by 'rules'?
    // requierd: true,
    // value -> true | error message
    rules: [
      (value) => (value && value.length > 0) || 'You have to set path to filename',
    ]
  }
};

export const convertFieldsToConfig = (fieldsWithValues) => fieldsWithValues;

export const output = async (transactions, config) => {
  console.log(transactions, config);
};
