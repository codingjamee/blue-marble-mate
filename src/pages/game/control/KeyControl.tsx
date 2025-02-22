import { Dispatch, SetStateAction } from 'react';
import usePlayStore from '../../../stores/gamePlayStore';
import { LuckyKeyAction } from '../../../data/luckyKeysType';

const KeyControl = ({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) => {
  const pickedKey = usePlayStore((state) => state.pickedKey);
  const handleUserAction = usePlayStore((state) => state.handleUserAction);

  const getActionType = (type: LuckyKeyAction['type']) => {
    switch (type) {
      case 'WORLD_TOUR':
        return 'FUND_RECEIVE';
      case 'ESCAPE':
      case 'FREE_PASS':
        return null;
      default:
        return type;
    }
  };

  return (
    <div className="building-select warp">
      <button
        className="btn btn-border"
        onClick={(e) => {
          e.stopPropagation();
          handleUserAction('PICK_GOLDEN_KEY');
        }}
      >
        황금열쇠 뽑기
      </button>
      {pickedKey && (
        <button
          className="btn btn-border"
          onClick={(e) => {
            e.stopPropagation();
            console.log('황금열쇠 액션실행');
            console.log(pickedKey.contents);
            handleUserAction(pickedKey.action.type);
            usePlayStore.getState().setPickedKey(null);
            usePlayStore.getState().setPendingAction(null);
            setModal(false);
          }}
        >
          {pickedKey.contents}
        </button>
      )}
    </div>
  );
};

export default KeyControl;
