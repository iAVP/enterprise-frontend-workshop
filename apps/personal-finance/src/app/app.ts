import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Provides the application shell and active routed page outlet. */
@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class AppComponent {}
