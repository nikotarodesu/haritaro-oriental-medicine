/** Header owns the single compact navigation panel; the bottom bar is another trigger. */
export const SITE_MENU_ID = "site-mobile-menu";
export const SITE_MENU_TOGGLE_EVENT = "haritaro:toggle-site-menu";
export const SITE_MENU_STATE_EVENT = "haritaro:site-menu-state";
export const NAV_CUSTOMIZE_EVENT = "haritaro:customize-nav";
export interface SiteMenuToggleDetail { triggerId?: string; }
