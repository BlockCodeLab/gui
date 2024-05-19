const targetCode = (target, index) => `/* ${target.name} */
(() => {
let abort = false;
const stage = runtime.stage;
${index > 0 ? `const target = runtime.getSpriteByIdOrName('${target.id}');` : 'const target = stage;'}
${target.script || ''}
})();
`;

export default (targets) => `
${targets.map(targetCode).join('\n')}
runtime.start();
`;
