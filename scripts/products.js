const fetchData = async () => {
  try {
    const response = await fetch('https://672e3400229a881691ef5260.mockapi.io/api/cards');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    return null;
  }
};

const getData = async () => {
  const data = await fetchData();
  return data;
};

export default getData;
