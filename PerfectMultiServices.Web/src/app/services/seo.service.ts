import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const ORIGIN = 'https://www.perfectmultiservices.com';

/** Keeps the meta description, canonical URL and robots tag in step with the current page. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  init(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const data = this.collectData(this.router.routerState.snapshot.root);
      const path = this.router.url.split(/[?#]/)[0];

      if (data['description']) {
        this.meta.updateTag({ name: 'description', content: data['description'] });
        this.meta.updateTag({ property: 'og:description', content: data['description'] });
      }
      this.meta.updateTag({ property: 'og:title', content: this.document.title });
      this.meta.updateTag({ property: 'og:url', content: ORIGIN + path });
      this.meta.updateTag({ name: 'robots', content: data['noindex'] ? 'noindex, nofollow' : 'index, follow' });
      this.canonical().setAttribute('href', ORIGIN + (path === '/' ? '/' : path));
    });
  }

  private collectData(route: ActivatedRouteSnapshot): Record<string, any> {
    let data: Record<string, any> = {};
    for (let r: ActivatedRouteSnapshot | null = route; r; r = r.firstChild) {
      data = { ...data, ...r.data };
    }
    return data;
  }

  private canonical(): HTMLLinkElement {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    return link;
  }
}
