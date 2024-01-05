# Changelog

## 1.1.1 (01/05/2024)

#### Bug

- Initialized the Cookie values

## 1.1.0 (12/14/2023)

#### 🚀 Updates

- Updated cookie config to include retention durations at both category and cookie levels.
- Introduced an optional boolean field `sessionCookie` in cookie config to accommodate session cookies.
- Implemented a setExpiryForCookie hook that adjusts the cookie's expiration in the following manner:
  - If the sessionCookie parameter is enabled, the expiry is set to session
  - If an expiry is specified at the cookie level, it takes precedence; otherwise, the expiry is derived from the category's expiration setting.

## 1.0.0 (12/7/2023)

#### 🚀 Updates

Package Created
