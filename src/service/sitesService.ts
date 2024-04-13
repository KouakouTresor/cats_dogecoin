
export const getRankings = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1", {
          method: "GET",
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
};
