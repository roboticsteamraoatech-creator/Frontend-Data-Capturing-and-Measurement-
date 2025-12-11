import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return the available measurement types
    return NextResponse.json({
      success: true,
      data: {
        options: ["Manual", "AI"],
        message: "Measurement types retrieved successfully"
      }
    });
  } catch (error) {
    console.error('Error fetching measurement types:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch measurement types' 
      }, 
      { status: 500 }
    );
  }
}