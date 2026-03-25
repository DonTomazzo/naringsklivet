import Anthropic from '@anthropic-ai/sdk';
import type { Question, Quiz } from '../context/QuizContext';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true, // For development only - move to backend in production
});

export interface HomeworkAnalysisResult {
  extractedText: string;
  quiz: Omit<Quiz, 'id' | 'createdAt'>;
}

// Interface för useHomeworkAnalysis hook
export interface HomeworkAnalysis {
  extractedText: string;
  subject: string;
  topic: string;
  suggestedQuestions: Question[];
  confidence: number;
}

// claudeService objekt för useHomeworkAnalysis hook
export const claudeService = {
  async analyzeHomeworkImage(imageBase64: string, numQuestions: number = 8): Promise<HomeworkAnalysis> {
    const result = await analyzeHomeworkImage(imageBase64);
    return {
      extractedText: result.extractedText,
      subject: extractSubject(result.quiz.title),
      topic: result.quiz.description,
      suggestedQuestions: result.quiz.questions,
      confidence: 0.9,
    };
  },
  
  async analyzeHomeworkText(text: string, numQuestions: number = 8): Promise<HomeworkAnalysis> {
    const result = await analyzeHomeworkText(text);
    return {
      extractedText: result.extractedText,
      subject: extractSubject(result.quiz.title),
      topic: result.quiz.description,
      suggestedQuestions: result.quiz.questions,
      confidence: 0.9,
    };
  }
};

// Hjälpfunktion för att extrahera ämne från titel
function extractSubject(title: string): string {
  const parts = title.split(':');
  return parts.length > 1 ? parts[0].trim() : 'Allmän';
}

export async function analyzeHomeworkImage(imageBase64: string): Promise<HomeworkAnalysisResult> {
  try {
    // ✅ Detektera bildformat från base64 header
    let mediaType = 'image/jpeg';
    if (imageBase64.startsWith('/9j/')) {
      mediaType = 'image/jpeg';
    } else if (imageBase64.startsWith('iVBORw')) {
      mediaType = 'image/png';
    } else if (imageBase64.startsWith('R0lGOD')) {
      mediaType = 'image/gif';
    } else if (imageBase64.startsWith('UklGR')) {
      mediaType = 'image/webp';
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType, // ← Använd detekterad typ
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `Analysera denna läxbild och skapa ett quiz för att testa förståelsen.

Instruktioner:
1. Extrahera texten från bilden
2. Skapa 8-12 frågor baserat på innehållet
3. Variera svårighetsgraden (easy, medium, hard)
4. Ge 4 svarsalternativ per fråga
5. Inkludera förklaringar och hints

Svara i följande JSON-format:
{
  "extractedText": "hela texten från bilden",
  "title": "kort titel på läxan",
  "description": "vad läxan handlar om",
  "questions": [
    {
      "id": "q1",
      "question": "frågan",
      "options": ["alternativ 1", "alternativ 2", "alternativ 3", "alternativ 4"],
      "correctAnswer": 0,
      "difficulty": "easy",
      "explanation": "förklaring till rätt svar",
      "hint": "ledtråd",
      "category": "kategori"
    }
  ]
}`,
            },
          ],
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)\n?```/) || [null, responseText];
    const jsonText = jsonMatch[1] || responseText;
    
    const parsed = JSON.parse(jsonText);

    return {
      extractedText: parsed.extractedText,
      quiz: {
        title: parsed.title,
        description: parsed.description,
        questions: parsed.questions.map((q: any, index: number) => ({
          ...q,
          id: q.id || `q${index + 1}`,
        })),
      },
    };
  } catch (error) {
    console.error('Error analyzing homework:', error);
    throw new Error('Kunde inte analysera läxan. Försök igen.');
  }
}

export async function analyzeHomeworkText(text: string): Promise<HomeworkAnalysisResult> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: `Skapa ett quiz baserat på följande läxa:

${text}

Instruktioner:
1. Skapa 8-12 frågor baserat på innehållet
2. Variera svårighetsgraden (easy, medium, hard)
3. Ge 4 svarsalternativ per fråga
4. Inkludera förklaringar och hints

Svara i följande JSON-format:
{
  "extractedText": "${text.substring(0, 200)}...",
  "title": "kort titel på läxan",
  "description": "vad läxan handlar om",
  "questions": [
    {
      "id": "q1",
      "question": "frågan",
      "options": ["alternativ 1", "alternativ 2", "alternativ 3", "alternativ 4"],
      "correctAnswer": 0,
      "difficulty": "easy",
      "explanation": "förklaring till rätt svar",
      "hint": "ledtråd",
      "category": "kategori"
    }
  ]
}`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)\n?```/) || [null, responseText];
    const jsonText = jsonMatch[1] || responseText;
    const parsed = JSON.parse(jsonText);

    return {
      extractedText: text,
      quiz: {
        title: parsed.title,
        description: parsed.description,
        questions: parsed.questions,
      },
    };
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw new Error('Kunde inte analysera texten. Försök igen.');
  }
}

export async function generateDeeperQuestions(
  wrongQuestions: Question[],
  originalText: string
): Promise<Question[]> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: `Eleven hade fel på dessa frågor:

${wrongQuestions.map((q, i) => `${i + 1}. ${q.question}`).join('\n')}

Original text: ${originalText}

Skapa ${wrongQuestions.length * 2} nya fördjupande frågor som:
1. Täcker samma koncept men från andra vinklar
2. Är lite svårare än originalfrågorna
3. Hjälper eleven förstå varför de hade fel

Svara i JSON-format:
{
  "questions": [
    {
      "id": "deep1",
      "question": "frågan",
      "options": ["alt 1", "alt 2", "alt 3", "alt 4"],
      "correctAnswer": 0,
      "difficulty": "medium",
      "explanation": "förklaring",
      "hint": "ledtråd",
      "category": "kategori"
    }
  ]
}`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)\n?```/) || [null, responseText];
    const jsonText = jsonMatch[1] || responseText;
    const parsed = JSON.parse(jsonText);

    return parsed.questions;
  } catch (error) {
    console.error('Error generating deeper questions:', error);
    return [];
  }
}

export async function generateEasierVariations(
  stillWrongQuestions: Question[],
  originalText: string
): Promise<Question[]> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: `Eleven har fortfarande svårt med dessa koncept:

${stillWrongQuestions.map((q, i) => `${i + 1}. ${q.question}`).join('\n')}

Original text: ${originalText}

Skapa ${stillWrongQuestions.length} enklare variationer som:
1. Täcker samma koncept men är lättare att förstå
2. Har tydligare hints
3. Bygger upp förståelsen steg för steg

Svara i JSON-format:
{
  "questions": [
    {
      "id": "easy1",
      "question": "frågan",
      "options": ["alt 1", "alt 2", "alt 3", "alt 4"],
      "correctAnswer": 0,
      "difficulty": "easy",
      "explanation": "tydlig förklaring",
      "hint": "hjälpsam ledtråd",
      "category": "kategori"
    }
  ]
}`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)\n?```/) || [null, responseText];
    const jsonText = jsonMatch[1] || responseText;
    const parsed = JSON.parse(jsonText);

    return parsed.questions;
  } catch (error) {
    console.error('Error generating easier variations:', error);
    return [];
  }
}
