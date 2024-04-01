export default function maybeTranslateMessage(options, getText) {
  if (typeof options === 'string') {
    return options;
  }
  if (options.props.children) {
    return options.props.children.map((child) => maybeTranslateMessage(child, getText)).join(' ');
  }
  return getText(options.props.id, options.props);
}
