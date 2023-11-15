import classNames from 'classnames';
import { useRef, useEffect } from 'preact/hooks';
import { useEdit } from '@blockcode/core';
import createTerminal from './create-terminal';

import styles from './terminal-view.module.css';

const ResizeObserver = globalThis.ResizeObserver;

export default function TerminalView({ className }) {
  const ref = useRef(null);
  const { device } = useEdit();

  if (ref.term) {
    if (device) {
      ref.term.disabled = false;
      if (device.serial.listenerCount('data') === 0) {
        device.serial.on('data', (data) => ref.term.write(data));
        ref.term.onData((data) => device.writeAndReadUntil(data));
        ref.term.clear();
      }
    } else {
      ref.term.disabled = true;
      ref.term._core._onData.clearListeners();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.term = createTerminal(ref.current);
      ref.term.disabled = true;
      ref.term.element.addEventListener('focusin', () => {
        if (ref.term.disabled) {
          ref.term.blur();
        }
      });
      ref.resizeObserver = new ResizeObserver(() => ref.term.fit(true));
      ref.resizeObserver.observe(ref.current);
    }
    return () => {
      if (ref.term) {
        ref.resizeObserver.unobserve(ref.current);
        ref.term.dispose();
        ref.term = null;
      }
    };
  }, [ref]);

  return (
    <div
      className={classNames(styles.terminalWrapper, className)}
      ref={ref}
    ></div>
  );
}
