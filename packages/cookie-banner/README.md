# Cookie Banner

**Banner and modal UI to allow users to choose their cookie preferences**

# Contents

- [Installation](#installation)
- [UI](#specs)
  - [Cookie Banner](#cookie-banner)
  - [Cookie Preferences Modal](#cookie-preferences-modal)
- [Hooks](#hooks)
  - [useIsBannerVisible](#useisbannervisible)
  - [useTranslations](#usetranslations)
- [License](#license)

## Installation

Install the package as follows:

**Note: This package requires react and react-dom as peer dependencies**

```shell
yarn add @coinbase/cookie-manager @coinbase/cookie-banner

npm install @coinbase/cookie-manager @coinbase/cookie-banner

pnpm install @coinbase/cookie-manager @coinbase/cookie-banner
```

## UI

### Cookie Banner

This banner must be a child of `@coinbase/cookie-manager` provider. It takes an optional theme prop (see [theme section](#theme)). Otherwise, it will default to the Coinbase theme.

It takes the following props:

- `link` : Link to your Cookie Policy
- `useTranslations` - Hook to return translations for your cookie banner's texts. More info [here](#usetranslations)
- `companyName` - Name of your comapany/product

Example usage:

```typescript
import { CookieBanner } from '@coinbase/cookie-banner';

const SomeComponent = () => {
    return (
        <CookieBanner
            link={'https://www.coinbase.com/legal/cookie'}
            useTranslations={useTranslations}
            companyName={'XYZ'}
        />
    )
};
```

### Cookie Preferences Modal

Modal to allow user's to choose their cookie preferences.

This modal must be a child of `@coinbase/cookie-manager` Provider. It takes the following props:

```typescript
onClose: () => void: Callback to close the modal

isOpen: boolean: Boolean for whether modal is open

theme?: Theme: Defaults to Coinbase theme
```

Usage:

```typescript

import { CookiePreferencesModal } from '@coinbase/cookie-banner';

const CookiePreferences = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <CookiePreferencesModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <ModalButton
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </ModalButton>
    </>
  );
};
```

## Hooks

### useIsBannerVisible

It is used to determine if the user has already chosen their cookie preferences or not. It checks if `cm_default_preferences` or `cm_eu_preferences` has been set in the browser's based on user's region. If already set, it returns false otherwise it returns true.

If the user deletes this cookie or if `cm_default_preferences`/`cm_eu_preferences` expires (expiry of 1 year), it returns true.

```typescript
import { CookieBanner } from '@coinbase/cookie-banner';

const SomeComponent = () => {
    const visible = useIsBannerVisible();
    return (
        <div>
            {visible ? <CookieBanner /> : <div> Hello World </div>}
        </div>;
    )
};
```

### Theme

The theme is used for styling the banner and preferences modal. Each one of the below properties is required. If a theme is not provided then the below default Coinbase theme is applied.

```css
export default {
  colors: {
    primary: '#1652F0',
    positive: '#05B169',
    negative: '#DF5F67',
    warning: '#F4C622',
    background: '#FFFFFF',
    backgroundMuted: '#FAFBFC',
    onBackground: '#050F1A',
    onBackgroundMuted: '#708599',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(17,52,83,0.6)',
  },
  border: {
    border: '1px solid #D8D8D8',
    borderRadius: '4px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
  },
  fontWeight: {
    regular: '400',
    bold: '500',
  },
  size: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  breakpoints: {
    phone: 560,
    desktop: 992,
    tablet: 768,
  },
  zIndex: {
    high: 2,
    overlay: 1000,
  },
};
```

### useTranslations

It should have the following definition:

`useTranslations = (): [boolean,  Record<string, string>]`

where boolean type should be false if translations were not loaded and true otherwise

The `Record<string,string>` object should look like the following (example in french):

```json
{
  "CookieManager.defaultBannerDescription": "Nous utilisons nos propres cookies ainsi que des cookies de tiers sur nos sites Web pour améliorer votre expérience, analyser notre trafic et à des fins de sécurité et de marketing. Pour obtenir plus d'informations ou modifier les cookies, consultez notre <link>Politique relative aux cookies</link> ou accédez à <button>Gérer les paramètres</button>.",
  "CookieManager.euBannerDescription": "Nous utilisons nos propres cookies ainsi que des cookies de tiers sur nos sites web pour améliorer votre expérience de navigation, analyser notre trafic, et à des fins de sécurité et de marketing. Pour obtenir plus d'informations ou modifier les cookies, consultez notre <link>politique relative aux cookies</link> ou rendez-vous dans <button>Gérer les paramètres</button>. Sélectionnez « Tout accepter » pour autoriser leur utilisation.",
  "CookieManager.bannerSettingsCTA": "Gérer les paramètres",
  "CookieManager.bannerCloseCTA": "Fermer",
  "CookieManager.bannerDismissCTA": "Fermer",
  "CookieManager.bannerAcceptCTA": "Accepter tout",
  "CookieManager.modalTitle": "Préférences en matière de cookies",
  "CookieManager.modalDescription": "Lorsque vous naviguez sur notre site Web, nous pouvons stocker des cookies sur votre navigateur à des fins de sécurité ainsi que pour nous aider à mieux comprendre le comportement de l'utilisateur et savoir quelles sections de notre site Web vous avez consultées. Ces informations ne permettent pas de vous identifier directement, mais elles peuvent vous offrir une expérience sûre et plus personnalisée sur Internet. Comme nous respectons votre droit à la vie privée, vous pouvez refuser certains types de cookies. Le blocage de certains types de cookies peut affecter votre expérience sur le site. <link>Politique relative aux cookies</link>",
  "CookieManager.manageCookies": "Gérer les cookies :",
  "CookieManager.necessaryCookies": "Cookies strictement nécessaires",
  "CookieManager.necessaryCookiesDescription": "Ces cookies sont nécessaires pour le bon fonctionnement du site Web et ne peuvent pas être désactivés dans nos systèmes. Ils ne sont généralement définis qu'en réponse à des actions que vous effectuez et qui équivalent à une demande de services, telles que la définition de vos préférences en matière de confidentialité, la connexion ou le remplissage de formulaires. Cela inclut également les cookies que nous pouvons utiliser pour prévenir la fraude. Vous pouvez configurer votre navigateur de façon à bloquer ces cookies ou vous avertir de leur transmission, mais certaines sections du site ne fonctionneront pas.",
  "CookieManager.performanceCookies": "Cookies de performance",
  "CookieManager.performanceCookiesDescription": "Ces cookies nous permettent de compter les visites et les sources de trafic afin de pouvoir évaluer et améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et à voir comment les visiteurs naviguent dans le site. Toutes les informations collectées par ces cookies sont agrégées et donc anonymes. Si vous n'autorisez pas ces cookies, nous ne saurons pas à quel moment vous avez consulté notre site et ne pourrons pas surveiller ses performances.",
  "CookieManager.functionalCookies": "Cookies fonctionnels",
  "CookieManager.functionalCookiesDescription": "Ces cookies nous permettent de mémoriser les options que vous avez choisies dans le passé afin d'améliorer les fonctionnalités et la personnalisation (par exemple, votre langue préférée). Si vous n'autorisez pas ces cookies, certains ou l'ensemble de ces services peuvent ne pas fonctionner correctement.",
  "CookieManager.targetingCookies": "Cookies de ciblage",
  "CookieManager.targetingCookiesDescription": "Ces cookies peuvent être placés sur notre site par nos partenaires publicitaires. Ils peuvent être utilisés par ces sociétés afin de créer un profil de vos centres d'intérêt et de vous montrer des publicités pertinentes sur d'autres sites. Ils ne stockent pas directement des informations personnelles, mais permettent une identification unique de votre navigateur et de votre appareil Internet. Si vous n'autorisez pas ces cookies, vous verrez des publicités moins ciblées.",
  "CookieManager.saveCTA": "Enregistrer"
}
```

The returned record should contain all the keys mentioned in this example. All the keys are also mentioned in [messages.ts](./src/utils/messages.ts) and start with `{i18nKey}`

## License

Licensed under the Apache License. See [LICENSE](./LICENSE) for more information.
