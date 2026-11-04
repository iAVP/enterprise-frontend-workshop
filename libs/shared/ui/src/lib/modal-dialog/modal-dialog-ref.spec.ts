import { ModalDialogRef } from './modal-dialog-ref';

describe('ModalDialogRef', () => {
  it('returns the result to the close callback', () => {
    const onClose = vi.fn();
    const ref = new ModalDialogRef(onClose);

    ref.close({ accepted: true });

    expect(onClose).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledWith({ accepted: true });
  });

  it('returns undefined when the dialog is cancelled', () => {
    const onClose = vi.fn();
    const ref = new ModalDialogRef(onClose);

    ref.close();

    expect(onClose).toHaveBeenCalledWith(undefined);
  });

  it('ignores subsequent close calls', () => {
    const onClose = vi.fn();
    const ref = new ModalDialogRef<number>(onClose);

    ref.close(1);
    ref.close(2);

    expect(onClose).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledWith(1);
  });
});
