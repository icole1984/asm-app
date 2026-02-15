// Environment variable validation
export function validateEnv() {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'PORT',
  ];

  const optional = [
    'CORS_ORIGIN',
    'JWT_EXPIRE',
    'BCRYPT_ROUNDS',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
    'AWS_S3_BUCKET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please create a .env file with all required variables.'
    );
  }

  // Validate JWT_SECRET is not the default
  if (process.env.JWT_SECRET === 'secret') {
    throw new Error('JWT_SECRET must be changed from the default value for security');
  }

  // Log optional missing variables as warnings
  const missingOptional = optional.filter((key) => !process.env[key]);
  if (missingOptional.length > 0) {
    console.warn(`⚠️  Optional environment variables not set: ${missingOptional.join(', ')}`);
  }
}

// Get environment variables with defaults
export const env = {
  PORT: process.env.PORT || '5000',
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  NODE_ENV: process.env.NODE_ENV || 'development',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || 'asm-documents',
};
