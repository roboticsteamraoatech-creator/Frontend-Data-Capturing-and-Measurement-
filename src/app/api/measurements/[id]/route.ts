import { NextRequest, NextResponse } from 'next/server';

// Import our mock data store (in a real app, this would be a database)
import { measurementsStore } from '../route';

/**
 * GET /api/measurements/:id
 * Get a specific measurement by ID
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Find the measurement by ID
    const measurement = measurementsStore.find((m: typeof measurementsStore[0]) => m.id === id);
    
    if (!measurement) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Measurement not found' 
        }, 
        { status: 404 }
      );
    }
    
    // Return the measurement
    return NextResponse.json({
      success: true,
      data: {
        measurement
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching measurement:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch measurement'
      }, 
      { status: 500 }
    );
  }
}