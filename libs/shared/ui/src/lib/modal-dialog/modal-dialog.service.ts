import { DOCUMENT } from '@angular/common';
import { ApplicationRef, EnvironmentInjector, Injectable, Type, createComponent, inject } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog.component';
import { ModalDialogConfig } from './modal-dialog-config';
import { ModalDialogRef } from './modal-dialog-ref';

/** Creates and manages modal dialog instances independently of feature logic. */
@Injectable({ providedIn: 'root' })
export class ModalDialogService {
  private activeDialog?: { close(): void };

  private readonly applicationRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  /**
   * Opens a component in the shared modal shell.
   * The callback receives the result before dynamic content and shell destruction.
   */
  open<TComponent, TData = unknown, TResult = unknown>(
    component: Type<TComponent>,
    config: ModalDialogConfig<TData>,
    onClose?: (result: TResult | undefined) => void,
  ): ModalDialogRef<TResult> {
    this.activeDialog?.close();

    const hostElement = this.document.createElement('ui-modal-dialog-host');
    const previouslyFocused = this.document.activeElement as HTMLElement | null;
    const previousBodyOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';

    const componentRef = createComponent(ModalDialogComponent, {
      environmentInjector: this.environmentInjector,
      hostElement,
    });

    this.applicationRef.attachView(componentRef.hostView);
    this.document.body.appendChild(hostElement);

    const dialogRef = new ModalDialogRef<TResult>((result) => {
      try {
        onClose?.(result);
      } finally {
        componentRef.instance.destroyContent();
        this.applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
        hostElement.remove();
        this.document.body.style.overflow = previousBodyOverflow;
        previouslyFocused?.focus();

        if (this.activeDialog === dialogRef) {
          this.activeDialog = undefined;
        }
      }
    });

    this.activeDialog = dialogRef;
    componentRef.instance.configure(config, dialogRef);
    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.initialize(component);
    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.focusPanel();

    return dialogRef;
  }
}
