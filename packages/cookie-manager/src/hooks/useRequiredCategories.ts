import { useTrackingManager } from '../TrackingManagerContext';
import { TrackingCategory } from '../types';

const useRequiredCategories = (): Array<TrackingCategory> => {
  const { config } = useTrackingManager();
  return config.categories
    .filter((c) => c.required)
    .reduce((prev, v) => [...prev, v.id], [] as Array<TrackingCategory>);
};

export default useRequiredCategories;
