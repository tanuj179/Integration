const authentication = require('../authentication');

const z = {
  errors: {
    Error: class extends Error {
      constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
      }
    }
  }
};

describe('Authentication', () => {
  test('valid key passes', async () => {
    const bundle = { authData: { api_key: process.env.IRONAAI_API_KEY || 'sk-ironaai-valid-key' } };
    await expect(authentication.test(z, bundle)).resolves.toEqual({ success: true });
  });

  test('invalid key fails', async () => {
    const bundle = { authData: { api_key: 'invalid-key' } };
    await expect(authentication.test(z, bundle)).rejects.toThrow('Invalid API key');
  });
}); 