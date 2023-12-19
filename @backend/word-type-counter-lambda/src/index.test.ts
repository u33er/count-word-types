import { APIGatewayEvent } from 'aws-lambda';
import { handler, countWordTypes } from './index';

describe('handler', () => {
  it('should handle APIGatewayEvent and return a valid response', async () => {
    const event: APIGatewayEvent = {
      body: "{ \"text\": \"eat sleep and cat\" }",
    } as APIGatewayEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeDefined();
    const parsedBody = JSON.parse(result.body);
    expect(parsedBody.wordTypeCounts).toBeDefined();
    expect(parsedBody.wordTypeCounts).toStrictEqual({
      noun: 1,
      verb: 2,
      conjunction: 1,
    })
  });

  it('should handle errors and return a 500 status code', async () => {
    const event: APIGatewayEvent = {
      body: '',
    } as APIGatewayEvent;

    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(result.body).toBeDefined();
    const parsedBody = JSON.parse(result.body);
    expect(parsedBody.error).toBe('Internal Server Error');
  });
});

describe('countWordTypes', () => {
  it('should count word types correctly', () => {
    const text = 'cat run and sleep';
    const wordTypeCounts = countWordTypes(text);

    expect(wordTypeCounts).toEqual({
      noun: 1,
      verb: 2,
      conjunction: 1,
    });
  });

  it('should not count types of comma separated words', () => {
    const text = 'cat, run, and sleep';
    const wordTypeCounts = countWordTypes(text);

    expect(wordTypeCounts).toEqual({
      verb: 1,
      conjunction: 1,
    });
  });
});
