import { NextRequest, NextResponse } from 'next/server';

// Since we now call the backend directly, this file will just export empty handlers
// The upload functionality is now implemented directly in the frontend components

export async function POST() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Use POST /api/photos/upload for uploading photos' 
    }, 
    { status: 400 }
  );
}

export async function GET() {
  try {
    // In a real app, this would fetch from a database with user filtering
    // For now, we'll return an empty array since we don't have persistent storage
    return NextResponse.json({
      success: true,
      data: {
        photos: []
      }
    });
  } catch (error) {
    console.error('❌ Error fetching photos:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch photos'
      }, 
      { status: 500 }
    );
  }
}
