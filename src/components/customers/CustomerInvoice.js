import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import InvoiceImng from '../../assets/invoice.png';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AskModalBlock = styled.div`
  background : white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const onPrint = () => {
    window.print();
};

const CustomerInvoice = ({visible, onCancel, name, contactNumber, address}) => {
    if (!visible) return null;
    return (
        <Fullscreen>
            <AskModalBlock>
                <div >
                    <div style={{position:'relative'}}>
                        <img src={ InvoiceImng } alt="송장이미지"/>
                    </div>
                    <div style={{
                    top: '61%',
                    left: '40%',
                    bottom: '140px',
                    fontSize: '1.0em',
                    fontWeight: 'bold',
                    position: 'absolute'}}>
                        <div style={{ marginBottom : '0.8rem'}}>
                            {name}
                        </div>
                        <div style={{ marginBottom : '0.8rem'}}>
                            {address}
                        </div>
                        <div style={{ marginBottom : '0.8rem'}}> 
                            {contactNumber}
                        </div>
                    </div>
                </div>
                <p></p>
                <StyledButton onClick={onPrint}>출력</StyledButton>
                <StyledButton onClick={onCancel}>취소</StyledButton>
            </AskModalBlock>
        </Fullscreen>
    );
  };
  
  export default CustomerInvoice;
  