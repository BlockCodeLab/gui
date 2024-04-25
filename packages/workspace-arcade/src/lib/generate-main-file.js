export default function (stage, sprites) {
  return [].concat(
    stage,
    sprites.map((sprite) => ({
      ...sprite,
      id: sprite.id.includes('sprite') ? sprite.id : `sprite${sprite.id}`,
    })),
    {
      id: 'main',
      type: 'text/x-python',
      content: []
        .concat(
          'from scratch import *',
          `from ${stage.id} import stage`,
          sprites
            .toSorted((a, b) => a.zIndex - b.zIndex)
            .map(({ id }) => `import ${id.includes('sprite') ? id : `sprite${id}`}`),
          'green_flag(stage)',
        )
        .join('\n'),
    },
  );
}
