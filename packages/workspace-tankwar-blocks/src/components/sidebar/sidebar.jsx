import { useState } from 'preact/hooks';

import Stage from '../stage/stage';
import StageInfo from '../stage-info/stage-info';

import styles from './sidebar.module.css';

export default function Sidebar() {
  const [enemies, setEnemies] = useState(1);
  const [enemiesAI, setEnemiesAI] = useState({
    red: 'simple',
    yellow: 'medium',
    green: 'senior',
  });
  const [health, setHealth] = useState({
    player: 100,
    red: 100,
    yellow: 100,
    green: 100,
  });

  const handleStageSizeToggle = (size) => setStageSize(size);

  return (
    <div className={styles.sidebarWrapper}>
      <Stage
        className={styles.stageWrapper}
        enemies={enemies}
        enemiesAI={enemiesAI}
        health={health}
        onSizeToggle={handleStageSizeToggle}
      />
      <StageInfo
        enemies={enemies}
        enemiesAI={enemiesAI}
        health={health}
        onChangeEnemies={setEnemies}
        onChangeEnemyAI={(tank, ai) =>
          setEnemiesAI({
            ...enemiesAI,
            [tank]: ai,
          })
        }
        onChangeHealth={(tank, ai) =>
          setHealth({
            ...health,
            [tank]: ai,
          })
        }
      />
    </div>
  );
}
