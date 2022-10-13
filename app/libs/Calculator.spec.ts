import {Calculator} from './Calculator';

describe('Test suite for Calculator.ts', () => {
  let calculator;
  beforeAll(() => {
    calculator = new Calculator()
  });

  it('printAction should to be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });
});
