import { Framework, Region, TrackerType, TrackingCategory } from '@coinbase/cookie-manager';

export default {
  categories: [
    {
      id: TrackingCategory.NECESSARY,
      expiry: 365,
      required: true,
      trackers: [
        {
          id: 'locale',
          type: TrackerType.COOKIE,
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
        },
        {
          id: 'logged_in',
          type: TrackerType.COOKIE,
        },
        {
          id: 'device_id',
          type: TrackerType.COOKIE,
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
        // First party
        {
          id: 'gclid',
          type: TrackerType.COOKIE,
        },
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
