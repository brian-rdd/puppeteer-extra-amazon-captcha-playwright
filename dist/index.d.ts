import { PuppeteerExtraPlugin } from 'puppeteer-extra-plugin';
import { Page } from 'puppeteer';
export interface PuppeteerExtraPluginAmazonCaptchaOptions {
    /** Maximum number of retries (sometimes tessaract fails) */
    maxRetries: number;
    /** Amazon input field selector */
    inputSelector: string;
}
export declare class PuppeteerExtraPluginAmazonCaptcha extends PuppeteerExtraPlugin {
    constructor(opts: Partial<PuppeteerExtraPluginAmazonCaptchaOptions>);
    get name(): string;
    get defaults(): PuppeteerExtraPluginAmazonCaptchaOptions;
    protected _solveAmazonCaptcha(page: Page, url: string): Promise<void>;
    onPageCreated(page: Page): Promise<void>;
}
/** Default export, PuppeteerExtraPluginAmazonCaptcha */
declare const defaultExport: (options?: Partial<any>) => PuppeteerExtraPluginAmazonCaptcha;
export default defaultExport;
