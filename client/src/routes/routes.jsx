import { Suspense } from "react";
import { ROUTES } from "./route-links";
import { Events, LoginPage, Users } from "./lazy-components";
import DashboardLayout from "../components/layout/dashboard-layout";
import Spinner from "../components/common/spinner";
import Dashboard from "../components/dashboard";

const { HOME, LOGIN, ADMIN: { DASHBOARD, EVENTS, USERS } } = ROUTES;

export const routes = [
  {
    path: HOME,
    element: (
      <Suspense fallback={<Spinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: LOGIN,
    element: (
      <Suspense fallback={<Spinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: DASHBOARD,
        element: (
          <Suspense fallback={<Spinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: EVENTS,
        element: (
          <Suspense fallback={<Spinner />}>
            <Events />
          </Suspense>
        ),
      },
      {
        path: USERS,
        element: (
          <Suspense fallback={<Spinner />}>
            <Users />
          </Suspense>
        ),
      },
    ],
  },
];

// const AppRoutes = () => {
//   const {
//     REGISTER,
//     RECOVER_ACC,
//     FEEDS,
//     PROFILE,
//     CREATE_POST,
//     POST,
//     SEARCH,
//     EDIT_POST,
//   } = ROUTES;

//   return (
//     <Routes>
//       <Route
//         element={
//           <Suspense fallback={<Spinner />}>
//             <Protected />
//           </Suspense>
//         }
//       >
//         <Route
//           index
//           path="/"
//           element={
//             <Suspense fallback={<Spinner />}>
//               <Homepage />
//             </Suspense>
//           }
//         />
//         {/* <Route path={REGISTER} element={<Suspense fallback={<Spinner />}><Registerpage /></Suspense>} />
//           <Route path={RECOVER_ACC} element={<Suspense fallback={<Spinner />}><RecoverAccPage /></Suspense>} />
//           <Route path='/admin' element={<Suspense fallback={<Spinner />}><Layout /></Suspense>}>
//             <Route path={FEEDS} element={<Suspense fallback={<Spinner />}><Feed /></Suspense>} />
//             <Route path={POST} element={<Suspense fallback={<Spinner />}><Post /></Suspense>} />
//             <Route path={CREATE_POST} element={<Suspense fallback={<Spinner />}><Create /></Suspense>} />
//             <Route path={PROFILE} element={<Suspense fallback={<Spinner />}><Profile /></Suspense>} />
//             <Route path={SEARCH} element={<Suspense fallback={<Spinner />}><SearchResult /></Suspense>} />
//             <Route path={EDIT_POST} element={<Suspense fallback={<Spinner />}><EditPost /></Suspense>} />
//           </Route> */}
//       </Route>
//       <Route
//         path="*"
//         element={
//           <Suspense fallback={<Spinner />}>
//             <ErrorPage />
//           </Suspense>
//         }
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;
