const path = require('path');
const { exec } = require('child_process');

let GLOBAL_NODE_MODULES_PATH;

class NPM {
  static async getGlobalNodeModulesPath() {
    if (!GLOBAL_NODE_MODULES_PATH) {
      GLOBAL_NODE_MODULES_PATH = new Promise((resolve, reject) =>
        exec(`npm root -g`, (error, stdout, stderr) => {
          if (error) reject(stderr);
          else resolve(stdout.trim());
        }),
      );
    }

    return GLOBAL_NODE_MODULES_PATH;
  }

  static async getPackage(name) {
    try {
      return require(path.join(
        await NPM.getGlobalNodeModulesPath(),
        name,
        'package.json',
      ));
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        return null;
      }

      throw error;
    }
  }

  static async install(name, version) {
    return new Promise((resolve, reject) =>
      exec(`npm install -g ${name}@${version}`, (error, stdout, stderr) => {
        if (error) reject(stderr);
        else resolve(stdout);
      }),
    );
  }

  static async spawn(command) {
    const spawnedProcess = exec(command);

    spawnedProcess.stdout.pipe(process.stdout);
    spawnedProcess.stderr.pipe(process.stderr);

    return spawnedProcess;
  }
}

exports.NPM = NPM;
