import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './services/seo.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html'
})
export class App {
  constructor() {
    inject(SeoService).init();
    // Anchor links (e.g. /industries#hospitals-healthcare) land below the sticky header.
    inject(ViewportScroller).setOffset(() => [0, (document.querySelector('app-navbar')?.getBoundingClientRect().height ?? 76) + 20]);
  }
}
