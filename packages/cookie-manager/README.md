# Cookie Manager

**Helps with managaing first-party client side cookies to adhere to CCPA and GDPR Cookie regulations**

# Contents

- [Installation](#installation)
- [Introduction](#Introduction)
- [Methods](#methods)
  - [Provider](#provider)
  - [useCookie](#usecookie)
  - [useHasConsent](#usehasconsent)
  - [useRequiredCategories](#userequiredcategories)
  - [useSavedTrackingPreference](#usesavedtrackingpreference)
  - [useSetTrackingPreference](#usesettrackingpreference)
  - [useTrackingPreference](#usesettrackingpreference)
  - [areCookiesEnabled](#arecookiesenabled)
  - [getDefaultTrackingPreference](#getdefaulttrackingpreference)
  - [useTrackingManager](#usetrackingmanager)
  - [isOptOut](#isoptout)
- [License](#license)

## Installation

Install the package as follows:

```shell
yarn add @coinbase/cookie-manager

npm install @coinbase/cookie-manager

pnpm install @coinbase/cookie-manager
```

## Introduction

`@coinbase/cookie-manager` helps manage the following first party client side cookie categories:

- `Necessary Cookies`: Cookies that are necessary for the site to the function
- `Performance Cookies`: Cookies that impact site performance and help mesaure performance
- `Functional Cookies`: Cookies to improve the functionality of the site
- `Targeting Cookies`: Cookies used for advertising and ad targeting

The preferences is stored as `cm_eu_preference` cookie in case the user is from EU or as `cm_default_preference` cookie in any other case

A `cm_default_preference` cookie looks like the following:

```json
{
  "region": "DEFAULT",
  "consent": ["necessary", "performance", "functional", "targeting"]
}
```

Where region is `DEFAULT` and consent specifies what types of cookie categories the user has given preference too. This is stored as a strictly necessary cookie and has an expiration duration of 1 year.

Cookie Manager accepts a config like this:

```typescript
import {
  Framework,
  Region,
  TrackerType,
  TrackingCategory,
} from '@coinbase/cookie-manager';

export default {
  categories: [
    {
      id: TrackingCategory.NECESSARY,
      required: true,
      expiry: 365,
      trackers: [
        {
          id: 'locale',
          type: TrackerType.COOKIE,
          expiry: new Date('2024-09-29T00:00:00.000Z'),
        },
      ],
    },
    {
      id: TrackingCategory.PERFORMANCE,
      expiry: 365,
      trackers: [
        {
          id: 'some_cookie',
          type: TrackerType.COOKIE,
          sessionCookie: true,
        },
      ],
    },
    {
      id: TrackingCategory.FUNCTIONAL,
      expiry: 365,
      trackers: [
        {
          id: 'mode',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.TARGETING,
      expiry: 365,
      trackers: [
        {
          id: 'id-regex',
          type: TrackerType.COOKIE,
          regex: 'id(?:_[a-f0-9]{32}|undefined)(?:.*)',
        },
      ],
    },
    {
      id: TrackingCategory.DELETE_IF_SEEN,
      expiry: 0,
      trackers: [
        {
          id: 'cgl_prog',
          type: TrackerType.COOKIE,
        },
      ],
    },
  ],
  geolocationRules: [
    {
      region: Region.DEFAULT,
      framework: Framework.OPT_OUT,
    },
    {
      region: Region.EU,
      framework: Framework.OPT_IN,
    },
  ],
};
```

In this config, under each category you can specify what all cookies that should be allowed. Everything else, if detected will be deleted at an interval of 500 ms.

`DELETE_IF_SEEN` can be used to specify the cookies which should be deleted if seen on the browser

You can also specify regex for a given cookie as follows:

```json
{
    id: 'id-regex',
    type: TrackerType.COOKIE,
    regex: 'id(?:_[a-f0-9]{32}|undefined)(?:.*)',
}
```

Any id with `-regex` at the end should contain a `regex` which will be used to match different cookies.

In this example: `id_ac7a5c3da45e3612b44543a702e42b01` will also be allowed.

You need to specify the retention days for a category using the expiry key as follows:

```
{
      id: TrackingCategory.NECESSARY,
      required: true,
      expiry: 365,
      trackers: [
        {
          id: 'locale',
          type: TrackerType.COOKIE,
          expiry: new Date('2024-09-29T00:00:00.000Z'),
        },
      ],
    }

```

Each cookie by default will inherit its category's retention duration but you can override this by specifying an expiry (in days) for the cookie:

```
 {
    id: 'locale',
    type: TrackerType.COOKIE,
    expiry: 10
}
```

If you want a cookie to only be valid for a session, it can optionally be marked as a session cookie as follows:

```
{
  id: 'some_cookie',
  type: TrackerType.COOKIE,
  sessionCookie: true
}
```

**Note: Session cookies only last as long as your browser is open and are automatically deleted when a user closes the browser**

## Methods

### Provider

The provider must wrap the entire application and only be instantiated once. On mount, it will remove all blocked cookies (i.e. cookies that do not have user consent). It takes the following props:

`onError: (error: Error) => void`: Error function

`projectName: string`: Current project name

`locale: string`: Locale to be displayed

`region: 'EU' | 'DEFAULT'`; `DEFAULT` refers to non-EU countries

`onPreferenceChange?: (preference: TrackingPreference) => void`: Callback for when user consent preferences change. This will also be called on mount.

`config: Config`: Cookie manager config. See [Config](#config) section below

`shadowMode?: boolean`: Cookies will not be removed in this mode

`log: (str: string, options?: Record<string, any>) => void`: Log function

Example usage:

```typescript
import { Provider, Region, TrackingCategory, TrackingPreference } from '@coinbase/cookie-manager';

<Provider
  onError={notifyError}
  onPreferenceChange={() => {}}
  locale={localeCode}
  region={isInEU(locale.country) ? Region.EU : Region.Default}
  projectName="consumer-marketing"
  config={cookieManagerConfig}
  log={eventTracking.track}
  shadowMode
  >
  {children}
</Provider>

```

### useCookie

You should replace all usages of setting, removing or getting cookies with the `useCookie` hook. The cookie manager will prevent any non-consented cookies from being set. Passing `undefined` or `null` to the set cookie function will remove that cookie. You can also pass optional parameters to change the cookie properties.

It accepts the following props:

```
`cookieName`: Name of the cookie for which you want to perform operations
```

`useCookie` returns the current `cookie` value and a `setCookieFunction`

`setCookieFunction` can take in the following props:

- `value`: The value to be set for the cookie
- `CookieAttributes`: This is optional but you can specify the following properties for a cookie:

```typescript
interface CookieAttributes {
  /**
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: number | Date;

  /**
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string;

  /**
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string;

  /**
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean;

  /**
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: 'strict' | 'lax' | 'none';

  /**
   * An attribute which will be serialized, conformably to RFC 6265
   * section 5.2.
   */
  [property: string]: any;
}
```

Example usage:

```typescript
import { useCookie } from '@cb/cookie-manager';

const SomeComponent = () => {
  const [cookie, setCookie] = useCookie('some_cookie');
  const handleClick = () => {
    setCookie('hello')
  };

  return (
    <div>
      <button onClick={handleClick}>Set cookie</button>
      <span>Current cookie: </span>
      <span>{cookie}</span>
    </div>
}
```

### useHasConsent

This is a hook for programmatically determining if a tracker (e.g. cookie) has been consented to by the user.

```typescript
import { useHasConsent } from '@coinbase/cookie-manager';

const SomeComponent = () => {
  const hasConsent = useHasConsent('cookie');

  return (
    <div>
      {hasConsent && <div> Cookie has consent </div>
    </div>
}
```

### useRequiredCategories

This hook is used to determine which category of cookies is required.

Example Usage:

```typescript
import { useRequiredCategories, TRACKER_CATEGORIES } from '@coinbase/cookie-manager';

const SomeComponent = () => {
  const requiredCategories = useRequiredCategories();

  return (
    <div>
       <CategoryContainer>
          {TRACKER_CATEGORIES.map(t => (
            <CheckBoxContainer key={t}>
              <CheckBox
                disabled={requiredCategories.includes(t)}
                checked={state.consent.includes(t)}
                onChange={(val: boolean) => dispatch({ name: t, value: val })}
              >
                <CategoryLabel name={t} />
              </CheckBox>
            </CheckBoxContainer>
          ))}
        </CategoryContainer>
    </div>
}
```

### useSavedTrackingPreference

This hook is used to retrieve the saved cookie preference in cache

Example Usage:

```typescript
import { useSavedTrackingPreference } from '@coinbase/cookie-manager';

const SomeComponent = () => {
  const preference = useSavedTrackingPreference();

  return (
    <div>
       {preference}
    </div>
  )
}
```

### useSetTrackingPreference

This hook is used to set the saved cookie preference in cache

Example Usage:

```typescript
import { useSetTrackingPreference, Region, TrackingCategory } from '@coinbase/cookie-manager';

const SomeComponent = () => {
    const setTrackingPreference = useSetTrackingPreference();

    const handleSave = useCallback(() => {
        setTrackingPreference({
            region: Region.Default,
            consent: [TrackingCategory.Functional],
        });
        console.log('cookie_consent_manager_saved_tapped');
    }, [setTrackingPreference]);

  return (
    <div>
        <Button onClick={handleSave} large>
            Save Preference
        </Button>
    </div>
  )
}
```

### useTrackingPreference

This hook returns the cached preference and if no preference is cached, it returns the default preference based on user's region

Example Usage:

```typescript
import { useTrackingPreference } from '@coinbase/cookie-manager';

const SomeComponent = () => {
  const initialTrackingPreference = useTrackingPreference();

  return (
    <div>
       {initialTrackingPreference}
    </div>
  )
}
```

### areCookiesEnabled

This hook is used to determine if cookies have been enabled on user's browser

Example usage:

```typescript

import { areCookiesEnabled } from '@coinbase/cookie-manager';


const SomeComponent = () => {
  const enabled = areCookiesEnabled();

  return (
    <div>
       {enabled? <div> Cookies Enabled </div> : <div> Cookies not enabled </div>}
    </div>
  )
}
```

### getDefaultTrackingPreference

This hook is used to retrieve the default tracking preference for a given user based on their region

Example usage:

```typescript
import { getDefaultTrackingPreference } from '@coinbase/cookie-manager';

const SomeComponent = () => {
  const preference = getDefaultTrackingPreference();

  return (
    <div>
       {preference}
    </div>
  )
}
```

### useTrackingManager

This hook is used to return `TrackingManagerDependencies` which includes all the values/methods which were passed into Cookie Manager Provider

Example usage:

```typescript
import { isOptOut, useTrackingManager } from '@coinbase/cookie-manager';

const SomeComponent = () => {
  const { region } = useTrackingManager();
  const optOut = isOptOut(region);

  return (
    <div>
       `Region for the given user is ${region}`
    </div>
  )
}
```

### isOptOut

Used for determining if the current region is using the `optOut` framework

It follows the following logic in order:

- If there's no geolocation rule for the specified region then use the rule for DEFAULT region
- Otherwise use the following rules:
  - optIn: Users must opt in to tracking (EU)
  - optOut: Users must opt out of tracking (non-EU)

Example usage:

```typescript
import { isOptOut, useTrackingManager } from '@coinbase/cookie-manager';

const SomeComponent = () => {
  const { region } = useTrackingManager();
  const optOut = isOptOut(region);

  return (
    <div>
       {isOptOut ? <div> In default region </div> : <div> In Eu </div>}
    </div>
  )
}
```

## License

Licensed under the Apache License. See [LICENSE](./LICENSE.md) for more information.
