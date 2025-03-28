import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { NAVIGATION } from './components/shared/navigation';
import { RoutesData } from './components/shared/routes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactSupportOutlined } from '@mui/icons-material';

function useDemoRouter(initialPath) {
  console.log(initialPath)
  const [pathname, setPathname] = React.useState(() => {
    const currentPath = window.location.pathname;
    return currentPath === "/" ? initialPath : currentPath;
  });
  
  React.useEffect(() => {
    if(initialPath === '/login') {
      setPathname(initialPath);
      if (window.location.pathname !== initialPath) {
        window.history.replaceState({}, "", initialPath);
      }
    }
    else {

      
      if (window.location.pathname !== pathname) {
        window.history.replaceState({}, "", pathname);
      }
    }
  }, [pathname, initialPath]);

  // Navigate function to update path
  const navigate = (path) => {
    setPathname(path);
  };

  return React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(window.location.search),
      navigate,
    };
  }, [pathname]);
}


export default function App(props) {
  const [session, setSession] = React.useState({
    user: {
      id: 'admin',
      type: 'admin',
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
      },
    };
  }, []);

  const initialPath = `/${!session ? 'login' : session.user.type === 'admin' ? 'dashboard' : 'changePassword'}`;
  
  const router = useDemoRouter(initialPath);
  const ROUTE_COMPONENTS = RoutesData(session);
  const NAVIGATION_DATA = !session ? NAVIGATION.login : ( session.user.type === 'admin' ?  NAVIGATION.admin :  NAVIGATION.employee );  
  // const router = useDemoRouter(`/${!session ? 'login' : ( session.user.type === 'admin' ?  'dashboard' :  'changePassword' )}`);
  // const [router, setRouter] = React.useState(useDemoRouter(`/${!session ? 'login' : ( session.user.type === 'admin' ?  'dashboard' :  'changePassword' )}`));
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
