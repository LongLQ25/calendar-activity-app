export type Activity = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  location: string;
  status: 'pending' | 'done';
};
