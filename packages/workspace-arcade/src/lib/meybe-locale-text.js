export default function (text, getText) {
  return typeof text === 'string' ? text : getText(text.props.id, text.props.defaultMessage);
}
