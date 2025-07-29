const { IronaAI } = require("ironaai");

module.exports = {
  type: 'custom',
  fields: [
    { key: 'api_key', label: 'API Key', required: true, type: 'string' }
  ],
  test: async function (z, bundle) {
    try {
      await IronaAI.createInstance({ apiKey: bundle.authData.api_key });
      return { success: true };
    } catch (error) {
      throw new z.errors.Error(
        "Invalid API key: " + error.message,
        "AuthenticationError",
        401
      );
    }
  }
}; 