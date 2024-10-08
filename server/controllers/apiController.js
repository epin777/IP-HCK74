const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.gemini_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class apiController {
  static async gemini(req, res, next) {
    try {
      const { messages } = req.body;
      console.log(messages, "?????");
      const prompt = messages;
      console.log(prompt, "<<<<<<");

      const result = await model.generateContent(prompt);
      res.send(result.response.text());
    } catch (error) {
      next();
    }
  }
}

module.exports = apiController;
