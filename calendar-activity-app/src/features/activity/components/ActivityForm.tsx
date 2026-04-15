import React, { useState } from 'react';
import type { Activity } from '../../../types';
import { useActivityStore } from '../store';
import { activityTemplates } from '../templates';
import { addISODate } from '../dateUtils';

interface ActivityFormProps {
  activity?: Activity;
  onClose: () => void;
  date?: string;
  mode?: 'create' | 'edit' | 'duplicate';
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  onClose,
  date: initialDate,
  mode,
}) => {
  const resolvedMode: ActivityFormProps['mode'] = mode ?? (activity ? 'edit' : 'create');
  const isEditing = resolvedMode === 'edit';

  const { addActivity, addActivities, updateActivity } = useActivityStore();
  const [title, setTitle] = useState(activity?.title || '');
  const [date, setDate] = useState(activity?.date || initialDate || '');
  const [showMoreFields, setShowMoreFields] = useState(false);

  const [description, setDescription] = useState(activity?.description || '');
  const [category, setCategory] = useState(activity?.category || '');
  const [location, setLocation] = useState(activity?.location || '');

  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [repeatEvery, setRepeatEvery] = useState<'day' | 'week' | 'month'>('week');
  const [repeatCount, setRepeatCount] = useState(3);

  const handleApplyTemplate = (templateKey: string) => {
    const template = activityTemplates.find((t) => t.key === templateKey);
    if (!template) return;

    setTitle(template.defaults.title);
    setDescription(template.defaults.description ?? '');
    setCategory(template.defaults.category ?? '');
    setLocation(template.defaults.location ?? '');
    setShowMoreFields(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const activityData = {
      title: title.trim(),
      description: description.trim(),
      date,
      category: category.trim(),
      location: location.trim(),
    };

    if (isEditing && activity) {
      updateActivity({ ...activity, ...activityData });
      onClose();
      return;
    }

    if (!repeatEnabled || repeatCount <= 0) {
      addActivity(activityData);
      onClose();
      return;
    }

    const safeCount = Math.max(0, Math.min(30, Math.floor(repeatCount)));
    const drafts = [activityData];
    for (let i = 1; i <= safeCount; i += 1) {
      const nextDate =
        repeatEvery === 'day'
          ? addISODate(date, { days: i })
          : repeatEvery === 'month'
            ? addISODate(date, { months: i })
            : addISODate(date, { weeks: i });
      drafts.push({ ...activityData, date: nextDate });
    }
    addActivities(drafts);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isEditing && (
        <div className="mb-4">
          <div className="block text-gray-700 dark:text-gray-300 mb-2">Template</div>
          <div className="flex flex-wrap gap-2">
            {activityTemplates.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => handleApplyTemplate(t.key)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowMoreFields((v) => !v)}
          className="text-sm text-gray-700 dark:text-gray-200 underline"
        >
          {showMoreFields ? 'Hide optional fields' : 'Show optional fields'}
        </button>
      </div>

      {showMoreFields && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Category (optional)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Location (optional)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      {!isEditing && (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <input
              id="repeat-enabled"
              type="checkbox"
              checked={repeatEnabled}
              onChange={(e) => setRepeatEnabled(e.target.checked)}
              className="h-4 w-4"
            />
            <label
              htmlFor="repeat-enabled"
              className="text-gray-700 dark:text-gray-300"
            >
              Copy as repeats
            </label>
          </div>

          {repeatEnabled && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Every
                </label>
                <select
                  value={repeatEvery}
                  onChange={(e) =>
                    setRepeatEvery(e.target.value as 'day' | 'week' | 'month')
                  }
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Additional copies
                </label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={repeatCount}
                  onChange={(e) => setRepeatCount(Number(e.target.value))}
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
