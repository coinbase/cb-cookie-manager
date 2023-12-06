import { GEOLOCATION_RULES } from '../constants';
import { Framework, Region } from '../types';

/**
 * Used for determining the if current region is using the optOut framework
 * It follows the following logic in order:
 * 1) If there's no geolocation rule for the specified region
 *  then use the rule for DEFAULT region
 *  - Otherwise use the DEFAULT_FRAMEWORK
 * 2) Use geolocation rule
 */

/**
 * optIn: Users must opt in to tracking (EU)
 * optOut: Users must opt out of tracking (non-EU)
 * We use the most restrictive framework (optIn) if we don't know the framework
 */

const isOptOut = (region: Region) => {
  const rule = GEOLOCATION_RULES.find((r) => r.region === region);

  if (!rule) {
    return true;
  }
  return rule.framework === Framework.OPT_OUT;
};

export default isOptOut;
