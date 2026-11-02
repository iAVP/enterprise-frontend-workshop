import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/** Provides the application shell and active routed page outlet. */
@Component({imports:[RouterOutlet],selector:'app-root',templateUrl:'./app.html',styleUrl:'./app.scss'})
export class App{}
