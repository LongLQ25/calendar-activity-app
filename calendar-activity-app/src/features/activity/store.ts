import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Activity } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../services/storage';

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'status'>) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  toggleActivityStatus: (id: string) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            { ...activity, id: uuidv4(), status: 'pending' },
          ],
        })),
      updateActivity: (updatedActivity) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === updatedActivity.id ? updatedActivity : activity
          ),
        })),
      deleteActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter(
            (activity) => activity.id !== id
          ),
        })),
      toggleActivityStatus: (id) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id
              ? {
                  ...activity,
                  status: activity.status === 'pending' ? 'done' : 'pending',
                }
              : activity
          ),
        })),
    }),
    {
      name: 'activity-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
