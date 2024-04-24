import React, { useState } from 'react';
import { getExchangeRate } from './api/api';
import styled from 'styled-components';

const ExchangeRateCalculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [exchnageDate, setExchangeDate] = useState('');
  const [convertedValue, setConvertedValue] = useState(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value >= 1000) {
      try {
        const data = await getExchangeRate("USD", "KRW");
        setExchangeRate(data.rates.KRW);
        setExchangeDate(data.date)
        const converted = value * data.rates.KRW;
        setConvertedValue(converted.toFixed(2));
      } catch (error) {
        console.error('환율 정보를 가져오는 중 오류가 발생했습니다:', error);
      }
    }
  };

  //날자 포메팅 함수
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    return `${year}-${month}-${day}`;
  }

  return (
    <Container>
      <TabContainer>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="값을 입력하세요."
        />
        {exchangeRate && (
          <div>
            <p>KRW{convertedValue}</p>
            <p>기준일:</p>
            <p>{formatDate(exchnageDate)}</p>
          </div>
        )}
      </TabContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TabContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  padding: 30px;
  border: 5px solid #000;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.75);
`;


export default ExchangeRateCalculator;
