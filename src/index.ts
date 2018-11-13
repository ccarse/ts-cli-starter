import chalk from 'chalk';

import { logExec } from './utils/log-exec';

(async () => {
  try {
    await logExec('git status');
  } catch (error) {
    console.log(chalk.bgRed(`Error: ${error}`));
  }
})();
