import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/post/PostListPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import WritePage from './pages/post/WritePage';
import PostPage from './pages/post/PostPage';
import CustomerListPage from './pages/customer/CustomerListPage';
import CustomerRegisterPage from './pages/customer/CustomerRegisterPage';
import CustomerPage from './pages/customer/CustomerPage';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
    <>
      <Helmet>
        <title>REACTERS</title>
      </Helmet>

      {/* <Route component={PostListPage} path={['/@:username', '/']} exact /> */}
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      {/* <Route component={PostPage} path="/@:username/:postId" /> */}
      <Route component={CustomerListPage} path={['/@:username', '/']} exact/>
      <Route component={CustomerRegisterPage} path="/customerRegister" />
      <Route component={CustomerPage} path="/@:username/:customerId" />
    </>
  );
};
export default App;
