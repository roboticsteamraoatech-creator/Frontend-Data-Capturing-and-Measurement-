import { NextRequest, NextResponse } from 'next/server';

// Import our mock data store (in a real app, this would be a database)
import { manualMeasurementsStore } from '../route';

/**
 * GET /api/manual-measurements/:id
 * Get a specific manual measurement by ID
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Find the measurement by ID
    const measurement = manualMeasurementsStore.find((m: any) => m.id === id);
    
    if (!measurement) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Manual measurement not found' 
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
    console.error('❌ Error fetching manual measurement:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch manual measurement'
      }, 
      { status: 500 }
    );
  }
}

/**
 * PUT /api/manual-measurements/:id
 * Update a specific manual measurement by ID
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    
    // Find the measurement by ID
    const measurementIndex = manualMeasurementsStore.findIndex((m: any) => m.id === id);
    
    if (measurementIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Manual measurement not found' 
        }, 
        { status: 404 }
      );
    }
    
    // Update the measurement
    const updatedMeasurement = {
      ...manualMeasurementsStore[measurementIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    manualMeasurementsStore[measurementIndex] = updatedMeasurement;
    
    // Return the updated measurement
    return NextResponse.json({
      success: true,
      data: {
        measurement: updatedMeasurement,
        message: 'Manual measurement updated successfully'
      }
    });
    
  } catch (error) {
    console.error('❌ Error updating manual measurement:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update manual measurement'
      }, 
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/manual-measurements/:id
 * Delete a specific manual measurement by ID
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Find the measurement by ID
    const measurementIndex = manualMeasurementsStore.findIndex((m: any) => m.id === id);
    
    if (measurementIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Manual measurement not found' 
        }, 
        { status: 404 }
      );
    }
    
    // Remove the measurement
    manualMeasurementsStore.splice(measurementIndex, 1);
    
    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Manual measurement deleted successfully'
      }
    });
    
  } catch (error) {
    console.error('❌ Error deleting manual measurement:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete manual measurement'
      }, 
      { status: 500 }
    );
  }
}