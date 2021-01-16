import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import CustomerListContainer from '../../containers/customers/CustomerListContainer';
import PaginationContainer from '../../containers/customers/PaginationContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <CustomerListContainer />
      <PaginationContainer />
    </>
  );
};

export default PostListPage;
