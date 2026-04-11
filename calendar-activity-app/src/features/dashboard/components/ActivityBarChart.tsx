import React, { useMemo } from 'react';

import type { Activity } from '../../../types';

interface ActivityBarChartProps {
  activities: Activity[];
  days?: number;
  title?: string;
}

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function toLocalISODate(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function startOfLocalDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addLocalDays(date: Date, deltaDays: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + deltaDays);
  return d;
}

const ActivityBarChart: React.FC<ActivityBarChartProps> = ({
  activities,
  days = 7,
  title = 'Activities (last 7 days)',
}) => {
  const chartData = useMemo(() => {
    const safeDays = Math.max(1, Math.min(31, Math.floor(days)));
    const today = startOfLocalDay(new Date());

    const dateKeys: string[] = [];
    for (let i = safeDays - 1; i >= 0; i -= 1) {
      dateKeys.push(toLocalISODate(addLocalDays(today, -i)));
    }

    const countsByDate = new Map<string, number>();
    for (const activity of activities) {
      if (!activity.date) continue;
      countsByDate.set(activity.date, (countsByDate.get(activity.date) ?? 0) + 1);
    }

    return dateKeys.map((dateKey) => {
      const count = countsByDate.get(dateKey) ?? 0;
      const label = dateKey.slice(5); // MM-DD
      return { dateKey, label, count };
    });
  }, [activities, days]);

  const maxCount = Math.max(1, ...chartData.map((d) => d.count));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Max: {maxCount}
        </div>
      </div>

      <div className="mt-6 flex items-end gap-3">
        {chartData.map((d) => {
          const heightPct = (d.count / maxCount) * 100;
          return (
            <div key={d.dateKey} className="flex-1 min-w-0">
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                {d.count}
              </div>
              <div className="relative h-32 w-full rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="absolute left-0 right-0 bottom-0 rounded bg-gray-900 dark:bg-white"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400 truncate">
                {d.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityBarChart;
