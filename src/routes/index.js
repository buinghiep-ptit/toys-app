import { lazy } from 'react';
import { PublicLayout } from 'layouts';

const ToysPage = lazy(() => import('pages/ToysPage.js'));
const HomePage = lazy(() => import('pages/HomePage.js'));
const LoginPage = lazy(() => import('pages/LoginPage.js'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage.js'));

export const routes = [
    {
        path: '/homepage',
        exact: true,
        layout: PublicLayout,
        component: HomePage
    },
    {
        path: ['/', '/toys'],
        exact: true,
        layout: PublicLayout,
        component: ToysPage
    },
    {
        path: '/toys/:slug',
        exact: true,
        layout: PublicLayout,
        component: ToysPage
    },
    {
        path: '/login',
        exact: true,
        layout: PublicLayout,
        component: LoginPage
    },
    {
        path: '*',
        exact: true,
        layout: PublicLayout,
        component: NotFoundPage
    },
];