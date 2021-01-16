import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readCustomer, unloadCustomer } from '../../modules/customer';
import CustomerViewer from '../../components/customer/CustomerViewer';
import CustomerActionButtons from '../../components/customer/CustomerActionButtons';
import { setOriginalCustomer } from '../../modules/register';
import { removeCustomer } from '../../lib/api/customers';

const CustomerViewerContainer = ({ match, history }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { customerId } = match.params;
  const dispatch = useDispatch();
  const { customer, error, loading, user } = useSelector(
    ({ customer, loading, user }) => ({
      customer: customer.customer,
      error: customer.error,
      loading: loading['customer/READ_CUSTOMER'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readCustomer(customerId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadCustomer());
    };
  }, [dispatch, customerId]);

  const onEdit = () => {
    dispatch(setOriginalCustomer(customer));
    history.push('/customerRegister');
  };

  const onRemove = async () => {
    try {
      await removeCustomer(customerId);
      history.push('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  const ownCustomer = (user && user._id) === (customer && customer.user._id);

  return (
    <CustomerViewer
      customer={customer}
      loading={loading}
      error={error}
      actionButtons={
        ownCustomer && <CustomerActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default withRouter(CustomerViewerContainer);
