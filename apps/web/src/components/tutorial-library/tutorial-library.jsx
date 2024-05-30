import { useLayout, useLocale } from '@blockcode/core';
import { Library } from '@blockcode/ui';

export default function TutorialLibrary({ onOpenTutorial, onClose }) {
  const { getText } = useLocale();
  const { tutorials } = useLayout();

  const data = Object.entries(tutorials.lessons).map(([id, lesson]) => ({
    featured: true,
    title: lesson.title,
    image: lesson.image,
    onSelect: () => onOpenTutorial(id),
  }));

  const defaultTitle =
    tutorials.type === 'course'
      ? getText('gui.tutorialLibrary.course', 'Choose a course')
      : getText('gui.tutorialLibrary.tutorial', 'Choose a tutorial');

  return (
    <Library
      items={data}
      title={tutorials.title || defaultTitle}
      onClose={onClose}
    />
  );
}
