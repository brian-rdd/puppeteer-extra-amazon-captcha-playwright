"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerExtraPluginAmazonCaptcha = void 0;
const tesseract_js_1 = require("tesseract.js");
const puppeteer_extra_plugin_1 = require("puppeteer-extra-plugin");
class PuppeteerExtraPluginAmazonCaptcha extends puppeteer_extra_plugin_1.PuppeteerExtraPlugin {
    constructor(opts) {
        super(opts);
    }
    get name() {
        return "amazon-captcha";
    }
    get defaults() {
        return {
            maxRetries: 30,
            inputSelector: "#captchacharacters"
        };
    }
    async _solveAmazonCaptcha(page, url) {
        const worker = await (0, tesseract_js_1.createWorker)("eng");
        await worker.setParameters({
            tessedit_char_whitelist: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        });
        const { data: { text } } = await worker.recognize(url);
        await page.type(this.opts.inputSelector, text.toUpperCase().replace(" ", ""));
        await page.keyboard.press('Enter');
        await worker.terminate();
    }
    async onPageCreated(page) {
        var retry = 0;
        page.waitForNavigation({
            timeout: this.opts.maxWait
        });
        // await page.setRequestInterception(true); 
        // page.on("request", (req: HTTPRequest) => {
        //     req.continue();
        // })
        page.on("response", async (res) => {
            const req = res.request();
            const url = req.url();
            if (url.toLowerCase().includes("amazon") &&
                url.toLowerCase().includes("captcha") &&
                req.resourceType() === "image" &&
                retry <= this.opts.maxRetries) {
                this._solveAmazonCaptcha(page, url);
                retry++;
            }
        });
    }
}
exports.PuppeteerExtraPluginAmazonCaptcha = PuppeteerExtraPluginAmazonCaptcha;
/** Default export, PuppeteerExtraPluginAmazonCaptcha */
const defaultExport = (options) => {
    return new PuppeteerExtraPluginAmazonCaptcha(options || {});
};
exports.default = defaultExport;
//# sourceMappingURL=index.js.map