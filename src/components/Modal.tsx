import { ReactNode } from "react";

interface Props {
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onPrimaryBtnClick?: () => void;
  onSecondaryBtnClick?: () => void;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  title: string;
}

const Modal = ({
  content,
  isOpen,
  title,
  onClose,
  onPrimaryBtnClick,
  onSecondaryBtnClick,
  primaryBtnLabel,
  secondaryBtnLabel,
}: Props) => {
  const handlePrimaryBtnClick = () => {
    onPrimaryBtnClick?.();
    onClose();
  };

  const handleSecondaryBtnClick = () => {
    onSecondaryBtnClick?.();
    onClose();
  };

  return (
    <article>
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <section className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <article className="py-4">{content}</article>
            <section className="modal-action">
              {secondaryBtnLabel && (
                <button className="btn" onClick={handleSecondaryBtnClick}>
                  {secondaryBtnLabel}
                </button>
              )}
              {primaryBtnLabel && (
                <button
                  className="btn btn-primary"
                  onClick={handlePrimaryBtnClick}
                >
                  {primaryBtnLabel}
                </button>
              )}
            </section>
          </section>
        </dialog>
      )}
    </article>
  );
};

export default Modal;
