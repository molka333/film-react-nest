import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('должен выводить лог в формате JSON через console.log', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const testMessage = 'Hello JSON';
    logger.log(testMessage);

    expect(consoleSpy).toHaveBeenCalled();

    const output = JSON.parse(consoleSpy.mock.calls[0][0]);

    expect(output).toHaveProperty('level', 'log');
    expect(output).toHaveProperty('message', testMessage);
    expect(output).toHaveProperty('timestamp');

    consoleSpy.mockRestore();
  });
});
