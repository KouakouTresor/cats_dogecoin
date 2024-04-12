const apiKey = process.env.API_KEY

export const getWebSites = async () => {
    try {
        const response = await fetch("https://api.swapzone.io/v1/exchange/currencies", {
          method: "GET",
          headers:{
            'x-api-key': 'TIzbKYYMG',
          } 
        });
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        throw error;
      }
};
