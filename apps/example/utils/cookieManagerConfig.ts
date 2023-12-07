import { Framework, Region, TrackerType, TrackingCategory } from '@coinbase/cookie-manager';

export const cookieManagerConfig = {
  categories: [
    {
      id: TrackingCategory.NECESSARY,
      required: true,
      trackers: [
        {
          id: 'ip_country',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.PERFORMANCE,
      trackers: [
        {
          id: 'cb-rfm',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.FUNCTIONAL,
      trackers: [
        {
          id: 'mode',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.TARGETING,
      trackers: [
        {
          id: 'gclid',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.DELETE_IF_SEEN,
      trackers: [
        {
          id: 'challenge-regex',
          type: TrackerType.COOKIE,
          regex: '^(cf_chl_prog$)|(cf_cc_...$)|(cf_chl_cc_...$)|(cf_chl_seq_...$)',
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
