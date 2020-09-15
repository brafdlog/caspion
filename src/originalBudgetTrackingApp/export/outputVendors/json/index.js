export const displayName = 'Json';
export const description = 'Create a new Json file with the transactions, or merge them into existing file';

export const fields = {
  filename: {
    label: 'Output File',
    type: 'text',
    // value -> true | error message
    rules: [
      (value) => (value && value.length > 0) || 'You have to set path to filename',
    ]
  }
};

export const output = async (transactions, config) => {
  // eslint-disable-next-line no-console
  console.log(transactions, config);
};
