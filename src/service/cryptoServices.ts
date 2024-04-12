export const getCripto = async () => {
    try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        const data = await response.json();
        return data.data;
      } catch (error) {
        throw error;
      }
};
