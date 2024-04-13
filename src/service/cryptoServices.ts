export type CryptoData = {
  date: string;
  priceUsd: string;
  time: number;
}


export const getCripto = async (coin: string): Promise<any> => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${coin}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};


export const getDogecoinHistory = async (): Promise<any> => {
  try {
    const response = await fetch(
      "https://api.coincap.io/v2/assets/dogecoin/history?interval=d1"
    );
    const data = await response.json();
    const dataArray = data.data;
    const filteredData = dataArray.filter((item:CryptoData)=> {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === 2024 && itemDate.getMonth() >= 2;
    });
    return filteredData
  } catch (error) {
    throw error;
  }
};
