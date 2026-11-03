import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app';

describe('AppComponent', () => {
	beforeEach(async function () {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [provideRouter([])],
		}).compileComponents();
	});

	test('renders the router outlet', async function () {
		const fixture = TestBed.createComponent(AppComponent);
		await fixture.whenStable();

		expect((fixture.nativeElement as HTMLElement).querySelector('router-outlet')).not.toBeNull();
	});
});
