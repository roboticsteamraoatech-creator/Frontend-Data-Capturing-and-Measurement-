import { NextRequest, NextResponse } from 'next/server';

// Mock data storage for manual measurements
export let manualMeasurementsStore: any[] = [];

/**
 * GET /api/manual-measurements
 * Get all manual measurements for the user
 */
export async function GET() {
  try {
    // In a real app, this would fetch from a database with user filtering
    return NextResponse.json({
      success: true,
      data: {
        measurements: manualMeasurementsStore
      }
    });
  } catch (error) {
    console.error('❌ Error fetching manual measurements:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch manual measurements'
      }, 
      { status: 500 }
    );
  }
}

/**
 * POST /api/manual-measurements/save
 * Save a new manual measurement
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Create a measurement record
    const measurementRecord = {
      id: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store the measurement (in a real app, this would go to a database)
    manualMeasurementsStore.push(measurementRecord);
    
    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        measurement: measurementRecord,
        message: 'Manual measurement saved successfully'
      }
    });
    
  } catch (error) {
    console.error('❌ Manual measurement save error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to save manual measurement'
      }, 
      { status: 500 }
    );
  }
}