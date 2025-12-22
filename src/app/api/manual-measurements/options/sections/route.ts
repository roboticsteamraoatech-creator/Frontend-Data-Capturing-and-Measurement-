import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return the available section options
    return NextResponse.json({
      success: true,
      data: {
        sections: [
          "Head Section",
          "Chest Section", 
          "Abdomen Section",
          "Waist Section",
          "Thigh Section",
          "Upper Body",
          "Lower Body",
          "Arms",
          "Legs"
        ],
        message: "Section options retrieved successfully"
      }
    });
  } catch (error) {
    console.error('Error fetching section options:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch section options' 
      }, 
      { status: 500 }
    );
  }
}