import {
  Component,
  ElementRef,
  EnvironmentInjector,
  HostListener,
  Injector,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ModalDialogConfig } from './modal-dialog-config';
import { ModalDialogRef } from './modal-dialog-ref';
import { MODAL_DIALOG_DATA } from './modal-dialog.tokens';

/** Renders the shared modal shell and the caller-provided component. */
@Component({
  selector: 'ui-modal-dialog',
  standalone: true,
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick($event)">
      <section
        #panel
        class="modal-panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="config.title"
        [style.width]="config.width ?? 'min(480px, calc(100vw - 32px))'"
        tabindex="-1"
      >
        <header class="modal-header">
          <h2>{{ config.title }}</h2>
          <button
            type="button"
            class="modal-close"
            aria-label="Close dialog"
            [disabled]="config.disableClose"
            (click)="dialogRef.close()"
          >×</button>
        </header>
        <div class="modal-content">
          <ng-container #content></ng-container>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { position: fixed; inset: 0; z-index: 1000; }
    .modal-backdrop {
      box-sizing: border-box;
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      padding: 16px;
      background: rgb(0 0 0 / 48%);
    }
    .modal-panel {
      box-sizing: border-box;
      max-width: 100%;
      max-height: calc(100vh - 32px);
      overflow: auto;
      border-radius: 8px;
      background: #fff;
      color: #222;
      box-shadow: 0 12px 40px rgb(0 0 0 / 24%);
      outline: none;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 22px;
      border-bottom: 1px solid #e5e5e5;
    }
    .modal-header h2 { margin: 0; font-size: 18px; }
    .modal-close {
      border: 0;
      background: transparent;
      font-size: 26px;
      line-height: 1;
      cursor: pointer;
    }
    .modal-content { padding: 22px; }
  `],
})
export class ModalDialogComponent {
  @ViewChild('content', { read: ViewContainerRef, static: true })
  private content!: ViewContainerRef;

  @ViewChild('panel')
  private panel!: ElementRef<HTMLElement>;

  protected config!: ModalDialogConfig;
  protected dialogRef!: ModalDialogRef;

  private readonly environmentInjector = inject(EnvironmentInjector);

  /** Sets dialog configuration before the shell's first change-detection pass. */
  configure(config: ModalDialogConfig, dialogRef: ModalDialogRef): void {
    this.config = config;
    this.dialogRef = dialogRef;
  }

  /** Instantiates the requested content component with dialog-scoped DI values. */
  initialize<T>(component: Type<T>): ComponentRef<T> {
    const dialogInjector = Injector.create({
      parent: this.environmentInjector,
      providers: [
        { provide: ModalDialogRef, useValue: dialogRef },
        { provide: MODAL_DIALOG_DATA, useValue: config.data },
      ],
    });

    const componentRef = this.content.createComponent(component, {
      environmentInjector: this.environmentInjector,
      injector: dialogInjector,
    });

    return componentRef;
  }

  /** Moves keyboard focus to the dialog panel after its view has rendered. */
  focusPanel(): void {
    this.panel?.nativeElement.focus();
  }

  /** Closes the dialog when the user clicks the backdrop, if enabled. */
  protected onBackdropClick(event: MouseEvent): void {
    if (
      event.target === event.currentTarget &&
      this.config.closeOnBackdrop !== false &&
      !this.config.disableClose
    ) {
      this.dialogRef.close();
    }
  }

  /** Handles Escape consistently for every dialog content component. */
  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (!this.config.disableClose) {
      this.dialogRef.close();
    }
  }
}
