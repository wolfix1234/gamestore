import { createClient } from 'redis';
import { NextResponse } from 'next/server';

const client = createClient({
  url: 'redis://localhost:6379'
});

export async function POST() {
  await client.connect();
  await client.hSet('user:1000', {
    name: 'Alice',
    age: '30',
    email: 'alice@example.com'
  });
  await client.quit();
  return NextResponse.json({ success: true });
}

export async function GET() {
  await client.connect();
  const user = await client.hGetAll('user:1000');
  await client.quit();
  return NextResponse.json(user);
}