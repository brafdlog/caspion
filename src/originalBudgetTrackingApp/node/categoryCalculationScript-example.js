const INTERNET = 'Internet';
const ELECTRICITY = 'Electric';

function getCategoryNameByTransactionDescription(transactionDescription) {
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

  function containsStr(strToSearchFor) {
    return transactionDescription.toLowerCase().indexOf(strToSearchFor.toLowerCase()) !== -1;
  }
}

module.exports = {
  getCategoryNameByTransactionDescription
};
