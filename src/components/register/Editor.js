import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  /* 페이지 위 아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 1.5rem;
`;
const TitleInput = styled.input`
  font-size: 1.5rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;
// const QuillWrapper = styled.div`
//   /* 최소 크기 지정 및 padding 제거 */
//   .ql-editor {
//     padding: 0;
//     min-height: 320px;
//     font-size: 1.125rem;
//     line-height: 1.5;
//   }
//   .ql-editor.ql-blank::before {
//     left: 0px;
//   }
// `;

const Editor = ({ name, contactNumber, address, advancedPayment, onChangeField }) => {
 
  const onChangeName = e => {
    onChangeField({ key: 'name', value: e.target.value });
  };
  const onChangeAddress = e => {
    onChangeField({ key: 'address', value: e.target.value });
  };

  const onChangeContactNumber = e => {
    onChangeField({ key: 'contactNumber', value: e.target.value });
  };
  
  const onChangeAdvancedPayment = e => {
    const re = /^[0-9\b]+$/;

    if(e.target.value === "" || re.test(e.target.value)) {
      onChangeField({ key: 'advancedPayment', value: e.target.value });
    }
    e.target.value="";
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="이름을 입력하세요"
        onChange={onChangeName}
        value={name}
      />
     <TitleInput
        placeholder="핸드폰 번호를 입력하세요"
        onChange={onChangeContactNumber}
        value={contactNumber}
      />
      <TitleInput
        placeholder="주소을 입력하세요"
        onChange={onChangeAddress}
        value={address}
      />
      <TitleInput
        placeholder="선급금을 입력하세요"
        onChange={onChangeAdvancedPayment}
        value={advancedPayment}
      />
      {/* <QuillWrapper>
        <div ref={quillElement} /> 
      </QuillWrapper> */}
    </EditorBlock>
  );
};

export default Editor;
