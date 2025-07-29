
const authentication = require('./authentication');
const generateResponse = require('./creates/generate_response');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  creates: {
    [generateResponse.key]: generateResponse
  }
};