/** Controls the lifecycle of one modal dialog instance. */
export class ModalDialogRef<TResult = unknown> {
  private closed = false;

  constructor(private readonly onClose: (result: TResult | undefined) => void) {}

  /** Returns a result to the caller and then disposes the dialog. */
  close(result?: TResult): void {
    if (this.closed) {
      return;
    }

    this.closed = true;
    this.onClose(result);
  }
}
