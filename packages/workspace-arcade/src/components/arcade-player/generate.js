const targetCode = (target, index) => `
(() => { /* ${target.name} */
counter++;
let abort = false;
const stage = runtime.stage;
${index > 0 ? `const target = runtime.getSpriteByIdOrName('${target.id}');\n` : 'const target = stage;'}
${target.script || ''}
counter--;
})();
`;

export default (targets) => `
let counter = 0;
${targets.map(targetCode).join('')}
runtime.on('frame', () => counter === 0 && runtime.stop());
runtime.start();
`;
