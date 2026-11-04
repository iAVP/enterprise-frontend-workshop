import { InjectionToken } from '@angular/core';

/** Provides caller-supplied data to the dynamically rendered dialog component. */
export const MODAL_DIALOG_DATA = new InjectionToken<unknown>('MODAL_DIALOG_DATA');
