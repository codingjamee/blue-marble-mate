import playerStore, { PlayerNamesType } from '../../../stores/playerStore';

const usePayment = () => {
  const { processPayment } = playerStore();

  const handlePayment = (userId: PlayerNamesType['id'], salary: number) => {
    processPayment(userId, salary);
  };

  return { handlePayment };
};

export default usePayment;
