// JavaScript Functions Lab - Secure Login Tracker

const createLoginTracker = (userInfo) => {
    let attempts = 0;
    const maxAttempts = 3;
    let locked = false;

    const attemptLogin = (inputUsername, inputPassword) => {
        if (locked) {
            return "Account locked. Please contact support.";
        }

        if (inputUsername === userInfo.username && inputPassword === userInfo.password) {
            attempts = 0;
            return "Login successful!";
        } else {
            attempts++;

            if (attempts >= maxAttempts) {
                locked = true;
                return "Too many failed attempts. Account locked.";
            }

            const remaining = maxAttempts - attempts;
            return `Invalid credentials. ${remaining} attempt(s) remaining.`;
        }
    };

    return attemptLogin;
};

// Export for testing
module.exports = { createLoginTracker };
