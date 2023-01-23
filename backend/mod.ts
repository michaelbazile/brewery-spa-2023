import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { env } from "./config.ts";
import { leafletMapUrlGenerator } from "./leafletMapUrl.ts";

const port = Number(env.PORT);
const app = new Application();
const router = new Router();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

// Basic logger
app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.request.method} ${ctx.request.url}`);
});

//Servers up leafletmap
app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}`,
      index: "leafletMap.html",
    });
  } catch {
    await next();
  }
});
router
  .get("/", (ctx) => {
    ctx.response.body = "Hello World!";
  })
  .get(
    "/generateMap",
    async ({
      request: {
        url: { searchParams },
      },
      response,
    }) => {
      const lat = searchParams.get("lat");
      const lng = searchParams.get("lng");
      if (`${lat}` === "null" || `${lng}` === "null") {
        response.body = JSON.stringify(env.DEFAULT_IMAGE_URL);
        return;
      }

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${env.LEAFLET_MAP_URL}?lat=${lat}&lng=${lng}`);
      await page.waitForXPath(
        "//img[@class='leaflet-tile leaflet-tile-loaded'][1]"
      );
      const content = await page.$("#map");

      const screenshotBuffer = await content!.screenshot({
        omitBackground: true,
        encoding: "base64",
      });
      const screenshotBufferURI = `data:image/png;base64,${screenshotBuffer}`;
      const { url: cloudinaryMapURL } = await leafletMapUrlGenerator(
        screenshotBufferURI
      );

      await page.close();
      await browser.close();

      response.body = JSON.stringify(cloudinaryMapURL);
    }
  );

console.log(`Server listening on http://localhost:${port} 🍻`);
await app.listen({ port });
