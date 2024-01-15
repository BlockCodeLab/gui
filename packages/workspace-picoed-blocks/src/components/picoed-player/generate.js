export default (script = '') => `
(()=>{
${script}
})();

runtime.start();
`;
