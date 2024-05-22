export default function maybeLocaleText(getText, options) {
  if (!options || !options.props) {
    return options;
  }
  if (options.props.children) {
    return options.props.children.map((child) => maybeLocaleText(getText, child)).join(' ');
  }
  return getText(options.props.id, options.props);
}
