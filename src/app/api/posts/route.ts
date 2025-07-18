import { NextResponse } from 'next/server';

const posts = [
  { id: 1, title: 'Exploring Next.js 14', body: 'A deep dive into the new features of Next.js 14, including Server Actions and improved performance.' },
  { id: 2, title: 'Building PWAs with Next.js', body: 'Learn how to create powerful Progressive Web Apps with offline capabilities and background sync.' },
  { id: 3, title: 'Mastering Tanstack Query', body: 'A comprehensive guide to data fetching, caching, and state management with Tanstack Query.' },
  { id: 4, title: 'The Art of UI/UX Design', body: 'Principles of creating beautiful, intuitive, and accessible user interfaces.' },
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(posts);
}
