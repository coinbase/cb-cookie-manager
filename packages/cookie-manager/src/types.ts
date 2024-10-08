import { CookieAttributes } from 'js-cookie';

export type ErrorFunction = (error: Error, metadata?: { [key: string]: any }) => void;

export type SetCookieFunction = (value: any, options?: CookieAttributes) => void;

export type LogFunction = (str: string, options?: Record<string, any>) => void;

export enum Region {
  EU = 'EU',
  DEFAULT = 'DEFAULT',
}

export enum TrackingCategory {
  FUNCTIONAL = 'functional',
  NECESSARY = 'necessary',
  TARGETING = 'targeting',
  PERFORMANCE = 'performance',
  DELETE_IF_SEEN = 'delete-if-seen',
}

export type TrackingPreference = {
  region: Region;
  consent: Array<TrackingCategory>;
};

export enum Framework {
  OPT_OUT = 'optOut',
  OPT_IN = 'optIn',
}

export type GeolocationRule = { region: Region; framework: Framework };

export enum TrackerType {
  COOKIE = 'cookie',
  QUERY = 'query',
  PIXEL = 'pixel',
  BEACON = 'beacon',
}

export type Tracker = {
  id: string;
  type: TrackerType;
  sessionCookie?: boolean;
  regex?: string;
  expiry?: number;
};

export type ConfigCategoryInfo = {
  id: TrackingCategory;
  trackers: Array<Tracker>;
  required?: boolean;
  expiry: number;
};

export type Config = {
  categories: Array<ConfigCategoryInfo>;
};

export type TrackingManagerDependencies = {
  onError: ErrorFunction;
  projectName: string;
  locale: string;
  region: Region;
  onPreferenceChange?: (preference: TrackingPreference) => void;
  config: Config;
  shadowMode?: boolean;
  log: LogFunction;
  initialCookieValues?: Record<string, string>;
  initialGPCValue?: boolean;
  // We provide a disableTimer option to avoid setting an interval for
  // periodically checking cookies. This is meant to be used in testing only to
  // avoid issues with timer related tests.
  disableTimer?: boolean;
};

export type AdTrackingPreference = {
  value: boolean;
  updated_at?: number;
};
