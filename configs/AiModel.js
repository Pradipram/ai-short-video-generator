const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// async function run() {
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a script to generate 30 seconds video on toppic :interesting historical story along with AI images prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContextText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "video_script": [\n    {\n      "scene": 1,\n      "duration": 5,\n      "imagePrompt": "A realistic, wide shot of a bustling marketplace in ancient Alexandria, Egypt.  Merchants in colorful tunics hawk their wares, pyramids are visible in the distance.  The sky is a clear, bright blue. Focus on the energy and activity of the scene, capturing diverse individuals and details.",\n      "contextText": "Around 300 BC, Alexandria was a melting pot of cultures, a thriving hub for trade and learning.  Its library, a beacon of knowledge, drew scholars from across the known world."\n    },\n    {\n      "scene": 2,\n      "duration": 5,\n       "imagePrompt":"A realistic close-up shot of an ancient scholar, Archimedes, with a serious and intense expression, deeply engrossed in studying a complex geometrical diagram drawn in sand. He\'s wearing a simple white robe. Focus on his aged face, with wrinkles that speak of wisdom and thought.  The background is blurred, suggesting his focus is absolute.",\n      "contextText": "One of the most brilliant minds of this era was Archimedes.  He wasn\'t just a mathematician; he was an engineer and inventor, constantly pushing the boundaries of what was possible."\n    },\n    {\n      "scene": 3,\n      "duration": 5,\n      "imagePrompt": "A realistic portrayal of a  military siege.  Focus on the foreground showing a large wooden catapult being prepared to launch a projectile, with Roman soldiers in armor yelling and pulling ropes.  In the background, a stone wall of a Greek city is visible, under attack. The scene should be gritty and show the chaos of war.",\n      "contextText": "During the Roman siege of Syracuse, Archimedes\' ingenuity was put to the test.  He devised innovative war machines to defend the city."\n    },\n     {\n      "scene": 4,\n      "duration": 5,\n      "imagePrompt": "A realistic, medium shot of a large Roman ship engulfed in flames, its sails burning fiercely, along with the smoke billowing towards the sky. The ship is in a state of chaos, with sailors jumping into the water, with a focus on the ferocity of the fire and the dramatic nature of the destruction.",\n      "contextText":"Legend has it that he used mirrors to focus sunlight, setting Roman ships ablaze - a truly terrifying weapon of that time."\n    },\n     {\n      "scene": 5,\n      "duration": 5,\n      "imagePrompt":"A realistic depiction of Archimedes, from the chest up, standing calm and composed while holding a compass and a sphere, with a Roman soldier approaching him from the rear, sword drawn. The setting is within a building, maybe a library, with papers strewn about. The scene should convey a sense of tension and the impending danger, with the focus on Archimedes\' placid expression.",\n       "contextText":"Despite his genius, Archimedes was tragically killed during the Roman capture of the city, his final moments a reminder of the fragility of life, even for the greatest minds."\n    },\n    {\n      "scene": 6,\n       "duration": 5,\n       "imagePrompt":"A realistic final shot showing the remnants of ancient Greek architecture, including broken columns and marble statues, bathed in a golden, late afternoon light, with the sea in the background. The scene is still and reflective, conveying the passage of time and the lasting impact of history.",\n       "contextText":"But his legacy continues to inspire, a testament to the power of human curiosity and the impact one person can have on the course of history."\n    }\n\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
// // }

// run();
