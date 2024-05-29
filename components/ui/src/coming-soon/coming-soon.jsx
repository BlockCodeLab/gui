import classNames from 'classnames';
import { Text } from '@blockcode/core';
import { Tooltip } from '../tooltip/tooltip';

import styles from './coming-soon.module.css';

export function ComingSoon({ className, placement, offset, children }) {
  return (
    <Tooltip
      className={classNames(styles.comingSoon, className)}
      content={
        <Text
          id="gui.comingSoon"
          defaultMessage="Coming Soon!"
        />
      }
      offset={offset}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
}
