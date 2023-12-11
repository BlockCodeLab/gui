import { importWebpackExport } from './macros/import-webpack-export' with { type: 'macro' };

const module = {};
const code = importWebpackExport('scratch-blocks/dist/vertical');
new Function('module', code)(module);
export default module.exports;