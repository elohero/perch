import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouterPaths } from '@/core/types';

const DefaultLayout = lazy(
  () => import('@/core/layouts/DefaultLayout'),
);
const LoadingLayout = lazy(
  () => import('@/core/layouts/LoadingLayout'),
);
const Main = lazy(
  () => import('@/core/components/Main'),
);
const About = lazy(
  () => import('@/core/components/About'),
);
const Details = lazy(
  () => import('@/core/components/Details'),
);

const AppRoutes = () => (
  <Suspense fallback={ <LoadingLayout/> }>
    <Routes>
      <Route element={ <DefaultLayout/> }>
        <Route path={ RouterPaths.ROOT } element={ <Main/> }/>
        <Route path={ `${ RouterPaths.DETAILS }/:id` } element={ <Details/> }/>
        <Route path={ RouterPaths.ABOUT } element={ <About/> }/>
      </Route>
      <Route path={ RouterPaths.NOT_FOUND } element={ <Navigate to={ RouterPaths.ROOT }/> }/>
    </Routes>
  </Suspense>
);

export default AppRoutes;