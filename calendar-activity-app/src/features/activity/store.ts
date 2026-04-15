import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Activity } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../services/storage';

import { addISODate } from './dateUtils';

type NewActivity = Omit<Activity, 'id'>;

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Omit<NewActivity, 'status'> & Partial<Pick<NewActivity, 'status'>>) => void;
  addActivities: (
    activities: Array<Omit<NewActivity, 'status'> & Partial<Pick<NewActivity, 'status'>>>
  ) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  toggleActivityStatus: (id: string) => void;
  setActivityStatus: (
    id: string,
    status: Activity['status'],
    completionNote?: string
  ) => void;
  copyActivityToNextWeek: (id: string) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            {
              ...activity,
              id: uuidv4(),
              status: activity.status ?? 'pending',
              completionNote: activity.completionNote,
            },
          ],
        })),
      addActivities: (activities) =>
        set((state) => ({
          activities: [
            ...state.activities,
            ...activities.map((activity) => ({
              ...activity,
              id: uuidv4(),
              status: activity.status ?? 'pending',
              completionNote: activity.completionNote,
            })),
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
                  completionNote:
                    activity.status === 'pending'
                      ? activity.completionNote
                      : undefined,
                }
              : activity
          ),
        })),
      setActivityStatus: (id, status, completionNote) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id
              ? {
                  ...activity,
                  status,
                  completionNote:
                    status === 'pending'
                      ? undefined
                      : completionNote ?? activity.completionNote,
                }
              : activity
          ),
        })),
      copyActivityToNextWeek: (id) =>
        set((state) => {
          const source = state.activities.find((a) => a.id === id);
          if (!source) return state;

          const copied: Activity = {
            ...source,
            id: uuidv4(),
            date: addISODate(source.date, { weeks: 1 }),
            status: 'pending',
            completionNote: undefined,
          };

          return { activities: [...state.activities, copied] };
        }),
    }),
    {
      name: 'activity-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
