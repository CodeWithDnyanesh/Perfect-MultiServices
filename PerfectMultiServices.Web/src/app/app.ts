import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html'
})
export class App {
  @ViewChild('cursorDot') private cursorDot?: ElementRef<HTMLElement>;
  @ViewChild('cursorRing') private cursorRing?: ElementRef<HTMLElement>;

  @HostListener('document:mousemove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    const dot = this.cursorDot?.nativeElement;
    const ring = this.cursorRing?.nativeElement;
    if (!dot || !ring) {
      return;
    }

    const target = event.target;
    const isInteractive = target instanceof Element &&
      Boolean(target.closest('a, button, input, textarea, select, [role="button"]'));

    dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    ring.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    ring.classList.toggle('pointer-hover', isInteractive);
    dot.classList.add('pointer-visible');
    ring.classList.add('pointer-visible');
  }

  @HostListener('document:mouseleave')
  onPointerLeave(): void {
    this.cursorDot?.nativeElement.classList.remove('pointer-visible');
    this.cursorRing?.nativeElement.classList.remove('pointer-visible');
  }
}
