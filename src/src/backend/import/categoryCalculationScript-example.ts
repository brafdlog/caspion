const INTERNET = 'Internet';
const ELECTRICITY = 'Electric';

export function getCategoryNameByTransactionDescription(transactionDescription: string): string {
  if (containsStr('אינטרנט')) return INTERNET;

  switch (transactionDescription) {
    case 'בזק בינלאומי בע"מ':
      return INTERNET;
    case 'חשמל בהוראת קבע דרום':
      return ELECTRICITY;
    case 'חברת החשמל לישראל בע"מ':
      return ELECTRICITY;
    default:
      return '';
  }

  function containsStr(strToSearchFor: string) {
    return transactionDescription.toLowerCase().indexOf(strToSearchFor.toLowerCase()) !== -1;
  }
}
