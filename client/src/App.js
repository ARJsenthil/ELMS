import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { NAVIGATION } from './components/shared/navigation';
import { RoutesData } from './components/shared/routes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactSupportOutlined, WindowSharp } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { PageNotFound } from './components/authentications/pageNotFound';

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(() => {
    const currentPath = window.location.pathname;
    return currentPath === "/" ? initialPath : currentPath;
  });

  React.useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Navigate function to update path
  const navigate = (path, { replace = false } = {}) => {
    setPathname(path);
    if (replace) {
      window.history.replaceState({}, "", path);
    } else {
      window.history.pushState({}, "", path);
    }
  };

  return React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(window.location.search),
      navigate,
      data: {},
    };
  }, [pathname]);
}

export default function App(props) {
  const [session, setSession] = React.useState(
    JSON.parse(localStorage.getItem('loginSession')) ?
      {
        user: JSON.parse(localStorage.getItem('loginSession'))
      } :
      null
  );
  console.log(JSON.parse(localStorage.getItem('loginSession')));
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(null);
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
        localStorage.removeItem('loginSession');
        router.navigate('/login');
      },
    };
  }, []);
  const initialPath = `/${!session ? 'login' : session.user.type === 'admin' ? 'dashboard' : 'changePassword'}`;

  const router = useDemoRouter(initialPath);
  console.log(session);
  const ROUTE_COMPONENTS = RoutesData({ session: session, router: router });
  console.log(ROUTE_COMPONENTS);
  const NAVIGATION_DATA = !session ? NAVIGATION.login : (session.user.type === 'admin' ? NAVIGATION.admin : NAVIGATION.employee);
  function DemoPageContent({ pathname }) {
    return (
      <>
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* <Typography>Dashboard content for {pathname}</Typography> */}
        </Box>
        {ROUTE_COMPONENTS[pathname] || <PageNotFound router={router} session={session} />}
      </>
    );
  }
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
          <DemoPageContent pathname={router.pathname} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}