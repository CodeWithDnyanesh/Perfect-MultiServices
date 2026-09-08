import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  currentYear: number = new Date().getFullYear();

  constructor(private host: ElementRef<HTMLElement>, public i18n: LanguageService) {}

  ngAfterViewInit(): void {
    const footer = this.host.nativeElement.querySelector<HTMLElement>('.footer');
    if (!footer || !('IntersectionObserver' in window)) {
      footer?.classList.add('scroll-visible');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        footer.classList.add('scroll-visible');
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(footer);
  }
}