/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import ProtectedRoute from './security';
import VlsLawPractice from 'pages/vls/vls-law-practice';
import VlsAcademy from 'pages/vls/vls-academy';
import PixelEye from 'pages/pixel-eye';
import RamanansFinancial from 'pages/ramanansFinancial';
import InvictusLeads from 'pages/invictus/invictus-leads';
import InvictusMeta from 'pages/invictus/invictus-meta';
import KrInstitute from 'pages/kr-institute';
import MirraBuilders from 'pages/mirra-builders';
import Naitrika from 'pages/naitrika';
import Netralaya from 'pages/netralaya';
import Wellinit from 'pages/wellinit';
import Mahimmyfood from 'pages/mahimmyfoods';
import VlsAibe from 'pages/vls/vls-aibe';
import OphthallWebinar from 'pages/ophthall-webinar';
import UserManagement from 'pages/management';

import ErrorPage from 'components/common/ErrorPage';

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Signin = lazy(() => import('pages/authentication/Signin'));

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [
        // Root dashboard route
        {
          path: '/',
          element: (
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
          ],
        },

        // All protected page routes — consolidated into one group
        {
          path: rootPaths.pageRoot,
          element: (
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              </Suspense>
            </MainLayout>
          ),
          children: [
            // Invictus
            {
              path: paths.invictusRoot,
              element: <Outlet />,
              children: [
                {
                  path: paths.invictusLeads,
                  element: <InvictusLeads />,
                },
                {
                  path: paths.invictusMeta,
                  element: <InvictusMeta />,
                },
              ],
            },

            // VLS
            {
              path: paths.vlsRoot,
              element: <Outlet />,
              children: [
                {
                  path: paths.vlsLawPractice,
                  element: <VlsLawPractice />,
                },
                {
                  path: paths.vlsAcademy,
                  element: <VlsAcademy />,
                },
                {
                  path: paths.vlsAibe,
                  element: <VlsAibe />,
                },
              ],
            },

            // Individual client pages
            {
              path: paths.mirraBuilders,
              element: <MirraBuilders />,
            },
            {
              path: paths.krInstitute,
              element: <KrInstitute />,
            },
            {
              path: paths.pixelEye,
              element: <PixelEye />,
            },
            {
              path: paths.ramananFinancial,
              element: <RamanansFinancial />,
            },
            {
              path: paths.naitrika,
              element: <Naitrika />,
            },
            {
              path: paths.netralaya,
              element: <Netralaya />,
            },
            {
              path: paths.wellinit,
              element: <Wellinit />,
            },
            {
              path: paths.mahimmyFoods,
              element: <Mahimmyfood />,
            },
            {
              path: paths.ophthallWebinar,
              element: <OphthallWebinar />,
            },
            {
              path: paths.management,
              element: <UserManagement />,
            },
          ],
        },

        // Auth routes
        {
          path: rootPaths.authRoot,
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: paths.signin,
              element: <Signin />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/',
  },
);

export default router;
