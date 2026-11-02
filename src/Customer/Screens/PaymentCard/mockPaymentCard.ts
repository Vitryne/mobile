import { NewPaymentCard, SavedPaymentCard } from '../../Types/paymentCard';

// Na integração, trocar o corpo por uma função em src/Customer/Api que tokeniza o cartão no gateway
export const mockSavePaymentCard = async (card: NewPaymentCard): Promise<SavedPaymentCard> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    id: String(Date.now()),
    ...card,
  };
};