export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

// Type definition for config.json
declare module "@/config/config.json" {
  export interface SiteConfig {
    title: string;
    author?: string;
    base_url: string;
    base_path: string;
    trailing_slash: boolean;
    favicon: string;
    favicon_darkmode: string;
    logo: string;
    logo_darkmode: string;
    logo_mask: string;
    logo_darkmode_mask: string;
    logo_width: string;
    logo_height: string;
    logo_text: string;
  }

  export interface Config {
    site: SiteConfig;
    // Add other config sections as needed
    [key: string]: any;
  }

  const config: Config;
  export default config;
}
