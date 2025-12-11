import { NextRequest, NextResponse } from 'next/server';
import { measurementService, BodyMeasurements } from '@/services/measurement.service.impl';

// Mock data storage (in a real app, this would be a database)
export let measurementsStore: {
  id: string;
  userId: string;
  userHeight: number;
  measurements: BodyMeasurements;
  scanTimestamp: string;
  analysisTimestamp: string;
  createdAt: string;
  updatedAt: string;
}[] = [];

/**
 * POST /api/measurements/scan
 * Process AI body scan and return measurements
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageData, userHeight, scanTimestamp, deviceInfo } = body;
    
    console.log('📥 Received measurement request:', {
      imageDataLength: imageData?.length,
      userHeight,
      hasImageData: !!imageData,
      imageDataPrefix: imageData?.substring(0, 50) + '...'
    });
    
    // Validate required fields
    if (!imageData || !userHeight) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: imageData and userHeight are required' 
        }, 
        { status: 400 }
      );
    }
    
    // Process the body scan using our AI service
    const measurements = await measurementService.processBodyScan(imageData, userHeight);
    
    // Create a measurement record
    const measurementRecord = {
      id: `meas_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: 'user_123', // In a real app, this would come from auth context
      userHeight,
      measurements,
      scanTimestamp: scanTimestamp || new Date().toISOString(),
      analysisTimestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store the measurement (in a real app, this would go to a database)
    measurementsStore.push(measurementRecord);
    
    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        measurements: measurementRecord,
        message: 'Body measurements analyzed successfully'
      }
    });
    
  } catch (error) {
    console.error('❌ Measurement analysis error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to analyze body measurements'
      }, 
      { status: 500 }
    );
  }
}

/**
 * GET /api/measurements
 * Get all measurements for the user
 */
export async function GET() {
  try {
    // In a real app, this would fetch from a database with user filtering
    return NextResponse.json({
      success: true,
      data: {
        measurements: measurementsStore
      }
    });
  } catch (error) {
    console.error('❌ Error fetching measurements:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch measurements'
      }, 
      { status: 500 }
    );
  }
}