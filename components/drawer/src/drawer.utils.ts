export function calculateSpeed(values: number[]): number[] {
  return values.map((_, i) => values[i] - (values[i-1] || 0));
}

export function calculateAverage(values: number[]): number {
  return values.reduce((total, next) => total + next) / values.length;
}
