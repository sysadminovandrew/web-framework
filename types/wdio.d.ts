export {};

declare global {
  namespace WebdriverIO {
    interface Browser {
      element: (element: { name: string; locator: string }) => Promise<WebdriverIO.Element>;

      elements: (element: { name: string; locator: string }) => Promise<WebdriverIO.ElementArray>;
    }
  }
}
