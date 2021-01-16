import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';

const CustomerViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const CustomerHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const CustomerContent = styled.div`
  margin-bottom : 1.5rem;
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const CustomerViewer = ({ customer, error, loading, actionButtons, ownCustomer }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <CustomerViewerBlock>존재하지 않는 포스트입니다.</CustomerViewerBlock>;
    }
    return <CustomerViewerBlock>오류 발생!</CustomerViewerBlock>;
  }

  // 로딩중이거나, 아직 포스트 데이터가 없을 시
  if (loading || !customer) {
    return null;
  }

  const { name, contactNumber, address, advancedPayment, user, publishedDate, extra } = customer;
  return (
    <CustomerViewerBlock>
      <Helmet>
        <title>{name} - WINEUS</title>
      </Helmet>

      <CustomerHead>
        <h1>{name}</h1>
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          hasMarginTop
        />
        <Tags tags={extra} />
        
      주소 : <CustomerContent dangerouslySetInnerHTML={{ __html: address }}  />
      연락처 : <CustomerContent dangerouslySetInnerHTML={{ __html: contactNumber }} />
      남은 선급금 : {advancedPayment}
      </CustomerHead>
      {actionButtons}
    </CustomerViewerBlock>
  );
};

export default CustomerViewer;
