// SDF-FT16BM2Remote - JavaScript Functions Lab
// Secure Login Tracker Implementation

/**
 * Creates a login tracker with limited attempts
 * @param {Object} userInfo - User credentials
 * @param {string} userInfo.username - The username
 * @param {string} userInfo.password - The password
 * @returns {Function} A function that validates login attempts
 */
const createLoginTracker = (userInfo) => {
    // Private variables using closure
    let attempts = 0;
    const maxAttempts = 3;
    let locked = false;

    /**
     * Inner arrow function that handles login attempts
     * @param {string} inputUsername - Username input
     * @param {string} inputPassword - Password input
     * @returns {string} Login attempt result message
     */
    const attemptLogin = (inputUsername, inputPassword) => {
        // Check if account is locked
        if (locked) {
            return "Account locked. Please contact support.";
        }

        // Validate credentials
        if (inputUsername === userInfo.username && inputPassword === userInfo.password) {
            attempts = 0; // Reset attempts on successful login
            return "Login successful!";
        } else {
            attempts++; // Increment failed attempts
            
            // Check if account should be locked
            if (attempts >= maxAttempts) {
                locked = true;
                return "Too many failed attempts. Account locked.";
            }
            
            // Return remaining attempts
            const remaining = maxAttempts - attempts;
            return `Invalid credentials. ${remaining} attempt(s) remaining.`;
        }
    };

    return attemptLogin;
};

// Export for testing
module.exports = { createLoginTracker };

// Example usage (for demonstration purposes)
if (require.main === module) {
    console.log("=== Login System Demo ===\n");
    
    // Create a login tracker for a user
    const userLogin = createLoginTracker({
        username: "admin",
        password: "secure123"
    });
    
    // Test scenarios
    console.log("Test 1 - Wrong credentials:");
    console.log(userLogin("admin", "wrongpass")); // 2 attempts remaining
    
    console.log("\nTest 2 - Wrong credentials again:");
    console.log(userLogin("admin", "wrongpass")); // 1 attempt remaining
    
    console.log("\nTest 3 - Wrong credentials third time:");
    console.log(userLogin("admin", "wrongpass")); // Account locked
    
    console.log("\nTest 4 - Attempt after lock:");
    console.log(userLogin("admin", "secure123")); // Already locked
    
    // Create a new user to show successful login
    console.log("\n=== New User Login Test ===");
    const newUserLogin = createLoginTracker({
        username: "user1",
        password: "pass123"
    });
    
    console.log("\nTest 5 - Wrong then correct:");
    console.log(newUserLogin("user1", "wrong")); // 2 attempts remaining
    console.log(newUserLogin("user1", "pass123")); // Login successful
    
    console.log("\nTest 6 - Login after success (should work):");
    console.log(newUserLogin("user1", "pass123")); // Still works
}