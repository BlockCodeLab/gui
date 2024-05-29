import { Terminal } from 'xterm';
import { WebglAddon } from 'xterm-addon-webgl';
import { FitAddon } from 'xterm-addon-fit';
import defaultTheme from './defing-theme';

import 'xterm/css/xterm.css';

const isMac = /Mac/i.test(navigator.platform || navigator.userAgent);
const isWin = /Win/i.test(navigator.platform || navigator.userAgent);

export default function createTerminal(ref) {
  const term = new Terminal({
    convertEol: true,
    cursorBlink: true,
    cursorInactiveStyle: 'none',
    fontFamily: '"Cascadia Code", Menlo, monospace',
    fontSize: 12,
    lineHeight: 1.2,
    windowsMode: isWin,
    macOptionIsMeta: isMac,
    macOptionClickForcesSelection: isMac,
    theme: defaultTheme,
  });
  term.open(ref);
  ref.style.background = defaultTheme.background;

  /* load addons */

  const webglAddon = new WebglAddon();
  term.loadAddon(webglAddon);
  webglAddon.onContextLoss(() => webglAddon.dispose());

  const fitAddon = new FitAddon();
  term.fit = () => fitAddon.fit();
  term.loadAddon(fitAddon);
  term.onWriteParsed(() => term.fit());
  term.element.addEventListener('focusin', () => term.fit());
  window.addEventListener('resize', () => term.fit());

  return term;
}
