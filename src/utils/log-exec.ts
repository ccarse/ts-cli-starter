import chalk from 'chalk';

import execp, { IOptions } from './exec-promise';

export const logExec = async (cmd: string, opts: IOptions = {}) => {
  console.log(chalk.black.bgWhite(`${cmd}\n`));
  console.log(await execp(cmd, opts));
};
