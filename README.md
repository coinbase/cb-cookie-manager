# Coinbase Cookie Manager

**Coinbase Cookie Manager is a lightweight package for first-party client side cookies that helps adhere to CCPA and GDPR cookie regulations**

![Demo](./.github/record.gif)

# Contents

- [Introduction](#introduction)
- [Getting Started](#GettingStarted)
- [Packages](#packages)
- [Contributing](#contributing)
- [License](#License)

## Introduction

It can manage four different types of first-party client side cookies:

- `Necessary Cookies`: Cookies that are necessary for the site to function
- `Performance Cookies`: Cookies that impact site performance and help mesaure performance
- `Functional Cookies`: Cookies to improve the functionality of the site
- `Targeting Cookies`: Cookies used for advertising and ad targeting

## Getting Started

This repo uses a yarn workspace. To get started with the example app:

```shell
cd /path/to/coinbase/cb-cookie-manager

# Install Dependencies and Build Packages
yarn install
yarn build

# Run Example App
cd /path/to/coinbase/cb-cookie-manager/example/app
yarn dev
```

## Packages

- `@coinbase/cookie-manager`: Package that helps with managing first party client side cookies to adhere to CCPA and GDPR Cookie regulations. More information [here](./packages/cookie-manager/README.md)

- `@coinbase/cookie-banner`: Banner and modal to allow users to choose their cookie preferences.
  More information [here](./packages/cookie-banner/README.md)

- `example`: Example app built using NextJS which uses both `@coinbase/cookie-manager` and `@coinbase/cookie-banner`. Code [here](./apps/example/)

## Contributing

Commit signing is required for contributing to this repo.
For details, see the docs on [contributing](./CONTRIBUTING.md) and [commit-signing](./docs/commit-signing.md).

## License

Licensed under the Apache License. See [LICENSE](./LICENSE) for more information.
