import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { RoutesData } from "./routes";
const Navbar = React.lazy(() => './components/shared/navbar');
const Sidebar = React.lazy(() => './components/shared/sidebar');
const Footer = React.lazy(() => './components/shared/footer');
const PageNotFound = React.lazy(() => './components/authentications/pageNotFound');

export const Menu = () => {

    const routesData = RoutesData();
    return (
    <>
        <Navbar />
        <Sidebar />
        <Suspense>
            <main id="main" className="main">
                <Routes>
                    {routesData.map((data, i) => (
                        <Route key={i} path={data.path} element={data.component} />
                    ))}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </Suspense>
        <Footer />
    </>
    )
}