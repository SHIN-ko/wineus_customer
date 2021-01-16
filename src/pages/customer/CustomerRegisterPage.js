import React from 'react';
import Responsive from '../../components/common/Responsive';
import EditorContainer from '../../containers/register/EditorContainer';
import TagBoxContainer from '../../containers/register/TagBoxContainer';
import WriteActionButtonsContainer from '../../containers/register/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const CustomerRegisterPage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>고객 등록하기 - WINEUS</title>
      </Helmet>

      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default CustomerRegisterPage;
