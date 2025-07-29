const generateResponse = require('../creates/generate_response');

describe('generate_response create action (integration)', () => {
  const z = {};
  const api_key = process.env.IRONAAI_API_KEY;

  if (!api_key) {
    console.warn('IRONAAI_API_KEY not set, skipping integration test.');
    return;
  }

  test('should generate a real response with user_input only', async () => {
    const bundle = {
      authData: { api_key },
      inputData: { user_input: 'Tell a joke.' }
    };
    const result = await generateResponse.operation.perform(z, bundle);
    expect(result[0]).toHaveProperty('result');
    expect(result[0].result).toHaveProperty('response');
    expect(result[0].result.response).toHaveProperty('content');
    expect(typeof result[0].result.response.content).toBe('string');
    // Optionally, print the result for manual inspection
    console.log('Real response:', result[0].result.response.content);
  });

  test('should generate a real response with system_prompt and user_input', async () => {
    const bundle = {
      authData: { api_key },
      inputData: { system_prompt: 'You are a helpful assistant.', user_input: 'tell me a joke' }
    };
    const result = await generateResponse.operation.perform(z, bundle);
    expect(result[0]).toHaveProperty('result');
    expect(result[0].result).toHaveProperty('response');
    expect(result[0].result.response).toHaveProperty('content');
    expect(typeof result[0].result.response.content).toBe('string');
    console.log('Real response:', result[0].result.response.content);
  });
}); 