import textField from './TextField';
import fileField from './FileField';

const typeToComponent = {
  text: textField,
  file: fileField,
};

export default {
  functional: true,
  // TODO https://github.com/brafdlog/budget-tracking/pull/59/files#r455156991
  // Do we want to inject all props from 'outputVendors' (by passing context.data),
  // or we want to sanitize and select specific properties?
  render: (h, context) => h(typeToComponent[context.props.type], context.data),
};
