// import { BuildingType, LuckyKey } from '../data/luckyKeysType';
// export const handleLuckyKeyAction = (
//   key: LuckyKey,
//   context: {
//     playerBuildings: { type: BuildingType; count: number }[];
//     processPayment: (amount: number) => Promise<void>;
//     movePlayer: (destination: string | number) => Promise<void>;
//   },
// ) => {
//   const { action } = key;

//   switch (action.type) {
//     case 'PAY':
//       return context.processPayment(-action.amount);

//     case 'RECEIVE':
//       return context.processPayment(action.amount);

//     case 'MOVE':
//       return context.movePlayer(action.destination);

//     case 'BUILDING_PAYMENT':
//       const totalPayment = context.playerBuildings.reduce((sum, building) => {
//         return sum + action.costs[building.type] * building.count;
//       }, 0);
//       return context.processPayment(-totalPayment);

//     case 'MOVE_WITH_PAYMENT':
//       const movePromise = context.movePlayer(action.destination);

//       if (action.payment) {
        
//         const { amount, condition, ownerPayment } = action;
//         const destinationOwner = context.getDestinationOwner?.();

//         if (condition === 'OWNER_EXISTS' && destinationOwner) {
//           if (ownerPayment) {
//             await context.processPayment(-amount, destinationOwner);
//           } else {
//             await context.processPayment(-amount);
//           }
//         }
//       }

//       if (action.checkPassStart && context.hasPassedStart?.()) {
//         await context.processPayment(200000); // 월급 지급
//       }

//       return movePromise;
//   }
// };
