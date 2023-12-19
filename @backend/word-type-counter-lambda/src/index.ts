import { APIGatewayEvent } from 'aws-lambda';
import { vocabulary } from './vocabulary';

interface WordTypeCounts {
    [key: string]: number;
  }

export const countWordTypes = (text: string): WordTypeCounts => {
    const words = text.toLowerCase().split(/\s+/);

    const wordTypeCounts: WordTypeCounts = {};
  
    for (const word of words) {
      for (const [type, wordList] of Object.entries(vocabulary)) {
        console.log(type, wordList);
        if (wordList.includes(word)) {
          wordTypeCounts[type] = (wordTypeCounts[type] || 0) + 1;
          break;
        }
      }
    }
  
    return wordTypeCounts;
};

export const handler = async (
  event: APIGatewayEvent
) => {
  try {
    const requestBody = JSON.parse(event.body || '');
    const text: string = requestBody.text || '';

    const wordTypeCounts = countWordTypes(text);

    const response = {
      statusCode: 200,
      body: JSON.stringify({ wordTypeCounts }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };

    return response;
  }
};
