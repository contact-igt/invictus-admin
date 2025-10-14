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
      children: [
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
          ],
        },

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
              ],
            },
          ],
        },

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
            {
              path: paths.mirraBuilders,
              element: <MirraBuilders />,
            },
          ],
        },
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
            {
              path: paths.krInstitute,
              element: <KrInstitute />,
            },
          ],
        },
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
            {
              path: paths.pixelEye,
              element: <PixelEye />,
            },
          ],
        },



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
            {
              path: paths.ramananFinancial,
              element: <RamanansFinancial />,
            },
          ],
        },




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
            {
              path: paths.naitrika,
              element: <Naitrika />,
            },
          ],
        },



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
            {
              path: paths.netralya,
              element: <Netralaya />,
            },
          ],
        },




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
            {
              path: paths.wellinit,
              element: <Wellinit />,
            },
          ],
        },


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
            {
              path: paths.mahimmyFoods,
              element: <Mahimmyfood />,
            },
          ],
        },





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
