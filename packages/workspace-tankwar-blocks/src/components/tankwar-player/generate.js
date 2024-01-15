export default (script = '') => `
const SPEED_RATIO= 20;

runtime.on('beforeStart', () => {
  runtime.player.util.reset();
  runtime.redTank.util.reset();
  runtime.yellowTank.util.reset();
  runtime.greenTank.util.reset();
});

((tank)=>{
${script}
})(runtime.player);
  
const drive = (tank) => {
  if (tank.util.speed === 0) return;
  if (tank.visible || tank.util.health > 0) {
    const radian = ((90 - tank.rotation) * Math.PI) / 180;
    const dx = tank.util.speed / SPEED_RATIO * Math.cos(radian);
    const dy = tank.util.speed / SPEED_RATIO * Math.sin(radian);
    tank.util.x += dx;
    tank.util.y -= dy;
  }
}
runtime.on('frame', () => {
  if (runtime.player.util.death + runtime.redTank.util.death + runtime.yellowTank.util.death + runtime.greenTank.util.death === 1) {
    runtime.stop();
  }
  drive(runtime.player);
  drive(runtime.redTank);
  drive(runtime.yellowTank);
  drive(runtime.greenTank);
});
runtime.start();
`;
