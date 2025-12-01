const { createLoginTracker } = require('./index.js');

describe('createLoginTracker', () => {
  test('should return a function', () => {
    const tracker = createLoginTracker({ username: 'test', password: 'test' });
    expect(typeof tracker).toBe('function');
  });

  test('should keep track of wrong login count', () => {
    const tracker = createLoginTracker({ username: 'user', password: 'pass' });
    tracker('user', 'wrong');
    tracker('user', 'wrong');
    const result = tracker('user', 'wrong');
    expect(result).toBe('Too many failed attempts. Account locked.');
  });

  test('should limit login attempts to be 3', () => {
    const tracker = createLoginTracker({ username: 'user', password: 'pass' });
    tracker('user', 'wrong'); // 1st attempt
    tracker('user', 'wrong'); // 2nd attempt
    const result = tracker('user', 'wrong'); // 3rd attempt
    expect(result).toBe('Too many failed attempts. Account locked.');
  });

  test('should allow correct login immediately', () => {
    const tracker = createLoginTracker({ username: 'admin', password: '1234' });
    const result = tracker('admin', '1234');
    expect(result).toBe('Login successful!');
  });

  test('should allow correct login after failed login', () => {
    const tracker = createLoginTracker({ username: 'user', password: 'pass' });
    tracker('user', 'wrong'); // 1st failed attempt
    const result = tracker('user', 'pass'); // Correct login
    expect(result).toBe('Login successful!');
  });
});
