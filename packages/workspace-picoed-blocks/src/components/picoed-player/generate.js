export default (script = '') => `
let counter = 0;

(()=>{
counter++;
${script}
counter--;
})();
  
runtime.on('frame', () => {
  if (counter === 0) runtime.stop();
});
runtime.start();
`;
