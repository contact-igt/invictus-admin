/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import ProtectedRoute from './security';
import PetEventDetails from 'pages/upcoming-events/petevent-details/PetEventDetails';
import Pets from 'pages/pets';
import PetDetailsPage from 'pages/pets/pet-details/PetDetailsPage';
import VlsLawPractice from 'pages/vls/vls-law-practice';
import VlsAcademy from 'pages/vls/vls-academy';
import PixelEye from 'pages/pixel-eye';
import RamanansFinancial from 'pages/ramanansFinancial';
import InvictusLeads from 'pages/invictus/invictus-leads';
import InvictusMeta from 'pages/invictus/invictus-meta';
import KrInstitute from 'pages/kr-institute';
import MirraBuilders from 'pages/mirra-builders';

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard'));
const PetTips = lazy(() => import('pages/pettips'));
const Users = lazy(() => import('pages/users'));
const UpcomingEvents = lazy(() => import('pages/upcoming-events'));
const PetTipsDetails = lazy(() => import('pages/pettips/pettips-details/PetTipsDetails'));
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
              path: paths.ramanansFinancial,
              element: <RamanansFinancial />,
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



        // {
        //   path: rootPaths.pageRoot,
        //   element: (
        //     <MainLayout>
        //       <Suspense fallback={<PageLoader />}>
        //         <ProtectedRoute>
        //           <Outlet />
        //         </ProtectedRoute>
        //       </Suspense>
        //     </MainLayout>
        //   ),
        //   children: [
        //     {
        //       path: paths.pets,
        //       element: <Pets />,
        //     },
        //     {
        //       path: paths.petDetails,
        //       element: <PetDetailsPage />,
        //     },
        //   ],
        // },
        // {
        //   path: rootPaths.pageRoot,
        //   element: (
        //     <MainLayout>
        //       <Suspense fallback={<PageLoader />}>
        //         <ProtectedRoute>
        //           <Outlet />
        //         </ProtectedRoute>
        //       </Suspense>
        //     </MainLayout>
        //   ),
        //   children: [
        //     {
        //       path: paths.pettips,
        //       element: <PetTips />,
        //     },
        //     {
        //       path: paths.petTipDetail,
        //       element: <PetTipsDetails />,
        //     },
        //   ],
        // },
        // {
        //   path: rootPaths.pageRoot,
        //   element: (
        //     <MainLayout>
        //       <Suspense fallback={<PageLoader />}>
        //         <ProtectedRoute>
        //           <Outlet />
        //         </ProtectedRoute>
        //       </Suspense>
        //     </MainLayout>
        //   ),
        //   children: [
        //     {
        //       path: paths.users,
        //       element: <Users />,
        //     },
        //   ],
        // },
        // {
        //   path: rootPaths.pageRoot,
        //   element: (
        //     <MainLayout>
        //       <Suspense fallback={<PageLoader />}>
        //         <ProtectedRoute>
        //           <Outlet />
        //         </ProtectedRoute>
        //       </Suspense>
        //     </MainLayout>
        //   ),
        //   children: [
        //     {
        //       path: paths.events,
        //       element: <UpcomingEvents />,
        //     },
        //     {
        //       path: paths.eventDetails,
        //       element: <PetEventDetails />,
        //     },
        //   ],
        // },

      ],
    },
  ],
  {
    basename: '/',
  },
);

export default router;
