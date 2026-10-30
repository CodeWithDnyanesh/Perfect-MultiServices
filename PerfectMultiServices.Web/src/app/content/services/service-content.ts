import { ServiceSlug } from '../site-content';

/** Everything shown about one service, in one language. */
export interface ServiceContent {
  name: string;
  /** One-line promise under the page title. */
  tagline: string;
  /** Short introduction used on cards and as the meta description. */
  summary: string;
  highlights: [string, string, string];
  overview: string[];
  included: string[];
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
}

export type ServiceContentSet = Record<ServiceSlug, ServiceContent>;
