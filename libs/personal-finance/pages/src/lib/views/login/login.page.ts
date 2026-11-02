import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE } from '@workshop:def:consts';
import { LoginComponent } from '../../components/login/login.component';

/** Hosts the login component and handles the demonstration navigation flow. */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  /** Provides router navigation for the login flow. */
  protected readonly router = inject(Router);

  /** Navigates to the dashboard after local validation succeeds. */
  protected onLoginRequested(): void {
    void this.router.navigateByUrl('/' + ROUTE.DASHBOARD);
  }
}
