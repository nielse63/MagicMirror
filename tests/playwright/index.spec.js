const { chromium } = require("playwright");
const expect = require("expect");
let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:8080");
});
afterAll(async () => {
  await browser.close();
});

it("should work", async () => {
  expect(await page.title()).toBe("MagicMirror²");
});
