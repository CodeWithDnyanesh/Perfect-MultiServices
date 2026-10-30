import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/** Fades an element in the first time it scrolls into view. */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.el.nativeElement;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    el.classList.add('reveal');
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        this.observer?.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
