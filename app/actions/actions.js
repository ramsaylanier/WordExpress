export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export function toggleSidebar(sidebarState) {
  return {
    type: TOGGLE_SIDEBAR,
    sidebarState
  };
}
