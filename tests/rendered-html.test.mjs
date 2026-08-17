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
  assert.match(html, /<main class="home-page">/);
  assert.match(html, /Brian Kennedy \| home improvement tech/);
  assert.match(html, /Brian <span>Kennedy<\/span>/);
  assert.match(html, /home improvement tech/);
  assert.match(html, /on YouTube/);
  assert.doesNotMatch(html, /youtube\.com\/@bkxc/);
  assert.match(html, /Powering my house with my electric truck/);
  assert.match(html, /August 4, 2026/);
  assert.match(html, /IKEA’s new Matter over Thread devices/);
  assert.ok(
    html.indexOf("IKEA’s new Matter over Thread devices") <
      html.indexOf("Cleaning up my MESS of a home network"),
  );
  assert.deepEqual(
    [...html.matchAll(/class="video-card" href="\/(\d+)\//g)].map(
      ([, number]) => Number(number),
    ),
    [6, 5, 4, 3, 2, 1],
  );
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

test("server-renders the listed video project at its direct short URL", async () => {
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
  assert.match(
    html,
    /I&#x27;m going through the UGLY, the BAD and eventually get to the GOOD way to do this\./,
  );
  assert.match(html, /August 4, 2026/);
  assert.match(html, /youtube-nocookie\.com\/embed\/Nm3KOjhk91Q/);
  assert.match(html, />BAD</);
  assert.match(html, /you know better, don&#x27;t build this/);
  assert.match(html, /combined-extensioncord-art-v2-1400\.webp/);
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4q6smcN"[^>]*>[\s\S]*?extensioncord-art-v2-900\.webp[\s\S]*?extension cord/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4yIkgux"[^>]*>[\s\S]*?lightedoutlet-art-v2-900\.webp[\s\S]*?lighted male plug/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4vTBeU3"[^>]*>[\s\S]*?outletcover-art-v2-900\.webp[\s\S]*?plug cover/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4pKtgLP"[^>]*>[\s\S]*?kleincatapult-art-v1-900\.webp[\s\S]*?klein stripper/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4x3XJ9U"[^>]*>[\s\S]*?kleindriver-art-redo-v1-900\.webp[\s\S]*?klein screwdriver/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4fGFnEZ"[^>]*>[\s\S]*?kleinsidecutters-art-v1-900\.webp[^>]*mini-project-product-image-tilted[\s\S]*?klein sidecutters/,
  );
  assert.match(html, /If it&#x27;s a life or death situation/);
  assert.match(html, /zombie apocalypse, World War III/);
  assert.match(
    html,
    /one full leg of a split-phase system instead of having to use many extension cords/,
  );
  assert.doesNotMatch(html, /mini-project-step-grid/);
  assert.doesNotMatch(html, /step-01-generator-off-640\.webp/);
  assert.doesNotMatch(html, /step-09-share-power-640\.webp/);
  assert.match(html, />LESS BAD</);
  assert.match(html, /it&#x27;s better than bad/);
  assert.match(
    html,
    /mini-project-section mini-project-section-blue[\s\S]*?inletbox-lighted-cord-assembly-art-v4-1400\.webp/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/3RF9WD2"[^>]*>[\s\S]*?outdoorbox-art-v1-900\.webp[\s\S]*?weatherproof box/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4wx5568"[^>]*>[\s\S]*?strain-art-v1-900\.webp[\s\S]*?strain relief/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4c8Vb28"[^>]*>[\s\S]*?box-art-v2-900\.webp[\s\S]*?inlet receptacle/,
  );
  assert.match(
    html,
    /This is a much better way to energize a dead circuit, but it&#x27;s still not great\./,
  );
  assert.match(
    html,
    /Uses all the same tools and materials as the &quot;BAD&quot; cord with three added pieces\./,
  );
  assert.match(html, />GOOD</);
  assert.match(html, /quick and easy emergency power, the right way/);
  assert.match(
    html,
    /mini-project-section mini-project-section-red[\s\S]*?>GOOD</,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4c373Tp"[^>]*>[\s\S]*?generac-art-v2-900\.webp[\s\S]*?Generac Homelink/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4w71871"[^>]*>[\s\S]*?nm-b-cable-art-v1-900\.webp[\s\S]*?50FT 10\/3 NM-B Cable/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4pYJWiH"[^>]*>[\s\S]*?label-maker-art-v1-900\.webp[\s\S]*?Label Maker/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4pYJYqP"[^>]*>[\s\S]*?wago-connectors-art-v1-900\.webp[\s\S]*?Wago connectors/,
  );
  assert.match(
    html,
    /This is the way to do it\. Remove your 8 critical loads from your panel and wire them up to a Generac transfer switch\./,
  );
  assert.match(
    html,
    /I didn&#x27;t show using the label maker, but it&#x27;s a key piece of the puzzle to do the job right\./,
  );
  assert.ok(
    html.indexOf(">LESS BAD<") < html.indexOf(">GOOD<") &&
      html.indexOf(">GOOD<") <
      html.indexOf("Some links may be affiliate links"),
  );
  assert.match(html, /mini-project-affiliate-footer/);
  assert.doesNotMatch(html, /Products used/);
});

test("server-renders the unlisted video 7 draft at its direct short URL", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/7", {
      headers: { accept: "text/html" },
    }),
    environment(),
    executionContext,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(
    html,
    /BARE BONES solar EV charging should save me \$100 a month/,
  );
  assert.match(
    html,
    /The panels have spent a long time in my garage gathering dust\./,
  );
  assert.match(
    html,
    /get SOMETHING up and running that will be able to charge my truck\./,
  );
  assert.match(html, /video-7-placeholder\.svg/);
  assert.match(html, /rel="canonical" href="http:\/\/localhost:3000\/7\/"/);
  assert.doesNotMatch(html, /youtube-nocookie\.com\/embed/);
  assert.match(html, />TOOLS</);
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4fGFnEZ"[^>]*>[\s\S]*?kleinsidecutters-art-v1-900\.webp[^>]*mini-project-product-image-tilted[\s\S]*?klein sidecutters/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4pKtgLP"[^>]*>[\s\S]*?kleincatapult-art-v1-900\.webp[\s\S]*?klein stripper/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4x3XJ9U"[^>]*>[\s\S]*?kleindriver-art-redo-v1-900\.webp[\s\S]*?klein screwdriver/,
  );
  assert.match(
    html,
    /href="https:\/\/amzn\.to\/4pYJYqP"[^>]*>[\s\S]*?wago-connectors-art-v1-900\.webp[\s\S]*?Wago connectors/,
  );

  const homepageResponse = await app.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    environment(),
    executionContext,
  );
  const homepageHtml = await homepageResponse.text();
  assert.doesNotMatch(
    homepageHtml,
    /BARE BONES solar EV charging should save me \$100 a month/,
  );
});
