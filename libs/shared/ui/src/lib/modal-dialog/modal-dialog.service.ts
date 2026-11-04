import { ApplicationRef, EnvironmentInjector, Injectable, Type, createComponent, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog.component';
import { ModalDialogConfig } from './modal-dialog-config';
import { ModalDialogRef } from './modal-dialog-ref';

/** Creates and manages modal dialog instances independently of feature logic. */
@Injectable({ providedIn: 'root' })
export class ModalDialogService {
  private readonly applicationRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  /** Opens a component in the shared modal shell and reports its result before destruction. */
  open<TComponent, TData = unknown, TResult = unknown>(
    component: Type<TComponent>,
    config: ModalDialogConfig<TData>,
    onClose?: (result: TResult | undefined) => void,
  ): ModalDialogRef<TResult> {
    const hostElement = this.document.createElement('ui-modal-dialog-host');
    const previouslyFocused = this.document.activeElement as HTMLElement | null;
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
        this.applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
        hostElement.remove();
        previouslyFocused?.focus();
      }
    });

    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.initialize(component, config, dialogRef);
    componentRef.changeDetectorRef.detectChanges();

    return dialogRef;
  }
}
