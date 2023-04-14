// import React, { Suspense, useEffect } from 'react';
// import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
// import { Spin } from '../components/spin';
// import { pages } from './page';

// // const Layout = ({ layout: Layout, isPublic = false }) => {
// //     const { user } = useAuth();
// //     if (isPublic === true || !!user?.email || !!JSON.parse(localStorage.getItem(keyUser) || '{}')?.email)
// //         return (
// //             <Layout>
// //                 <Outlet />
// //             </Layout>
// //         );
// //     return <Navigate to={routerLinks('Login')} />;
// // };

// // const Page = ({ title = '', component: Comp, ...props }) => {
// //     const auth = useAuth();

// //     useEffect(() => {
// //         auth.setTitlePage('titles.' + title || '');
// //     }, [title]);

// //     if (typeof Comp === 'string') {
// //         return <Navigate to={Comp} />;
// //     }
// //     return <Comp {...props} />;
// // };

// const Pages = () => (
//     <BrowserRouter>
//         <Routes>
//             {pages.map(({ layout, isPublic, child }, index) => (
//                 <Route key={index} element={'/'} /*<Layout layout={layout} isPublic={isPublic} />*/>
//                     {child.map(({ path = '', title = '', component }, subIndex) => (
//                         <Route
//                             key={path + subIndex}
//                             path={path}
//                             element={
//                                 <Suspense
//                                     fallback={
//                                         <Spin>
//                                             <div className="w-screen h-screen" />
//                                         </Spin>
//                                     }
//                                 >
//                                     {/* <Page title={title} component={component} /> */}
//                                 </Suspense>
//                             }
//                         />
//                     ))}
//                 </Route>
//             ))}
//         </Routes>
//     </BrowserRouter>
// );

// export default Pages;
