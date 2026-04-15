export type ActivityTemplate = {
  key: string;
  label: string;
  defaults: {
    title: string;
    description?: string;
    category?: string;
    location?: string;
  };
};

export const activityTemplates: ActivityTemplate[] = [
  {
    key: 'gym',
    label: 'Gym',
    defaults: {
      title: 'Gym',
      description: '',
      category: 'Health',
      location: '',
    },
  },
  {
    key: 'study',
    label: 'Study',
    defaults: {
      title: 'Study',
      description: '',
      category: 'Learning',
      location: '',
    },
  },
  {
    key: 'meeting',
    label: 'Meeting',
    defaults: {
      title: 'Meeting',
      description: '',
      category: 'Work',
      location: '',
    },
  },
];
