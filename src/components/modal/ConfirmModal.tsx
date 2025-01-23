import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import useThemeStore from '../../stores/useThemeStore';
import Portal from './Portal';

interface Props extends PropsWithChildren {
  setModal: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

const ConfirmModal = ({ setModal, children, onConfirm }: Props) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Portal>
      <div className={`theme-${theme}`}>
        <div className="modal-wrapper" onClick={(prev) => setModal(!prev)}>
          <div className="modal-container">
            {children}
            <div className="btn-container">
              <button className="btn btn-dark" onClick={() => onConfirm()}>
                확인
              </button>
              <button className="btn btn-random" onClick={(prev) => setModal(!prev)}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmModal;
