import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/register/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/register';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { name, contactNumber, address, advancedPayment } = useSelector(({ register }) => ({
    name: register.name,
    contactNumber: register.contactNumber,
    address : register.address,
    advancedPayment : register.advancedPayment
  }));
  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);
  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} name={name} contactNumber={contactNumber} address={address} advancedPayment={advancedPayment}/>;
};

export default EditorContainer;
