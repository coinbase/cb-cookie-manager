import { defineMessages } from 'react-intl';
const i18nKey = 'CookieManager';

const messages = defineMessages({
  defaultBannerDescription: {
    id: `${i18nKey}.defaultBannerDescription`,
    defaultMessage:
      'We use cookies and similar technologies on our websites to enhance and tailor your experience, analyze our traffic, and for security and marketing. You can choose not to allow some type of cookies by clicking <button>Manage Settings</button>. For more information see our <link>Cookie Policy</link>.',
    description: 'Cookie banner for managing cooking consent preferences',
  },
  euBannerDescription: {
    id: `${i18nKey}.euBannerDescription`,
    defaultMessage:
      'We use cookies and similar technologies on our websites to enhance and tailor your experience, analyze our traffic, and for security and marketing. Select "Accept All" to allow Coinbase and its trusted affiliates and partners to use cookies and similar technologies or click <button>Manage Settings</button> to individually select which cookies you allow. You can withdraw your consent at any time. For more information see our <link>Cookie Policy</link>.',
    description: 'Cookie banner for managing cooking consent preferences',
  },
  bannerSettingsCTA: {
    id: `${i18nKey}.bannerSettingsCTA`,
    defaultMessage: 'Manage settings',
    description: 'Button for customizing cookie consent preferences',
  },
  bannerCloseCTA: {
    id: `${i18nKey}.bannerCloseCTA`,
    defaultMessage: 'Close',
    description: 'Button for refusing cookie consent preferences',
  },
  bannerDismissCTA: {
    id: `${i18nKey}.bannerDismissCTA`,
    defaultMessage: 'Dismiss',
    description: 'Button for accepting cookie consent preferences',
  },
  bannerAcceptCTA: {
    id: `${i18nKey}.bannerAcceptCTA`,
    defaultMessage: 'Accept all',
    description: 'Button for accepting cookie consent preferences',
  },
  modalTitle: {
    id: `${i18nKey}.modalTitle`,
    defaultMessage: 'Cookie preferences',
    description: "Modal title for user's cookie preferences",
  },
  modalDescription: {
    id: `${i18nKey}.modalDescription`,
    defaultMessage:
      'When you visit our website, we may store cookies on your browser for your security and to help us better understand user behavior and inform us about which parts of our website you have visited. The information does not usually directly identify you, but it can give you a safe and more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Blocking some types of cookies may impact your experience on the site. <link>Cookie Policy</link>',
    description: "Modal description for user's cookie preferences",
  },
  manageCookies: {
    id: `${i18nKey}.manageCookies`,
    defaultMessage: 'Manage Cookies:',
    description: "Modal title for user's cookie preferences",
  },
  necessaryCookies: {
    id: `${i18nKey}.necessaryCookies`,
    defaultMessage: 'Strictly Necessary Cookies',
    description: 'Cookies that are necessary for the site to the function',
  },
  necessaryCookiesDescription: {
    id: `${i18nKey}.necessaryCookiesDescription`,
    defaultMessage:
      'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. These also include cookies we may rely on for fraud prevention. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.',
    description: 'Cookies that are necessary for the site to the function',
  },
  performanceCookies: {
    id: `${i18nKey}.performanceCookies`,
    defaultMessage: 'Performance Cookies',
    description: 'Cookies that impact site performance',
  },
  performanceCookiesDescription: {
    id: `${i18nKey}.performanceCookiesDescription`,
    defaultMessage:
      'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.',
    description: 'Cookies that impact site performance',
  },
  functionalCookies: {
    id: `${i18nKey}.functionalCookies`,
    defaultMessage: 'Functional Cookies',
    description: 'Cookies to improve the functionality of the site',
  },
  functionalCookiesDescription: {
    id: `${i18nKey}.functionalCookiesDescription`,
    defaultMessage:
      'These cookies enable us to remember choices you have made in the past in order to provide enhanced functionality and personalisation (e.g. what language you prefer). If you do not allow these cookies then some or all of these services may not function properly.',
    description: 'Cookies to improve the functionality of the site',
  },
  targetingCookies: {
    id: `${i18nKey}.targetingCookies`,
    defaultMessage: 'Targeting Cookies',
    description: 'Cookies used for advertising and ad targeting',
  },
  targetingCookiesDescription: {
    id: `${i18nKey}.targetingCookiesDescription`,
    defaultMessage:
      'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.',
    description: 'Cookies used for advertising and ad targeting',
  },
  saveCTA: {
    id: `${i18nKey}.saveCTA`,
    defaultMessage: 'Save',
    description: 'CTA to save cookie preferences',
  },
});

const categoryMessages = {
  labelIds: {
    necessary: messages.necessaryCookies,
    performance: messages.performanceCookies,
    functional: messages.functionalCookies,
    targeting: messages.targetingCookies,
  },
  contentIds: {
    necessary: messages.necessaryCookiesDescription,
    performance: messages.performanceCookiesDescription,
    functional: messages.functionalCookiesDescription,
    targeting: messages.targetingCookiesDescription,
  },
};

const defaultMessages = {
  defaultBannerDescription: messages.defaultBannerDescription,
  bannerSettingsCTA: messages.bannerSettingsCTA,
  bannerMainCTA: messages.bannerAcceptCTA,
  bannerDismissCTA: messages.bannerDismissCTA,
  modalTitle: messages.modalTitle,
  modalDescription: messages.modalDescription,
  manageCookies: messages.manageCookies,
  saveCTA: messages.saveCTA,
  bannerCloseCTA: messages.bannerCloseCTA,
  ...categoryMessages,
};

const euMessages = {
  defaultBannerDescription: messages.euBannerDescription,
  bannerSettingsCTA: messages.bannerSettingsCTA,
  bannerMainCTA: messages.bannerAcceptCTA,
  bannerDismissCTA: messages.bannerDismissCTA,
  modalTitle: messages.modalTitle,
  modalDescription: messages.modalDescription,
  manageCookies: messages.manageCookies,
  saveCTA: messages.saveCTA,
  bannerCloseCTA: messages.bannerCloseCTA,
  ...categoryMessages,
};

export default { defaultMessages, euMessages };
