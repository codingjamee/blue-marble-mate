import { LandType } from '../utils/mapType';

export type BuildingType = 'HOTEL' | 'BUILDING' | 'VILLA';

export type BuildingCost = Record<BuildingType, number>;

export type ConditionalPayment = {
  paymentProperty: {
    rentLandName: string;
    useRentPrice: boolean;
  };
};

export type MoveDestination = string | number;

export const isLuckyActionType = <T extends LuckyKeyAction['type']>(
  action: LuckyKeyAction,
  type: T,
): action is Extract<LuckyKeyAction, { type: T }> => {
  return action.type === type;
};

export type LuckyKeyAction =
  | { type: 'PAY'; amount: number }
  | { type: 'RECEIVE'; amount: number }
  | { type: 'MOVE'; destination: MoveDestination; checkPassStart?: boolean }
  | {
      type: 'MOVE_WITH_PAYMENT';
      destination: string | number;
      payment: ConditionalPayment;
      checkPassStart?: boolean; // 시작점 통과 체크 여부
    }
  | { type: 'ESCAPE'; itemPrice?: number }
  | { type: 'FREE_PASS' }
  | { type: 'BUILDING_PAYMENT'; costs: BuildingCost }
  | { type: 'SELL_BUILDING'; target?: { price: number; id: LandType['id'] } }
  | {
      type: 'WORLD_TOUR';
      collectFund: boolean;
      collectSalary: boolean;
    };

export interface LuckyKey {
  id: number;
  name: string;
  contents: string;
  action: LuckyKeyAction;
  keepable?: boolean;
}
