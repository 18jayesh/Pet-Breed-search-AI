import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';

let aiInstance = null;

function getAIClient() {
  if (!aiInstance) {
    if (!config.geminiApiKey) {
      throw new Error('GEMINI_API_KEY_MISSING');
    }
    aiInstance = new GoogleGenAI({
      apiKey: config.geminiApiKey,
    });
  }
  return aiInstance;
}

const SYSTEM_PROMPT = `You are a world-class veterinary morphological specialist and canine/feline breed identification expert for PetVision AI.
Your task is to analyze the provided image with high precision, scientific honesty, and structured JSON output.

ANALYSIS RULES:
1. Animal Verification:
   - Determine if an animal is clearly visible in the image.
   - Specifically verify if the animal is a DOG or a CAT.
   - If the image contains no animal (e.g. human, vehicle, landscape, food) or an animal other than a dog or cat (e.g. bird, reptile, horse), set isDogOrCat: false and animalType accordingly.
2. Clarity Assessment:
   - Check if the image is too blurry, too dark, obstructed, or distant to make a reliable determination. If so, set isClearImage: false and provide constructive advice in statusMessage.
3. Breed & Morphological Identification:
   - For dogs and cats, analyze facial structure, ear carriage, muzzle length, coat texture and pattern, tail shape, body proportions, and color markings.
   - If purebred, specify the standard recognized breed name (e.g., "Golden Retriever", "Maine Coon", "French Bulldog", "Siamese").
   - If mixed breed (e.g., Labradoodle, Cavapoo, domestic mix, mutt), identify as mixed breed, specify the dominant visible breed characteristics, and set isMixedBreed: true.
   - Estimate confidence as an honest integer between 0 and 100 representing certainty based strictly on visible features and image quality. Never invent 100% certainty if ambiguous.
   - Provide up to 3 alternative breed possibilities with estimated percentage probabilities that reflect morphological similarities.
4. Age & Growth:
   - If the animal appears to be a puppy or kitten, flag isYoungPet: true and include a helpful note explaining that juvenile coat, ear carriage, and size may evolve as the pet matures.
5. Breed Knowledge & Care:
   - When a dog or cat breed is identified, provide accurate, standard breed information including origin, lifespan, size, weight, height, temperament traits, physical characteristics, energy level, grooming requirements, exercise needs, diet information, and care tips.
   - Emphasize that dietary and care advice is educational and not veterinary medical advice.

RETURN ONLY VALID JSON matching this exact structure:
{
  "isAnimal": true,
  "animalType": "dog" | "cat" | "other" | "none",
  "isDogOrCat": true,
  "isClearImage": true,
  "breed": "Breed Name or Mix Description",
  "breedCategory": "Purebred" | "Mixed Breed" | "Crossbreed" | "Domestic / Regional" | "Unknown",
  "confidence": 92,
  "isMixedBreed": false,
  "isYoungPet": false,
  "youngPetNote": "string or empty",
  "alternativeBreeds": [
    { "name": "Alternative Breed 1", "confidence": 5 },
    { "name": "Alternative Breed 2", "confidence": 3 }
  ],
  "identificationSummary": "Detailed observation of visible anatomical and coat traits leading to this conclusion.",
  "breedInformation": {
    "origin": "Country / Region of Origin",
    "lifespan": "e.g. 10-12 years",
    "size": "Small / Medium / Large / Giant",
    "weight": "e.g. 25-34 kg (55-75 lbs)",
    "height": "e.g. 51-61 cm (20-24 in)",
    "temperament": ["Trait 1", "Trait 2", "Trait 3", "Trait 4"],
    "physicalCharacteristics": ["Feature 1", "Feature 2", "Feature 3"],
    "energyLevel": "Low / Moderate / High / Very High",
    "groomingNeeds": "Low / Moderate / High",
    "exerciseNeeds": "Daily exercise description",
    "dietInformation": "Balanced age-appropriate nutrition guidelines",
    "careTips": ["Tip 1", "Tip 2", "Tip 3"]
  },
  "statusMessage": "Helpful message explaining the finding.",
  "disclaimer": "AI-powered breed identification is an estimate based on visible features. It does not replace genetic testing or veterinary consultation."
}`;

export async function analyzePetBreed(imageBase64, mimeType = 'image/jpeg', expectedType = 'any') {
  let ai;
  try {
    ai = getAIClient();
  } catch (err) {
    if (err.message === 'GEMINI_API_KEY_MISSING') {
      const error = new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in backend/.env');
      error.statusCode = 500;
      error.code = 'GEMINI_KEY_MISSING';
      throw error;
    }
    throw err;
  }

  // Model list: primary model from config, with automatic fallbacks across active Gemini models
  const modelsToTry = [
    config.geminiModel,
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.8-flash',
  ].filter((v, i, a) => a.indexOf(v) === i); // unique

  let lastError = null;

  const modeContext = expectedType === 'dog'
    ? 'The user is analyzing in DEDICATED DOG MODE. Focus specifically on canine breed standards, ear carriage, muzzle shape, and skull morphology. If the subject is clearly a cat or non-dog, state this kindly.'
    : expectedType === 'cat'
    ? 'The user is analyzing in DEDICATED CAT MODE. Focus specifically on feline breed standards, ear furnishings, facial contour, eye color, and coat genetics. If the subject is clearly a dog or non-cat, state this kindly.'
    : 'Analyze whether the image contains a dog or a cat.';

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${SYSTEM_PROMPT}\n\n${modeContext}\n\nPlease analyze this uploaded photo and return the structured JSON identification now.` },
              {
                inlineData: {
                  mimeType,
                  data: imageBase64,
                },
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2, // Low temperature for factual consistency
        },
      });

      const responseText = response.text?.trim();
      if (!responseText) {
        throw new Error('Empty response received from Gemini model.');
      }

      // Parse JSON safely
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        // Try extracting JSON block if model included markdown wraps
        const match = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          parsed = JSON.parse(match[1]);
        } else {
          throw new Error('Failed to parse Gemini response as JSON: ' + responseText.slice(0, 100));
        }
      }

      // Normalize result structure
      return sanitizeAnalysisResult(parsed, model);
    } catch (err) {
      console.warn(`[Gemini Attempt Failed on ${model}]:`, err.message);
      lastError = err;

      // If error is 429 quota or 403 invalid key, do not retry other models uselessly
      if (err.status === 429 || (err.message && err.message.includes('RESOURCE_EXHAUSTED'))) {
        const quotaErr = new Error('Gemini API quota exceeded. Please check your AI Studio quota or try again in a few moments.');
        quotaErr.statusCode = 429;
        quotaErr.code = 'AI_QUOTA_EXCEEDED';
        throw quotaErr;
      }

      if (err.status === 400 && err.message && err.message.includes('API_KEY_INVALID')) {
        const authErr = new Error('The configured GEMINI_API_KEY is invalid. Please verify your Google AI Studio API key.');
        authErr.statusCode = 401;
        authErr.code = 'INVALID_API_KEY';
        throw authErr;
      }
    }
  }

  // All model attempts failed
  const finalError = new Error(`Gemini AI analysis failed: ${lastError?.message || 'Unknown AI error'}`);
  finalError.statusCode = 502;
  finalError.code = 'AI_SERVICE_UNAVAILABLE';
  throw finalError;
}

function sanitizeAnalysisResult(raw, modelUsed) {
  const isAnimal = Boolean(raw.isAnimal);
  const animalType = (raw.animalType || 'none').toLowerCase();
  const isDogOrCat = Boolean(raw.isDogOrCat && (animalType === 'dog' || animalType === 'cat'));
  const isClearImage = raw.isClearImage !== false;

  const confidence = typeof raw.confidence === 'number'
    ? Math.max(0, Math.min(100, Math.round(raw.confidence)))
    : 0;

  const defaultDisclaimer = 'AI-powered breed identification is an estimate. Results may vary depending on image quality, breed similarity, and mixed-breed characteristics.';

  // If not a dog or cat, return clean non-pet response
  if (!isAnimal || !isDogOrCat) {
    let msg = raw.statusMessage;
    if (!msg) {
      if (!isAnimal) {
        msg = 'No animal was detected in this photo. Please upload a clear photo of a dog or cat.';
      } else {
        msg = `A ${animalType} was detected. PetVision AI is specifically optimized for dogs and cats.`;
      }
    }

    return {
      success: true,
      isAnimal,
      animalType: animalType === 'dog' || animalType === 'cat' ? animalType : (isAnimal ? animalType : 'none'),
      isDogOrCat: false,
      isClearImage,
      breed: isAnimal ? `${animalType.charAt(0).toUpperCase() + animalType.slice(1)} (Non-canine/feline)` : 'No Animal Detected',
      breedCategory: 'Unknown',
      confidence: 0,
      isMixedBreed: false,
      isYoungPet: false,
      youngPetNote: '',
      alternativeBreeds: [],
      identificationSummary: raw.identificationSummary || msg,
      breedInformation: null,
      statusMessage: msg,
      disclaimer: raw.disclaimer || defaultDisclaimer,
      meta: {
        modelUsed,
        timestamp: new Date().toISOString(),
      },
    };
  }

  // If unclear image
  if (!isClearImage) {
    return {
      success: true,
      isAnimal: true,
      animalType,
      isDogOrCat: true,
      isClearImage: false,
      breed: raw.breed || 'Uncertain Breed',
      breedCategory: raw.breedCategory || 'Unknown',
      confidence,
      isMixedBreed: Boolean(raw.isMixedBreed),
      isYoungPet: Boolean(raw.isYoungPet),
      youngPetNote: raw.youngPetNote || '',
      alternativeBreeds: Array.isArray(raw.alternativeBreeds) ? raw.alternativeBreeds : [],
      identificationSummary: raw.identificationSummary || 'The image is too blurry, dark, or obscured for high-confidence identification.',
      breedInformation: raw.breedInformation || null,
      statusMessage: raw.statusMessage || 'The image quality makes identification challenging. For best accuracy, upload a well-lit, focused image showing the pet\'s face and body.',
      disclaimer: raw.disclaimer || defaultDisclaimer,
      meta: {
        modelUsed,
        timestamp: new Date().toISOString(),
      },
    };
  }

  // Full valid dog or cat breed response
  return {
    success: true,
    isAnimal: true,
    animalType,
    isDogOrCat: true,
    isClearImage: true,
    breed: raw.breed || (animalType === 'dog' ? 'Unknown Dog Breed' : 'Unknown Cat Breed'),
    breedCategory: raw.breedCategory || (raw.isMixedBreed ? 'Mixed Breed' : 'Purebred'),
    confidence,
    isMixedBreed: Boolean(raw.isMixedBreed),
    isYoungPet: Boolean(raw.isYoungPet),
    youngPetNote: raw.youngPetNote || '',
    alternativeBreeds: Array.isArray(raw.alternativeBreeds) ? raw.alternativeBreeds.slice(0, 3) : [],
    identificationSummary: raw.identificationSummary || `Identified as a ${raw.breed || animalType}.`,
    breedInformation: {
      origin: raw.breedInformation?.origin || 'Unknown origin',
      lifespan: raw.breedInformation?.lifespan || 'Varies',
      size: raw.breedInformation?.size || 'Medium',
      weight: raw.breedInformation?.weight || 'Not specified',
      height: raw.breedInformation?.height || 'Not specified',
      temperament: Array.isArray(raw.breedInformation?.temperament) ? raw.breedInformation.temperament : ['Affectionate', 'Alert'],
      physicalCharacteristics: Array.isArray(raw.breedInformation?.physicalCharacteristics) ? raw.breedInformation.physicalCharacteristics : ['Distinct coat and posture'],
      energyLevel: raw.breedInformation?.energyLevel || 'Moderate',
      groomingNeeds: raw.breedInformation?.groomingNeeds || 'Moderate',
      exerciseNeeds: raw.breedInformation?.exerciseNeeds || 'Regular daily activity recommended',
      dietInformation: raw.breedInformation?.dietInformation || 'High-quality age-appropriate complete nutrition',
      careTips: Array.isArray(raw.breedInformation?.careTips) ? raw.breedInformation.careTips : ['Provide clean water and balanced food', 'Regular veterinary health checks', 'Keep vaccinations up to date'],
    },
    statusMessage: raw.statusMessage || `Successfully identified as ${raw.breed}.`,
    disclaimer: raw.disclaimer || defaultDisclaimer,
    meta: {
      modelUsed,
      timestamp: new Date().toISOString(),
    },
  };
}
