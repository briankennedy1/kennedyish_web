import assert from "node:assert/strict";
import test from "node:test";

async function worker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

function environment() {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
}

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

test("server-renders the Brian Kennedy homepage", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    environment(),
    executionContext,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Brian Kennedy \| Looking to solve all my problems/);
  assert.match(html, /Brian <span>Kennedy<\/span>/);
  assert.match(html, /Looking to solve all my problems/);
  assert.match(html, /IKEA’s new Matter over Thread devices/);
  assert.ok(
    html.indexOf("IKEA’s new Matter over Thread devices") <
      html.indexOf("Cleaning up my MESS of a home network"),
  );
  assert.deepEqual(
    [...html.matchAll(/class="video-card" href="\/(\d+)\//g)].map(
      ([, number]) => Number(number),
    ),
    [5, 4, 3, 2, 1],
  );
  assert.doesNotMatch(html, /Powering my house with my electric truck/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("server-renders a chronological short video URL with player and products", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/2", {
      headers: { accept: "text/html" },
    }),
    environment(),
    executionContext,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Rebuilding my home network for ridiculous internet speeds/);
  assert.match(html, /youtube-nocookie\.com\/embed\/xtVD7qWAVH0/);
  assert.match(html, /UniFi Cloud Gateway Fiber/);
  assert.match(html, /Products used/);
  assert.match(html, /rel="canonical" href="http:\/\/localhost:3000\/2\/"/);
});

test("server-renders the unlisted video draft at its direct short URL", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/6", {
      headers: { accept: "text/html" },
    }),
    environment(),
    executionContext,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Powering my house with my electric truck/);
  assert.match(
    html,
    /My truck has a TON of battery energy, but how do I get that power into my house\?/,
  );
  assert.match(html, /July 29, 2026/);
  assert.match(html, /powering-house-electric-truck-placeholder\.jpg/);
  assert.match(html, />BAD</);
  assert.match(html, /you know better, don&#x27;t build this/);
  assert.match(html, /combined-extensioncord-art-v2\.png/);
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4q6smcN"[^>]*>[\s\S]*?extensioncord-art-v2\.png[\s\S]*?Extension Cord/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4yIkgux"[^>]*>[\s\S]*?lightedoutlet-art-v2\.png[\s\S]*?Lighted Male Plug/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4vTBeU3"[^>]*>[\s\S]*?outletcover-art-v2\.png[\s\S]*?Plug Cover/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4pKtgLP"[^>]*>[\s\S]*?kleincatapult-art-v1\.png[\s\S]*?Klein Stripper/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4x3XJ9U"[^>]*>[\s\S]*?kleindriver-art-redo-v1\.png[\s\S]*?Klein Screwdriver/,
  );
  assert.doesNotMatch(html, /youtube-nocookie\.com\/embed/);
  assert.doesNotMatch(html, /Products used/);
});
