import Index from '@/components/Index';
import Events from '@/components/Events';
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
  {
    path: '/events',
    component: Events,
  },
  {
    path: '/',
    component: Index,
  },
  {
    path: '/*',
    redirect: '/',
  },
];
