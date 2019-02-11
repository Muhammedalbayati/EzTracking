import { Injectable } from "@angular/core";

export interface FrameworkConfigSettings {
  showLanguageSelector?: boolean,
  showUserControls?: boolean,
  showStatusBar?: boolean,
  showStatusBarBreakpoint?: number,
  // socialIcons?: Array<IconFiles>
}

@Injectable({
  providedIn: "root"
})
export class FrameworkConfigService {
  showStatusBar = true;
  showStatusBarBreackpoint = 0;

  configure(settings: FrameworkConfigSettings): void {
    Object.assign(this, settings);
  }
  constructor() {}
}
