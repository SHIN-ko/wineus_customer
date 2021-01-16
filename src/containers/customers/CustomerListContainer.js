import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomerList from '../../components/customers/CustomerList';
import { listCustomers } from '../../modules/customers';

const CustomerListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { customers, error, loading, user } = useSelector(
    ({ customers, loading, user }) => ({
      customers: customers.customers,
      error: customers.error,
      loading: loading['customers/LIST_CUSTOMERS'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const { username } = match.params;
    const { extra, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listCustomers({ extra, username, page }));
  }, [dispatch, location.search, match.params]);

  return (
    <CustomerList
      loading={loading}
      error={error}
      customers={customers}
      showWriteButton={user}
    />
  );
};

export default withRouter(CustomerListContainer);
