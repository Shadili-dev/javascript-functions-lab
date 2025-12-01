function createLoginTracker(userInfo) {
let attempts = 0;
let isLocked = false;

```
const login = (username, password) => {
    if (isLocked) {
        return "Account locked";
    }

    if (username === userInfo.username && password === userInfo.password) {
        return "Login successful";
    }

    attempts++;

    if (attempts >= 3) {
        isLocked = true;
        return "Account locked";
    }

    return "Invalid credentials";
};

return login;
```

}

module.exports = createLoginTracker;
