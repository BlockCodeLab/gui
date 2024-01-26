export const simple = (color, id) => `
((tank) => {
  runtime.openEventsGroup('${color}_${id}');

  let _angle_ = 0;

  runtime.on('start', async () => {
    if ((tank.util.y > '0')) {
      await tank.util.move(180, 100);
      while (!((tank.util.y < '10'))) {
        if (!runtime.running) return;
        await runtime.nextFrame();
      }
      tank.util.speed = 0;
    }
    else {
      await tank.util.move(0, 100);
      while (!((tank.util.y > '-10'))) {
        if (!runtime.running) return;
        await runtime.nextFrame();
      }
      tank.util.speed = 0;
    }
    runtime.broadcast('@ai_simple_${color}_${id}_start');
    if ((tank.util.x > '0')) {
      await tank.util.move(270, 70);
      while (!((tank.util.x < '-400'))) {
        if (!runtime.running) return;
        await runtime.nextFrame();
      }
    }
    while (true) {
      tank.util.speed = 0;
      await tank.util.move(90, 70);
      while (!((tank.util.x > '400'))) {
        if (!runtime.running) return;
        await runtime.nextFrame();
      }
      tank.util.speed = 0;
      await tank.util.move(270, 70);
      while (!((tank.util.x < '-400'))) {
        if (!runtime.running) return;
        await runtime.nextFrame();
      }
      if (!runtime.running) return;
      await runtime.nextFrame();
    }
  });

  runtime.on('@ai_simple_${color}_${id}_start', async (done) => {
    while (true) {
      while (!((await tank.util.scan(_angle_) < '400') && (await tank.util.scan(_angle_) > '100'))) {
        _angle_ = (isNaN(_angle_) ? 0 : +_angle_) + +(90);
        if (!runtime.running) return;
        await runtime.nextFrame();
      }
      tank.util.speed = 0;
      await tank.util.attack((_angle_ + 1), (await tank.util.scan(_angle_)));
      tank.util.speed = 50;
      if (!runtime.running) return;
      await runtime.nextFrame();
    }
    done()
  });

  runtime.closeEventsGroup();
})(runtime.${color}Tank);
`;

export const medium = (color, id) => `
((tank) => {
  runtime.openEventsGroup('${color}_${id}');

  let _health_ = 0;
  let _angle_ = 0;
  
  runtime.on('start', async function anonymous() {
    _angle_ = runtime.random(1, 360);
    runtime.broadcast('@ai_medium_${color}_${id}_start')
  });
  
  runtime.on('start', async function anonymous() {
    while (true) {
      _health_ = tank.util.health;
      while (!((tank.util.health < _health_))) {
        if (anonymous.aborted) return;
        await runtime.nextFrame();
      }
      runtime.abort(anonymous.id);
      tank.util.move(runtime.random(1, 360), 100);
      await runtime.sleep(1);
      tank.util.speed = 0;
      runtime.broadcast('@ai_medium_${color}_${id}_start')
      if (anonymous.aborted) return;
      await runtime.nextFrame();
    }
  });
  
  runtime.on('@ai_medium_${color}_${id}_start', async function anonymous(done) {
    while (true) {
      while (!((await tank.util.scan(_angle_) !== Infinity))) {
        _angle_ = (isNaN(_angle_) ? 0 : +_angle_) + +(10);
        if (anonymous.aborted) return;
        await runtime.nextFrame();
      }
      while (((await tank.util.scan(_angle_) !== Infinity) && ((await tank.util.scan(_angle_)) > '400'))) {
        tank.util.move(_angle_, 100);
        if (anonymous.aborted) return;
        await runtime.nextFrame();
      }
      tank.util.speed = 0;
      if (((await tank.util.scan(_angle_)) < '400') && ((await tank.util.scan(_angle_)) > '100')) {
        await tank.util.attack((_angle_ + 1), (await tank.util.scan(_angle_)));
      }
      _angle_ = (isNaN(_angle_) ? 0 : +_angle_) + +(-10);
      if (anonymous.aborted) return;
      await runtime.nextFrame();
    }
    done()
  });
  
  runtime.closeEventsGroup();
})(runtime.${color}Tank);
`;

export const senior = (color, id) => `
((tank) => {
  runtime.openEventsGroup('${color}_${id}');

  let _angle_ = 0;
  let _health_ = 0;
  
  
  runtime.on('start', async function anonymous() {
    if (((tank.util.y < '5') && (tank.util.y > '-5'))) {
      await tank.util.turnLeft(104);
    }
    else {
      await tank.util.turnLeft(180);
    }
    tank.util.speed = 100;
    while (!(((Math.abs(tank.util.x) > '400') && (Math.abs(tank.util.y) > '400')))) {
      if (anonymous.aborted) return;
      await runtime.nextFrame();
    }
    tank.util.speed = 0;
    runtime.broadcast('@ai_senior_${color}_${id}_start')
  });
  
  runtime.on('@ai_senior_${color}_${id}_start', async function anonymous(done) {
    if ((tank.util.x < '0')) {
      if ((tank.util.y < '0')) {
        _angle_ = '45';
      }
      else {
        _angle_ = '135';
      }
    }
    else {
      if ((tank.util.y < '0')) {
        _angle_ = '-45';
      }
      else {
        _angle_ = '-135';
      }
    }
    await tank.util.setDirection(_angle_);
    runtime.broadcast('@ai_senior_${color}_${id}_watch_health');
    _angle_ = (isNaN(_angle_) ? 0 : +_angle_) + +(-60);
    for (let _ = 0; _ < 78; _++) {
      if (((await tank.util.scan(_angle_)) < '400') && ((await tank.util.scan(_angle_)) > '100')) {
        await tank.util.attack((_angle_ + 1), (await tank.util.scan(_angle_)));
        _angle_ = (isNaN(_angle_) ? 0 : +_angle_) + +(-10);
      }
      _angle_ = (isNaN(_angle_) ? 0 : +_angle_) + +(10);
      if (anonymous.aborted) return;
      await runtime.nextFrame();
    }
    runtime.broadcast('@ai_senior_${color}_${id}_next_place');
    done();
  });
  
  runtime.on('@ai_senior_${color}_${id}_next_place', async function anonymous(done) {
    runtime.abort(anonymous.id);
    if ((runtime.random(1, 3) == '1')) {
      await tank.util.turnLeft(45);
    }
    else {
      await tank.util.turnRight(45);
    }
    tank.util.speed = 100;
    await runtime.sleep(1);
    if (((tank.util.direction > '-5') && (tank.util.direction < '5'))) {
      while (!((tank.util.y > '400'))) {
        if (anonymous.aborted) return;
        await runtime.nextFrame();
      }
    }
    else {
      if (((tank.util.direction > '85') && (tank.util.direction < '95'))) {
        while (!((tank.util.x > '400'))) {
          if (anonymous.aborted) return;
          await runtime.nextFrame();
        }
      }
      else {
        if (((tank.util.direction > '-95') && (tank.util.direction < '-85'))) {
          while (!((tank.util.x < '-400'))) {
            if (anonymous.aborted) return;
            await runtime.nextFrame();
          }
        }
        else {
          while (!((tank.util.y < '-400'))) {
            if (anonymous.aborted) return;
            await runtime.nextFrame();
          }
        }
      }
    }
    tank.util.speed = 0;
    runtime.broadcast('@ai_senior_${color}_${id}_start')
    done()
  });
  
  runtime.on('@ai_senior_${color}_${id}_watch_health', async function anonymous(done) {
    _health_ = tank.util.health;
    while (!((tank.util.health < _health_))) {
      if (anonymous.aborted) return;
      await runtime.nextFrame();
    }
    runtime.broadcast('@ai_senior_${color}_${id}_next_place')
    done()
  });
  
  runtime.closeEventsGroup();
})(runtime.${color}Tank);
`;
