import { useEffect, useState } from 'preact/hooks';
import { useLocale } from '@blockcode/core';
import { Library } from '@blockcode/ui';
import allBackdrops from './backdrops.yaml';

export default function BackdropsLibrary({ onSelect, onClose }) {
  const [data, setData] = useState([]);
  const { getText } = useLocale();

  const setSelectHandler = (backdrop) => () => {
    onSelect(backdrop);
    onClose();
  };

  useEffect(() => {
    setData(
      allBackdrops.map((backdrop) => ({
        name: backdrop.name,
        image: `./assets/${backdrop.id}.png`,
        onSelect: setSelectHandler(backdrop),
      })),
    );
  }, []);

  return (
    <Library
      items={data}
      title={getText('arcade.libraries.backdrop', 'Choose a Backdrop')}
      emptyText={getText('arcade.libraries.empty', 'No more!')}
      onClose={onClose}
    />
  );
}

BackdropsLibrary.surprise = () => allBackdrops[Math.floor(Math.random() * allBackdrops.length)];
