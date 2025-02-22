import playerStore from '../../../stores/playerStore';
import { PlayerNamesType } from '../../../stores/playerType';

const usePayment = () => {
  const { processPayment } = playerStore();

  const handlePayment = (userId: PlayerNamesType['id'], salary: number) => {
    processPayment(userId, salary);
  };

  return { handlePayment };
};

export default usePayment;
