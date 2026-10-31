import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Line icons drawn on a 24×24 grid with a 1.8 stroke, so they match each other
 * and inherit `currentColor`. Add a new icon by adding its SVG markup here.
 */
const ICONS: Record<string, string> = {
  sparkles: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/><path d="M5 15l.6 1.4L7 17l-1.4.6L5 19l-.6-1.4L3 17l1.4-.6z"/>',
  sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 1 1 4 0v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/><path d="M5 18v2M19 18v2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 21v-4h6v4"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/>',
  shield: '<path d="M12 3l8 3v6c0 4.6-3.4 8.4-8 9-4.6-.6-8-4.4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  leaf: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  droplet: '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  hotel: '<path d="M3 20V7M21 20v-6a3 3 0 0 0-3-3H10v9"/><path d="M3 15h18"/><circle cx="6.5" cy="11.5" r="1.5"/>',
  hospital: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 8v6M9 11h6"/><path d="M10 21v-3h4v3"/>',
  bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  factory: '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/><path d="M7 17h2M13 17h2M17 17h1"/>',
  school: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 9v6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 14h2M14 14h2M8 17h2"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/><path d="M8.5 11l1.8 1.8 3.2-3.6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2.1.8 3.5 2.9 3.5 5.5"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  phone: '<path d="M5 3h3.5l1.5 4.5-2 1.5a12 12 0 0 0 7 7l1.5-2L21 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  document: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  quote: '<path d="M10 7H6a2 2 0 0 0-2 2v4h5v5H4M20 7h-4a2 2 0 0 0-2 2v4h5v5h-5"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 13.9L7 21l5-3 5 3-1.5-7.1"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20a3 3 0 0 1-3 2h-2"/>',
  whatsapp: '<path d="M4 20l1.3-3.8A8.5 8.5 0 1 1 8 19z"/><path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2-1-1 .9a4.6 4.6 0 0 1-2.4-2.4l.9-1-1-2z"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M7.5 7v.01M11 17v-7M11 13.2c0-1.8 1.2-3.2 2.8-3.2s2.7 1.2 2.7 3.2V17"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 16l-5-5-9 9"/>',
  bug: '<ellipse cx="12" cy="13.5" rx="4.5" ry="6"/><path d="M12 7.5v12M9 4.5l1.5 2M15 4.5l-1.5 2M7.5 11H4M7.5 15H4.5M16.5 11H20M16.5 15h3"/>',
  glass: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/><path d="M7 7.5l2-2M14.5 15.5l3-3"/>',
  kitchen: '<path d="M4 21V10h16v11"/><path d="M4 14h16M9 10V7a3 3 0 0 1 6 0v3"/><path d="M8 17.5h2M14 17.5h2"/>',
  tank: '<path d="M5 7c0-1.7 3.1-3 7-3s7 1.3 7 3v10c0 1.7-3.1 3-7 3s-7-1.3-7-3z"/><path d="M5 7c0 1.7 3.1 3 7 3s7-1.3 7-3"/><path d="M12 13.5s-1.8 1.9-1.8 3a1.8 1.8 0 0 0 3.6 0c0-1.1-1.8-3-1.8-3z"/>',
  drain: '<circle cx="12" cy="12" r="8.5"/><path d="M8 9h8M7 12h10M8 15h8"/>',
  hammer: '<path d="M14 6l4 4M12.5 7.5l4 4-9.5 9.5-4-4z"/><path d="M14 6l2-2 4 4-2 2"/>',
  paint: '<rect x="4" y="3" width="13" height="6" rx="1.5"/><path d="M17 6h2.5v5.5H11V15"/><rect x="9.5" y="15" width="3" height="6" rx="1"/>',
  staff: '<circle cx="12" cy="7" r="3.5"/><path d="M5 21v-1.5A5.5 5.5 0 0 1 10.5 14h3a5.5 5.5 0 0 1 5.5 5.5V21"/><path d="M12 14l-1.5 3 1.5 4 1.5-4z"/>'
};

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-icon', 'aria-hidden': 'true' },
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
    stroke-linecap="round" stroke-linejoin="round" [innerHTML]="markup()"></svg>`,
  styles: [`:host{display:inline-flex;width:1em;height:1em;flex:none}svg{width:100%;height:100%}`]
})
export class IconComponent {
  readonly name = input.required<string>();
  private readonly sanitizer = inject(DomSanitizer);
  // The markup comes only from the constant table above, never from user input.
  protected readonly markup = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()] ?? ICONS['sparkles']));
}
