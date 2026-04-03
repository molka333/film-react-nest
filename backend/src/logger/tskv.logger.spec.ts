import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('должен выводить лог в формате TSKV через process.stdout', () => {
    const stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);

    const testMessage = 'Hello TSKV';
    logger.log(testMessage);

    expect(stdoutSpy).toHaveBeenCalled();

    const output = stdoutSpy.mock.calls[0][0] as string;

    expect(output).toContain('level=info');
    expect(output).toContain(`msg=${testMessage}`);
    expect(output).toContain('\t');
    expect(output).toMatch(/^time=/);

    stdoutSpy.mockRestore();
  });
});
