
export const getRankings = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/exchanges", {
          method: "GET",
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
};
