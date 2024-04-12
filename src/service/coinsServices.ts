export const getCripto = async () => {
  try {
    const res = await fetch("api.coincap.io/v2/assets");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
