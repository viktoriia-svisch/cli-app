import Calendar from '@/components/Calendar';
import Mentions from '@/components/Mentions';
import Podcasts from '@/components/Podcasts';
export const routes = [
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/mentions',
    component: Mentions,
  },
  {
    path: '/podcasts',
    component: Podcasts,
  },
];
