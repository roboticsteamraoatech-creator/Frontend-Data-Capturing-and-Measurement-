# AI Measurement API Design Document

## Overview

The AI Measurement API provides a REST endpoint for processing body scan images and returning precise body measurements. This design addresses the critical missing API route `/api/measurements/scan` that the frontend currently calls but doesn't exist, causing the error "Failed to process body scan: AI service returned".

The existing `MeasurementServiceImpl` class already contains the AI processing logic. This implementation focuses on creating the missing API route to connect the frontend to the existing service, following the same proxy pattern used by other measurement endpoints in the application.

## Architecture

The system follows a layered architecture pattern:

```
┌─────────────────┐
│   Frontend UI   │ (Existing - AI scan page)
└─────────┬───────┘
          │ HTTP POST /api/measurements/scan
          ▼
┌─────────────────┐
│  API Route      │ (Missing - needs to be created)
│  /scan/route.ts │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│MeasurementService│ (Existing - measurement.service.impl.ts)
│     Impl        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Mock AI Service │ (Existing - in service implementation)
└─────────────────┘
```

## Components and Interfaces

### API Route (`/api/measurements/scan/route.ts`)
- **Purpose**: Next.js API route handler for POST requests to process body scans
- **Responsibilities**: Request routing, input validation, calling existing MeasurementServiceImpl, response formatting, error handling
- **Interface**: 
  - Input: HTTP POST with JSON body containing image data and height
  - Output: JSON response with measurements or error details

### MeasurementServiceImpl (Existing)
- **Purpose**: Processes uploaded images for body measurement analysis using mock AI
- **Responsibilities**: Image validation, AI processing simulation, measurement calculation
- **Location**: `src/services/measurement.service.impl.ts`
- **Interface**:
  ```typescript
  processBodyScan(imageData: string, userHeight: number): Promise<BodyMeasurements>
  ```

## Data Models

### Request Model
```typescript
interface MeasurementScanRequest {
  frontImageData: string;      // Base64 encoded image data
  sideImageData?: string;      // Optional side view image
  userHeight: number;          // Height in centimeters (1-300)
  scanTimestamp: string;       // ISO 8601 timestamp
}
```

### Response Model
```typescript
interface MeasurementScanResponse {
  success: boolean;
  data: {
    measurements: StoredMeasurement;
    message: string;
  };
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

### Internal Models
```typescript
interface BodyLandmark {
  x: number;
  y: number;
  confidence: number;
  type: string;
}

interface ProcessingMetadata {
  processingTime: number;
  imageQuality: number;
  confidenceScore: number;
  algorithmsUsed: string[];
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Complete measurement response
*For any* valid scan request with front image data, height, and timestamp, the API should return a response containing all 10 body measurements as numeric values
**Validates: Requirements 1.1, 1.4**

### Property 2: Dual image processing
*For any* scan request containing both front and side image data, the system should process both images without errors and return valid measurements
**Validates: Requirements 1.2**

### Property 3: Image data validation
*For any* request with invalid image data (malformed base64, unsupported format, etc.), the API should return HTTP 400 with descriptive error message
**Validates: Requirements 2.1**

### Property 4: Height validation
*For any* height value outside the valid range (1-300 cm), the API should reject the request with HTTP 400 and specific error details
**Validates: Requirements 2.3**

### Property 5: Response format consistency
*For any* API request (successful or failed), the response should follow the consistent JSON format with success boolean and appropriate data/error structure
**Validates: Requirements 3.1**

### Property 6: Success status codes
*For any* successfully processed scan request, the API should return HTTP 200 status code with measurement data
**Validates: Requirements 3.2**

### Property 7: Validation error status codes
*For any* request with validation errors (missing fields, invalid data), the API should return HTTP 400 status code
**Validates: Requirements 3.3**

### Property 8: Numeric serialization
*For any* measurement response, all measurement values should be serialized as numbers, not strings
**Validates: Requirements 3.5**

### Property 9: Concurrent request handling
*For any* set of simultaneous scan requests, each should be processed independently without data corruption or interference
**Validates: Requirements 4.4**

### Property 10: Height scaling consistency
*For any* two identical images with different height values, the returned measurements should scale proportionally to the height difference
**Validates: Requirements 5.1**

### Property 11: Data persistence completeness
*For any* successfully processed measurement, the stored data should contain all 10 measurements plus required metadata fields
**Validates: Requirements 5.2**

### Property 12: Storage-retrieval round trip
*For any* measurement that is successfully stored, retrieving it by ID should return data in the same format as the initial calculation response
**Validates: Requirements 5.3**

### Property 13: Numeric precision preservation
*For any* measurement values with decimal precision, the serialization and storage should maintain the precision without rounding errors
**Validates: Requirements 5.4**

### Property 14: Required field validation
*For any* request missing required fields (frontImageData, userHeight, scanTimestamp), the API should return HTTP 400 with field-specific error messages
**Validates: Requirements 5.5**

## Error Handling

### Validation Errors (HTTP 400)
- Missing required fields
- Invalid image data format
- Height outside valid range (1-300 cm)
- Malformed timestamp
- Image size exceeding limits

### Processing Errors (HTTP 500)
- AI service unavailable
- Image processing failures
- Database connection issues
- Unexpected server errors

### Error Response Format
```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR" | "PROCESSING_ERROR" | "SERVER_ERROR",
    message: "Human-readable error description",
    details: {
      field?: string,
      value?: any,
      constraint?: string
    }
  }
}
```

## Testing Strategy

### Unit Testing
- Request validation logic
- Image processing utilities
- Measurement calculation algorithms
- Error handling scenarios
- Data serialization/deserialization

### Property-Based Testing
The system will use **fast-check** (JavaScript/TypeScript property-based testing library) to verify correctness properties. Each property-based test will run a minimum of 100 iterations to ensure comprehensive coverage.

Property-based tests will be tagged with comments referencing the design document properties:
- Format: `**Feature: ai-measurement-api, Property {number}: {property_text}**`
- Each correctness property will be implemented by a single property-based test
- Tests will generate random valid inputs to verify universal properties hold across all valid executions

### Integration Testing
- End-to-end API request/response cycles
- Database integration testing
- AI service integration testing
- Error scenario testing

### Performance Testing
- Image processing time limits
- Concurrent request handling
- Memory usage with large images
- API response time benchmarks

## Implementation Notes

### Image Processing
- Support JPEG, PNG, WebP formats
- Maximum image size: 10MB
- Automatic image compression/resizing for large files
- Base64 decoding and validation

### AI Service Integration
- Mock implementation initially for development
- Placeholder for future computer vision API integration
- Configurable processing timeouts
- Fallback error handling

### Data Storage
- In-memory storage for development/testing
- Structured for future database migration
- Unique ID generation using timestamp + random suffix
- Metadata tracking for audit purposes

### Security Considerations
- Input sanitization for all request data
- Image data validation to prevent malicious uploads
- Rate limiting for API endpoints
- User authentication integration points

### Performance Optimizations
- Image compression before processing
- Caching for repeated measurements
- Asynchronous processing where possible
- Memory management for large image data