import { search, exact } from './categoriesMap.json';

const descriptionToCategory = Object.keys(exact).reduce((acc, category) => {
  const descToCategory = exact[category].map(desc => ({ [desc]: category }));
  Object.assign(acc, ...descToCategory);
  return acc;
}, {});

export function getCategoryNameByTransactionDescription(transactionDescription) {
  const containsStr = strToSearchFor => transactionDescription.toLowerCase().includes(strToSearchFor.toLowerCase());

  if (descriptionToCategory[transactionDescription]) return descriptionToCategory[transactionDescription];

  const stringContained = Object.keys(search).find(containsStr);

  return stringContained ? search[stringContained] : '';
}
