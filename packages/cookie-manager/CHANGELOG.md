# Changelog

## 1.1.7 (07/17/2024)

- Include Tracker in the list of exported types

## 1.1.6 (07/17/2024)

- Include trackerMatches in the list of exported methods

## 1.1.5 (06/12/2024)

- Added support for initialCookieValues, initialGPCValue

## 1.1.4 (06/11/2024)

- Updated next version from 14.0.0 to 14.1.1
- Updated braces from 3.0.2 to 3.0.3
- Removed call to Buffer
- Ensure navigator is defined before referencing

## 1.1.3 (05/03/2024)

- Added logic to honor GCP in non-EU localities
- Fixed failing spec

## 1.1.2 (02/26/2024)

#### 🚀 Updates

- Remove check for `is_mobile_app` from URL parameter from a WebView and use `app_tracking_transparency_enabled` to persist `is_mobile_app` cookie. This implementation is used to honor the Apple Do Not Track (DNT) configuration from a users' device instead of disabling cookies solely because the request is coming from a mobile device.

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
