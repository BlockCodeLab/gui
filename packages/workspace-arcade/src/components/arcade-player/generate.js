const targetCode = (target, index) => `
(() => { /* ${target.name} */
counter++;
const stage = runtime.stage;
${index > 0 ? `const target = runtime.getSpriteById('${target.id}');\n` : 'const target = stage;'}
${target.script || ''}
counter--;
})();
`;

export default (targets) => `
let counter = 0;
${targets.map(targetCode).join('')}
runtime.on('frame', () => {
  if (counter === 0) runtime.stop();
});
runtime.start();
`;
