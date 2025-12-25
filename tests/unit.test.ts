
import * as calculations from '../utils/calculations.ts';

export const unitTests = [
  {
    id: 'u1',
    name: 'calculateTotalPrice(25, 2) returns 50',
    run: async () => {
      const result = calculations.calculateTotalPrice(25, 2);
      if (result !== 50) throw new Error(`Expected 50, got ${result}`);
    }
  },
  {
    id: 'u2',
    name: 'calculateTotalPrice handles negative seats',
    run: async () => {
      const result = calculations.calculateTotalPrice(25, -1);
      if (result !== 0) throw new Error(`Expected 0 for negative seats, got ${result}`);
    }
  },
  {
    id: 'u3',
    name: 'formatCardNumber inserts spaces correctly',
    run: async () => {
      const input = '1234567812345678';
      const result = calculations.formatCardNumber(input);
      if (result !== '1234 5678 1234 5678') throw new Error(`Got: ${result}`);
    }
  },
  {
    id: 'u4',
    name: 'validateEmail rejects invalid format',
    run: async () => {
      const result = calculations.validateEmail('invalid-email');
      if (result === true) throw new Error('Should have rejected invalid-email');
    }
  },
  {
    id: 'u5',
    name: 'getDurationMinutes parses "2h 30m" to 150',
    run: async () => {
      const result = calculations.getDurationMinutes('2h 30m');
      if (result !== 150) throw new Error(`Expected 150, got ${result}`);
    }
  }
];
