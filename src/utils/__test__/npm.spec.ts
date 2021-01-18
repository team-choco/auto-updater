import { exec, ExecException } from 'child_process';
import { chance } from '../../__test__/chance';
import { NPM } from '../npm';

jest.mock('child_process');

describe('class(NPM)', () => {
  describe('func(install)', () => {
    afterEach(() => {
      delete NPM.GLOBAL_NODE_MODULES_PATH;
    });

    it('should install a package', async () => {
      const expectedName = chance.string();
      const expectedVersion = chance.string();
      const expectedPath = chance.string();

      (exec as any).mockImplementation((command: string, callback: (error: (null|ExecException), stderr: string, stdout: string) => void) => {
        expect(command).toEqual(`npm install -g ${expectedName}@${expectedVersion}`);
        callback(null, expectedPath, '');
      });

      await expect(NPM.install(expectedName, expectedVersion)).resolves.toEqual(expectedPath);
    });

    it('should support failing to install', async () => {
      const expectedName = chance.string();
      const expectedVersion = chance.string();
      const expectedError = chance.string();

      (exec as any).mockImplementation((command: string, callback: (error: (null|ExecException), stderr: string, stdout: string) => void) => {
        expect(command).toEqual(`npm install -g ${expectedName}@${expectedVersion}`);
        callback(chance.string() as any, '', expectedError);
      });

      await expect(NPM.install(expectedName, expectedVersion)).rejects.toEqual(expectedError);
    });
  });
});
