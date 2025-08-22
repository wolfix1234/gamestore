// app/api/auth/visits/route.ts - Redis Learning Example
import { NextResponse } from 'next/server';
import redisClient, { connectRedis } from '@/lib/redis';

export async function GET() {
  try {
    // Connect to Redis server
    await connectRedis();
    
    // INCR: Atomically increment a counter (Redis command)
    // This is perfect for visit counters as it's thread-safe
    const totalVisits = await redisClient.incr('site:visits:total');
    
    // SET: Store current timestamp of last visit
    // EX: Set expiration time (optional - here 24 hours = 86400 seconds)
    await redisClient.set('site:visits:last', new Date().toISOString(), { EX: 86400 });
    
    // GET: Retrieve the last visit timestamp
    const lastVisit = await redisClient.get('site:visits:last');
    
    // SADD: Add current timestamp to a set of unique visit times
    // Sets automatically handle duplicates
    const today = new Date().toDateString();
    await redisClient.sAdd('site:visits:unique_days', today);
    
    // SCARD: Get count of unique days with visits
    const uniqueDays = await redisClient.sCard('site:visits:unique_days');
    
    // LPUSH: Add visit to a list (like a log)
    // Lists maintain order - newest first with LPUSH
    const visitLog = {
      timestamp: new Date().toISOString(),
      ip: 'hidden', // In real app, get from request headers
    };
    await redisClient.lPush('site:visits:log', JSON.stringify(visitLog));
    
    // LTRIM: Keep only last 100 visits in the log
    // This prevents the list from growing infinitely
    await redisClient.lTrim('site:visits:log', 0, 99);
    
    // LLEN: Get total number of items in the log
    const logCount = await redisClient.lLen('site:visits:log');
    
    // HSET: Store visit statistics in a hash (like an object)
    // Hashes are perfect for storing related data together
    await redisClient.hSet('site:stats', {
      'total_visits': totalVisits,
      'unique_days': uniqueDays,
      'last_updated': new Date().toISOString()
    });
    
    // HGETALL: Get all fields from the hash
    const stats = await redisClient.hGetAll('site:stats');
    
    return NextResponse.json({
      // Current visit count
      visits: totalVisits,
      
      // When was the last visit
      lastVisit: lastVisit,
      
      // How many unique days had visits
      uniqueVisitDays: uniqueDays,
      
      // How many entries in our visit log
      logEntries: logCount,
      
      // All statistics from hash
      statistics: stats,
      
      // Redis learning notes
      redisOperationsUsed: [
        'INCR - Atomic counter increment',
        'SET with EX - Store with expiration',
        'GET - Retrieve value',
        'SADD - Add to set (unique values)',
        'SCARD - Count set members',
        'LPUSH - Add to list (newest first)',
        'LTRIM - Limit list size',
        'LLEN - Get list length',
        'HSET - Store hash fields',
        'HGETALL - Get all hash fields'
      ]
    });
    
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json(
      { error: 'Failed to process visit' },
      { status: 500 }
    );
  }
}

// POST: Reset visit counter (for learning purposes)
export async function POST() {
  try {
    await connectRedis();
    
    // DEL: Delete keys
    await redisClient.del('site:visits:total');
    await redisClient.del('site:visits:last');
    await redisClient.del('site:visits:unique_days');
    await redisClient.del('site:visits:log');
    await redisClient.del('site:stats');
    
    return NextResponse.json({ 
      message: 'Visit counter reset successfully',
      redisOperation: 'DEL - Delete keys'
    });
    
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json(
      { error: 'Failed to reset counter' },
      { status: 500 }
    );
  }
}
