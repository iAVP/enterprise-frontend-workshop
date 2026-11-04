/** Configuration shared by all dynamically rendered modal dialog components. */
export interface ModalDialogConfig<TData = unknown> {
  title: string;
  data?: TData;
  width?: string;
  closeOnBackdrop?: boolean;
  disableClose?: boolean;
}
