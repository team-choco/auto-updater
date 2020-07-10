const { spawn } = require('child_process');
const latestVersion = require('latest-version');

const { NPM } = require('./utils/npm');

exports.autoUpdate = async (name, command) => {
  console.log(`Checking for updates...`);
  let currentVersion = null;
  const instances = [];

  while (true) {
    const version = await latestVersion(name);

    if (!currentVersion || version > currentVersion) {
      console.log(`Updating to ${name}@${version}...`);

      console.log(await NPM.install(name, version));

      console.log(`Successfully Updated!`);

      console.log(`Starting up new version...`);
      instances.push(await NPM.spawn(command));

      if (instances.length === 2) {
        console.log('Destroying old version...');
        const instance = instances.shift();
        instance.kill();
      }

      console.log(`${name}@${version} has started up successfully!`);
      currentVersion = version;
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
