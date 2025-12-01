import { App } from "App";
import { createRoot, Root } from "react-dom/client";

export interface WidgetCatalogOptions {
  el: string;
  dealers?: string[];
}

export class WidgetCatalog {
  private root: Root | null = null;
  private container: Element | null = null;
  private options: WidgetCatalogOptions;

  constructor(options: WidgetCatalogOptions) {
    this.container = document.querySelector(options.el);

    if (!this.container) {
      throw new Error(`Элемент ${options.el} не найден в DOM`);
    }

    this.options = options;
  }

  run() {
    if (!this.container) return;

    this.root = createRoot(this.container);

    this.root.render(
      <App dealers={this.options.dealers} />
    );
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

declare global {
  interface Window {
    WidgetCatalog: typeof WidgetCatalog;
  }
}

if (typeof window !== 'undefined') {
  window.WidgetCatalog = WidgetCatalog;
}