export const fetchImage = async (set, card, setImage, setLoading) => {
  try {
    setLoading(true);
    const response = await import(`../gamesets/${set}/img_${card}.jpg`);
    setImage(response.default);
  } catch (err) {
    console.log('Error while loading picture:', err);
  } finally {
    setLoading(false);
  }
};
