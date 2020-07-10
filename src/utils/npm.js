const path = require('path');
const { exec, spawn } = require('child_process');

class NPM {
  static #path;

  static async getGlobalNodeModulesPath() {
    if (!NPM.#path) {
      NPM.#path = new Promise((resolve, reject) =>
        exec(`npm root -g`, (error, stdout, stderr) => {
          if (error) reject(stderr);
          else resolve(stdout.trim());
        })
      );
    }

    return NPM.#path;
  }

  static async getPackage(name) {
    try {
      return require(path.join(
        await NPM.getGlobalNodeModulesPath(),
        name,
        'package.json'
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
    return exec(command, {
      stdio: ['pipe', process.stdout, process.stderr]
    });
  }
}

exports.NPM = NPM;
