export default function (stage, sprites) {
  return [].concat(stage, sprites, {
    id: 'main',
    type: 'text/x-python',
    content: []
      .concat(
        'from popsicle.scratch import *',
        `from ${stage.id} import stage`,
        sprites.toSorted((a, b) => a.zIndex - b.zIndex).map(({ id }) => `import ${id}`),
        'run(stage.render)',
      )
      .join('\n'),
  });
}
