// Environment variable validation

export function validateEnv() {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate JWT_SECRET is not using default value
  if (process.env.JWT_SECRET === 'your_jwt_secret_key_here_change_in_production') {
    throw new Error('JWT_SECRET must be changed from default value in production');
  }

  // Validate JWT_SECRET length
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('WARNING: JWT_SECRET should be at least 32 characters for security');
  }
}

export function getEnv(key: string, defaultValue?: string): string {
  return process.env[key] || defaultValue || '';
}
