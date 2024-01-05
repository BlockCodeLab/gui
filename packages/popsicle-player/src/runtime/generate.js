const targetCode = (target, index) => `
(()=>{//${target.name}
counter++;
const stage = runtime.stage;
${index > 0 ? `const sprite = runtime.getSpriteById('${target.id}');\n` : ''}
${target.script || ''}
counter--;
})();
`;

export const generate = (targets) => `
let counter = 0;
${targets.map(targetCode).join('')}
runtime.on('frame', () => {
  if (counter === 0) runtime.stop();
});
runtime.start();
`;
