
import { unitTests } from './unit.test.ts';
import { integrationTests } from './integration.test.ts';

export interface TestCase {
  id: string;
  name: string;
  category: 'unit' | 'integration';
  run: () => Promise<void>;
}

export const allTests: TestCase[] = [
  ...unitTests.map(t => ({ ...t, category: 'unit' as const })),
  ...integrationTests.map(t => ({ ...t, category: 'integration' as const }))
];
