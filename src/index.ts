import { ChildProcess } from 'child_process';
import { NPM } from './utils/npm';

export function autoUpdate(options: Options) {
  const instances: ChildProcess[] = [];

  console.log(`Checking for updates...`);

  NPM.versionChecker(async (version) => {
    console.log(`Updating to ${options.name}@${version}...`);

    console.log(await NPM.install(options.name, version));

    console.log(`Successfully Updated!`);

    console.log(`Starting up new version...`);
    instances.push(await NPM.spawn(options.command));

    if (instances.length === 2) {
      console.log('Destroying old version...');
      const instance = instances.shift();

      if (instance) {
        instance.kill();
      }
    }

    console.log(`${options.name}@${version} has started up successfully!`);
  }, {
    name: options.name,
    interval: options.interval,
  });
}

export interface Options {
  name: string;
  interval: number;
  command: string;
}
