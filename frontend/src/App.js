import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { NAVIGATION } from './components/shared/navigation';
import { RoutesData } from './components/shared/routes';


function useDemoRouter(initialPath) {
  console.log('path'+initialPath)
  const [pathname, setPathname] = React.useState(initialPath);

  React.useEffect(() => {
    setPathname(initialPath);
  }, [initialPath]);
  
  console.log('path'+pathname)
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}


export default function App(props) {
  const [session, setSession] = React.useState({
    user: {
      id: 'admin',
      type: 'employee',
      name: 'Bharat Kashyap',
      password: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });
  
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        // setSession({
        //   user: {
        //     id: 'admin',
        //     type: 'employee',
        //     name: 'Bharat Kashyap',
        //     password: 'Bharat Kashyap',
        //     email: 'bharatkashyap@outlook.com',
        //     image: 'https://avatars.githubusercontent.com/u/19550456',
        //   },
        // });
      },
      signOut: () => {
        setSession(null);
        // setRouter(useDemoRouter('/login'))
      },
    };
  }, []);

  const initialPath = `/${!session ? 'login' : session.user.type === 'admin' ? 'dashboard' : 'changePassword'}`;
  
  const router = useDemoRouter(initialPath);
  const ROUTE_COMPONENTS = RoutesData(session);
  const NAVIGATION_DATA = !session ? NAVIGATION.login : ( session.user.type === 'admin' ?  NAVIGATION.admin :  NAVIGATION.employee );  
  // const router = useDemoRouter(`/${!session ? 'login' : ( session.user.type === 'admin' ?  'dashboard' :  'changePassword' )}`);
  // const [router, setRouter] = React.useState(useDemoRouter(`/${!session ? 'login' : ( session.user.type === 'admin' ?  'dashboard' :  'changePassword' )}`));
  console.log(router)
  return (
    <AppProvider
      navigation={NAVIGATION_DATA}
      router={router}
      session={session}
      authentication={authentication}
      // theme={demoTheme}
      // window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
        {ROUTE_COMPONENTS[router.pathname] || <div>Page Not Found</div>}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
