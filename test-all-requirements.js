const { createLoginTracker } = require('./index.js');

console.log('=== Testing All Possible Requirements ===\n');

// Requirement 1: Returns a function
const tracker = createLoginTracker({ username: 'test', password: 'test' });
const req1 = typeof tracker === 'function';
console.log(`1. Returns a function: ${req1 ? '✅' : '❌'}`);

// Requirement 2: Keeps track of wrong login count
const tracker2 = createLoginTracker({ username: 'user', password: 'pass' });
tracker2('user', 'wrong');
tracker2('user', 'wrong');
const result2 = tracker2('user', 'wrong');
const req2 = result2 === 'Too many failed attempts. Account locked.';
console.log(`2. Tracks wrong login count (locks after 3): ${req2 ? '✅' : '❌'}`);

// Requirement 3: Limits login attempts to 3
const tracker3 = createLoginTracker({ username: 'user', password: 'pass' });
tracker3('user', 'wrong');
tracker3('user', 'wrong');
const result3 = tracker3('user', 'wrong');
const req3 = result3 === 'Too many failed attempts. Account locked.';
console.log(`3. Limits attempts to 3: ${req3 ? '✅' : '❌'}`);

// Requirement 4: Allows correct login immediately
const tracker4 = createLoginTracker({ username: 'admin', password: '1234' });
const result4 = tracker4('admin', '1234');
const req4 = result4 === 'Login successful!';
console.log(`4. Allows correct login immediately: ${req4 ? '✅' : '❌'}`);

// Requirement 5: Allows correct login after failed login
const tracker5 = createLoginTracker({ username: 'user', password: 'pass' });
tracker5('user', 'wrong');
const result5 = tracker5('user', 'pass');
const req5 = result5 === 'Login successful!';
console.log(`5. Allows correct login after failed login: ${req5 ? '✅' : '❌'}`);

// Additional edge cases
console.log('\n=== Edge Cases ===');

// Should reset attempts on successful login
const tracker6 = createLoginTracker({ username: 'u', password: 'p' });
tracker6('u', 'wrong'); // 1st fail
tracker6('u', 'p');     // Success - should reset
const edge1 = tracker6('u', 'wrong'); // Should say "2 attempt(s) remaining"
console.log(`6. Resets attempts on success: ${edge1.includes('2 attempt') ? '✅' : '❌'}`);

// Should stay locked
const tracker7 = createLoginTracker({ username: 'u', password: 'p' });
tracker7('u', 'wrong');
tracker7('u', 'wrong');
tracker7('u', 'wrong'); // Locked
const lockedResult = tracker7('u', 'p');
console.log(`7. Stays locked: ${lockedResult.includes('locked') ? '✅' : '❌'}`);

const allPass = req1 && req2 && req3 && req4 && req5;
console.log(`\n${allPass ? '🎉 ALL REQUIREMENTS MET!' : '⚠️ Some requirements missing'}`);
