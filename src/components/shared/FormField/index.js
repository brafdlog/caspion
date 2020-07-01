import textField from './TextField';
import fileField from './FileField';

const typeToComponent = {
  text: textField,
  file: fileField,
};

export default {
  functional: true,
  // TODO do we want to inject all props from 'outputVendors' (by passing context.data),
  // or we want to sanitize and select specific properties?
  render: (h, context) => h(typeToComponent[context.props.type], context.data),
};
