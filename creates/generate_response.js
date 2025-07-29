const { IronaAI } = require("ironaai");

module.exports = {
  key: "generate_response",
  noun: "Response",
  display: {
    label: "Generate Response",
    description: "Generates a response using IronaAI with optional system prompt and user input."
  },
  operation: {
    inputFields: [
      { key: "system_prompt", label: "System Prompt", type: "string", required: false, helpText: "Optional system instructions for the model." },
      { key: "user_input", label: "User Input", type: "string", required: true, helpText: "The main user message or question." }
    ],
    perform: async (z, bundle) => {
      let userText = bundle.inputData.user_input;
      if (bundle.inputData.system_prompt) {
        // Prepend system prompt to user input for maximum compatibility
        userText = `${bundle.inputData.system_prompt}\n\n${userText}`;
      }
      const messages = [
        {
          role: "user",
          content: [{ type: "text", text: userText }]
        }
      ];

      const sdk = await IronaAI.createInstance({ apiKey: bundle.authData.api_key });
      const response = await sdk.completions.create({
        messages,
        models: [
          "perplexity/sonar",
          "anthropic/claude-3-opus-20240229",
          "anthropic/claude-2.1",
          "mistral/open-mixtral-8x22b",
          "google/gemini-1.0-pro-latest",
          "google/gemini-2.0-flash"
        ]
      });

      return [{ result: response }];
    }
  }
}; 