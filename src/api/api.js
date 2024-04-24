const API_URL = "https://api.apilayer.com/exchangerates_data";
const API_KEY = "77gfuBFV5AUnMAz8KtDXLtkpiGJaaK0N";

export const getExchangeRate = async (base, symbols) => {
  const myHeaders = new Headers({
    "apikey": API_KEY
  });

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const url = `${API_URL}/latest?symbols=${symbols}&base=${base}`;

  try {
    console.log(`base: ${base}, symbols: ${symbols}`);
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('응답상태 이상');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('에러뜬다:', error);
    throw error;
  }
};
