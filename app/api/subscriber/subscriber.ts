import { NextRequest } from 'next/server';
import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost:6379' });

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      await client.connect();
      const subscriber = client.duplicate();
      await subscriber.connect();
      
      await subscriber.subscribe('news', (message) => {
        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      });
      
      request.signal.addEventListener('abort', () => {
        subscriber.unsubscribe();
        subscriber.quit();
        client.quit();
        controller.close();
      });
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}