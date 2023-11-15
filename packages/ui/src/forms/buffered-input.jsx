/* inspired by scratch-gui */
import { useState } from 'preact/hooks';
import { Input } from './input';

export function BufferedInput({ value, onSubmit, ...props }) {
  const [bufferedValue, setBufferedValue] = useState(null);

  const handleFlush = () => {
    const isNumeric = typeof value === 'number';
    const validatesNumeric = isNumeric ? !isNaN(bufferedValue) : true;
    if (bufferedValue !== null && validatesNumeric) {
      onSubmit(isNumeric ? Number(bufferedValue) : bufferedValue);
    }
    setBufferedValue(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFlush();
      e.target.blur();
    }
  };

  const handleChange = (e) => {
    setBufferedValue(e.target.value);
  };

  return (
    <Input
      {...props}
      value={bufferedValue === null ? value : bufferedValue}
      onBlur={handleFlush}
      onChange={handleChange}
      onInput={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}
