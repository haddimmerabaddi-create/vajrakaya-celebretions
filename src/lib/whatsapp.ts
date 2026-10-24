export const generateWhatsAppLink = (productName: string) => {
  const phoneNumber = '919880957399';
  const message = `Hello Vajrakaya Celebration! I am interested in booking the following return gift: *${productName}*. Please provide more details.`;

  // encodeURIComponent ensures the message is correctly formatted for a URL
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
