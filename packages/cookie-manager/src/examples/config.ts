import { Framework, Region, TrackerType, TrackingCategory } from '../types';

export default {
  categories: [
    {
      id: TrackingCategory.NECESSARY,
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
      trackers: [
        {
          id: 'mode',
          // Used to remember if the user dismissed the Advanced mode NUX modal
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
        {
          id: 'id-regex',
          type: TrackerType.COOKIE,
          regex: 'id(?:_[a-f0-9]{32}|undefined)(?:.*)',
        },
      ],
    },
    {
      id: TrackingCategory.DELETE_IF_SEEN,
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
