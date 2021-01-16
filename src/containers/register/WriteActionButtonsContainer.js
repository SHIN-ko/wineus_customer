import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/register/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerCustomer, updateCustomer } from '../../modules/register';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { name, contactNumber, address, advancedPayment, extra, customer, customerError, originalCustomerId } = useSelector(
    ({ register }) => ({
      name: register.name,
      contactNumber: register.contactNumber,
      address : register.address,
      advancedPayment : register.advancedPayment,
      extra: register.extra,
      customer: register.customer,
      customerError: register.customerError,
      originalCustomerId: register.originalCustomerId,
    }),
  );

  // 고객 등록
  const onPublish = () => {
    if (originalCustomerId) {
      console.log("originalCustomerId"+originalCustomerId)
      dispatch(updateCustomer({ name, contactNumber, address, advancedPayment, extra, id: originalCustomerId }));
      return;
    }
    dispatch(
      registerCustomer({
        name,
        contactNumber,
        address,
        advancedPayment,
        extra,
      }),
    );
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (customer) {
      const { _id, user } = customer;
      history.push(`/@${user.username}/${_id}`);
    }
    if (customerError) {
      console.log(customerError);
    }
  }, [history, customer, customerError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalCustomerId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
