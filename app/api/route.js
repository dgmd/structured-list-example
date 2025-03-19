import {
  NextResponse
} from 'next/server';
import OpenAI from 'openai';
import {
  zodResponseFormat
} from 'openai/helpers/zod';
import {
  z
} from "zod";

export const maxDuration = 300;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ItemSchema = z.object({
  key: z.string(),
  score: z.number(),
});

const ResponseSchema = z.object({
  results: z.array(ItemSchema)
});

export async function POST(request){
  try {
    const { text, list } = await request.json();
    
    const formattedMessages = [
      { 
        role: "system", 
        content: `
        you are going to evaluate text based on the criteria of a list.
        return a rank of score from 0 to 10 for each item in the list.
        the score should be based on the relevance of the item to the text.
        provide a one-word key which summarizes the item.
        return the result in the format of a list of objects with key and score.
        `
      },
      {
        role: "system",
        content: `here is the text: ${text}`
      },
      {
        role: "system",
        content: `here is the list: ${JSON.stringify(list)}`
      }
    ];
    
    // Get response from OpenAI using zodResponseFormat helper
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: formattedMessages,
      response_format: zodResponseFormat(ResponseSchema, 'text_analysis_update'),
    });

    
    // Extract the parsed response
    const validatedResponse = completion.choices[0].message.parsed;
    const chartData = validatedResponse.results.map(item => ({
      name: item.key,
      value: item.score
    }));

    return NextResponse.json(chartData);
  }
  catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
};