import Index from '@/components/Index';
import Event from '@/components/Event';
import Events from '@/components/Events';
import Search from '@/components/Search';
import Mentions from '@/components/Mentions';
import Podcasts from '@/components/Podcasts';
export const routes = [
  {
    path: '/search',
    component: Search,
    props: true,
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
    path: '/events/:id',
    component: Event,
    props: true,
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
