import { exec, ChildProcess } from 'child_process';
import * as latestVersion from 'latest-version';

export class NPM {
  static GLOBAL_NODE_MODULES_PATH?: Promise<string>;
  static async install(name: string, version: string): Promise<string> {
    return new Promise((resolve, reject) =>
      exec(`npm install -g ${name}@${version}`, (error, stdout, stderr) => {
        if (error) reject(stderr);
        else resolve(stdout);
      }),
    );
  }

  static async spawn(command: string): Promise<ChildProcess> {
    const spawnedProcess = exec(command);

    if (spawnedProcess.stdout) {
      spawnedProcess.stdout.pipe(process.stdout);
    }

    if (spawnedProcess.stderr) {
      spawnedProcess.stderr.pipe(process.stderr);
    }

    return spawnedProcess;
  }

  static async versionChecker(callback: NPM.VersionCheckerCallback, options: NPM.VersionCheckerOptions): Promise<void> {
    const normalizedOptions: NPM.NormalizedVersionCheckerOptions = {
      interval: 5000,
      ...options,
    };

    while (true) {
      const promises = [
        new Promise((resolve) => setTimeout(resolve, normalizedOptions.interval)),
      ];

      promises.push(Promise.resolve().then(async () => {
        const version = await latestVersion.default(normalizedOptions.name);

        if (!normalizedOptions.currentVersion || version > normalizedOptions.currentVersion) {
          await callback(version, normalizedOptions.currentVersion);

          normalizedOptions.currentVersion = version;
        }
      }));

      await Promise.all(promises);
    }
  }
}

export declare namespace NPM {
  type VersionCheckerCallback = (version: string, oldVersion?: string) => Promise<void>;

  interface VersionCheckerOptions {
    name: string;
    currentVersion?: string;
    interval?: number;
  }

  interface NormalizedVersionCheckerOptions extends VersionCheckerOptions {
    interval: number;
  }
}
