export default (script = '', AIs = []) => `
runtime.on('beforeStart', () => {
  runtime.player.util.bringToFront();
});

${AIs.join('\n')}

((tank) => {
runtime.openEventsGroup('player');
${script}
runtime.closeEventsGroup();
})(runtime.player);

runtime.on('frame', () => {
  runtime.player.util.drive();
  runtime.redTank.util.drive();
  runtime.yellowTank.util.drive();
  runtime.greenTank.util.drive();
});
runtime.start();
`;
