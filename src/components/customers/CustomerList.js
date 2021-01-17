import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import CustomerInvoice from './CustomerInvoice';
import { Link } from 'react-router-dom';

const CustomerListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WriteCustomerButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const CustomerItemBlock = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 0.5rem;
  }
`;

const SearchInput = styled.input`
  font-size: 1.0rem;
  outline: none;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
`;



const CustomerItem = ({ customer}) => {
  const [modal, setModal] = useState(false);
  const onInvoiceClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };



  const { publishedDate, user, name, contactNumber, address, extra, _id } = customer;
  return (
    <CustomerItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{name}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      <Tags tags={extra} />
      <p>주소 : {address}</p>
      <p>연락처 : {contactNumber}</p>
      <Button onClick={onInvoiceClick}>송장 출력</Button>
      <CustomerInvoice
        visible={modal}
        onCancel={onCancel}
        name={name}
        contactNumber={contactNumber}
        address={address}
      />
    </CustomerItemBlock>
  );
};


const CustomerList = ({ customers, loading, error, showWriteButton,  }) => {
  const onChangeSearch = (e) => {
    console.log(e.target.value);
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  // 에러 발생 시
  if (error) {
    return <CustomerListBlock>에러가 발생했습니다.</CustomerListBlock>;
  }

  return (
    <CustomerListBlock>
      <WriteCustomerButtonWrapper>
        <SearchInput
          name="searchKeyword"
          placeholder="검색어를 입력하세요"
          onChange={onChangeSearch}
        >
          
        </SearchInput>
        {showWriteButton && (
          <Button cyan to="/customerRegister">
            유저 등록하기
          </Button>
        )}
      </WriteCustomerButtonWrapper>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && customers && (
        <div>
          {customers.map(customer => (
            <CustomerItem customer={customer} key={customer._id} />
          ))}
          
        </div>
      )
      }
    </CustomerListBlock>
  );
};

export default CustomerList;
