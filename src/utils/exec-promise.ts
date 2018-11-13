import * as childProcess from 'child_process';
import * as stream from 'stream';

// otherwise we get a stupid warning.
process.stdout.setMaxListeners(100);
process.stderr.setMaxListeners(100);

export interface IOptions {
  stdout?: stream.Writable;
  stderr?: stream.Writable;
  killOnExit?: boolean;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
}

function execp(cmd: string, opts: IOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {

    const child = childProcess.exec(cmd, opts,
      (err, stdout, stderr) => {
        err ? reject(err) : resolve(stdout);
      });

    if (opts.stdout) {
      child.stdout.pipe(opts.stdout);
    }
    if (opts.stderr) {
      child.stderr.pipe(opts.stderr);
    }

    // Kill child on exit
    const killChild = () => child.kill();
    process.setMaxListeners(20);
    process.on('exit', killChild);
    child.on('exit', () => process.removeListener('exit', killChild));
  });
}

export default execp;
