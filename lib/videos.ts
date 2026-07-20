export type Product = {
  name: string;
  description: string;
  url: string;
  source: string;
};

export type Video = {
  slug: string;
  youtubeId: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string[];
  duration: string;
  views: string;
  published: string;
  category: string;
  image: string;
  products: Product[];
};

export const videos: Video[] = [
  {
    slug: "ikea-matter-home-assistant",
    youtubeId: "9T-vmiHgYFI",
    title:
      "Overhauling my smart home with IKEA’s new Matter over Thread devices and Home Assistant",
    shortTitle: "IKEA’s Matter devices meet Home Assistant",
    summary:
      "IKEA’s affordable new Matter-over-Thread lineup might be the moment the standard finally feels ready for a real home. Here’s the setup, the promise, and where Home Assistant fits in.",
    description: [
      "Matter has spent years being the future of the smart home. IKEA’s new range makes a more practical case: small, useful devices at prices that make whole-home experiments possible.",
      "This project looks at the new lineup through a Home Assistant household—how the Thread network fits together, what the devices are like to live with, and whether the experience is finally simple enough for everyone else in the house.",
    ],
    duration: "23:08",
    views: "27K views",
    published: "2 months ago",
    category: "Smart home",
    image: "/images/9T-vmiHgYFI.jpg",
    products: [
      {
        name: "IKEA Matter-compatible range",
        description: "IKEA’s new family of Thread sensors, controls, and lighting.",
        url: "https://www.ikea.com/us/en/product-guides/ikea-home-smart-system/ikea-matter-compatible-system-pub7ab815e0/",
        source: "IKEA",
      },
      {
        name: "Home Assistant",
        description: "The local-first smart home platform used to bring the setup together.",
        url: "https://www.home-assistant.io/",
        source: "Home Assistant",
      },
      {
        name: "IKEA DIRIGERA hub",
        description: "IKEA’s Matter controller, bridge, and Thread border router.",
        url: "https://www.ikea.com/us/en/p/dirigera-hub-for-smart-products-white-smart-50503414/",
        source: "IKEA",
      },
    ],
  },
  {
    slug: "cleaning-up-home-network",
    youtubeId: "CT7ARZAsB0E",
    title: "Cleaning up my MESS of a home network",
    shortTitle: "Cleaning up my home network",
    summary:
      "The network works, but the rack tells a different story. This is the cleanup: a compact rack, a proper patch panel, a tidier fiber handoff, and a few smart-home finishing touches.",
    description: [
      "A fast home network is only half the job. When cables, adapters, switches, and tiny computers grow organically, even a good setup becomes hard to understand and harder to maintain.",
      "This rebuild puts everything into a small, legible rack and gives every connection a place. The result is less visual noise, easier troubleshooting, and room for the network to keep evolving.",
    ],
    duration: "20:42",
    views: "99K views",
    published: "3 months ago",
    category: "Home network",
    image: "/images/CT7ARZAsB0E.jpg",
    products: [
      {
        name: "DeskPi RackMate T1",
        description: "A compact desktop rack for organizing the core network hardware.",
        url: "https://amzn.to/4tg9Q2I",
        source: "Amazon",
      },
      {
        name: "Print3DSteve rack accessories",
        description: "Custom 3D-printed pieces that make small hardware rack-friendly.",
        url: "https://www.etsy.com/shop/Print3DSteve",
        source: "Etsy",
      },
      {
        name: "GeekPi 12-port patch panel",
        description: "A keystone patch panel sized for a compact rack.",
        url: "https://amzn.to/4q6GTDD",
        source: "Amazon",
      },
      {
        name: "XGS-PON ONT on a stick",
        description: "An SFP+ module that brings the fiber handoff into the rack.",
        url: "https://ecin.ca/custom-xgs-pon-sfp-stick-module-xgspon-ont-w-t-mac-function-mounted-on-sfp-package/",
        source: "ECIN",
      },
      {
        name: "IKEA TIMMERFLOTTE sensor",
        description: "A Matter temperature and humidity sensor for the rack.",
        url: "https://www.ikea.com/us/en/p/timmerflotte-temperature-humidity-sensor-smart-50618957/",
        source: "IKEA",
      },
      {
        name: "IKEA GRILLPLATS smart plug",
        description: "An affordable Matter-over-Thread plug with energy monitoring.",
        url: "https://www.ikea.com/us/en/p/grillplats-plug-smart-70624740/",
        source: "IKEA",
      },
    ],
  },
  {
    slug: "wifi-7-outdoors",
    youtubeId: "tsxr_ECLVNs",
    title: "WiFi 7 is fast, but it can’t break through walls | UniFi U7 Pro Outdoor",
    shortTitle: "WiFi 7 still can’t break through walls",
    summary:
      "Fast WiFi inside the shed did not mean fast WiFi on the patio. The fix is an outdoor access point, a clean cable run, and a test of what 6 GHz can actually do in the real world.",
    description: [
      "The newest WiFi standards are spectacular at short range, but physics still gets the last word. Walls are especially unforgiving to the 6 GHz band that gives WiFi 7 so much of its headline speed.",
      "This project moves the radio where it belongs: outside. The installation and testing show when an outdoor access point is worth the effort—and why placement often matters more than the number on the box.",
    ],
    duration: "33:24",
    views: "13K views",
    published: "4 months ago",
    category: "WiFi",
    image: "/images/tsxr_ECLVNs.jpg",
    products: [
      {
        name: "UniFi U7 Pro Outdoor",
        description: "An IP67 WiFi 7 access point with 6 GHz support and a directional antenna.",
        url: "https://store.ui.com/us/en/category/wifi-outdoor/products/u7-pro-outdoor-us",
        source: "Ubiquiti",
      },
    ],
  },
  {
    slug: "rebuilding-home-network",
    youtubeId: "xtVD7qWAVH0",
    title: "Rebuilding my home network for ridiculous internet speeds",
    shortTitle: "A home network built for ridiculous speed",
    summary:
      "A full UniFi overhaul built around multi-gig fiber, 10-gig switching, WiFi 7, and the irresistible urge to make local file transfers much faster than they need to be.",
    description: [
      "The old network had reached its limits. This rebuild starts at the gateway and follows the fastest useful path through switching, wireless, and the smaller edge connections around the house.",
      "It is equal parts infrastructure project and speed experiment: what it takes to move beyond gigabit, where the bottlenecks migrate, and which upgrades make the whole system nicer to use.",
    ],
    duration: "24:55",
    views: "134K views",
    published: "5 months ago",
    category: "Home network",
    image: "/images/xtVD7qWAVH0.jpg",
    products: [
      {
        name: "UniFi Cloud Gateway Fiber",
        description: "A compact 10G gateway and controller for the rebuilt network.",
        url: "https://store.ui.com/us/en/category/cloud-gateways-compact/collections/cloud-gateway-fiber/products/ucg-fiber",
        source: "Ubiquiti",
      },
      {
        name: "UniFi Switch Pro XG 8 PoE",
        description: "Multi-gig PoE switching with a 10G path through the rack.",
        url: "https://store.ui.com/us/en/products/usw-pro-xg-8-poe",
        source: "Ubiquiti",
      },
      {
        name: "UniFi U7 Pro XG",
        description: "A WiFi 7 access point with a 10 GbE uplink.",
        url: "https://store.ui.com/us/en/category/wifi-flagship/products/u7-pro-xg?variant=u7-pro-xg-us",
        source: "Ubiquiti",
      },
      {
        name: "UniFi Flex 2.5G PoE",
        description: "A small multi-gig PoE switch for faster devices at the edge.",
        url: "https://store.ui.com/us/en/products/usw-flex-2-5g-8-poe",
        source: "Ubiquiti",
      },
      {
        name: "Glow rod",
        description: "A flexible cable-running tool for getting Ethernet through the house.",
        url: "https://amzn.to/3MzQa9l",
        source: "Amazon",
      },
      {
        name: "Tailscale",
        description: "A private mesh network for reaching home services securely.",
        url: "https://tailscale.com/",
        source: "Tailscale",
      },
    ],
  },
  {
    slug: "ditching-power-bricks-usb-c",
    youtubeId: "2_4LWblPQPs",
    title: "Ditching power bricks for USB-C",
    shortTitle: "Ditching power bricks for USB-C",
    summary:
      "A drawer full of wall warts becomes one cleaner charging setup, using USB-C power delivery and the right barrel-jack adapters to run everyday low-voltage gear.",
    description: [
      "Old power adapters are bulky, mismatched, and surprisingly difficult to organize. Many of them are also delivering simple 5- or 12-volt power that a modern USB-C source can provide more neatly.",
      "This experiment consolidates the mess, matches voltage and connector sizes carefully, and finds out where USB-C is a genuinely better replacement—and where the original adapter should stay.",
    ],
    duration: "11:15",
    views: "155K views",
    published: "6 months ago",
    category: "Projects",
    image: "/images/2_4LWblPQPs.jpg",
    products: [
      {
        name: "SUPERDANNY power strip",
        description: "A compact base for consolidating the new power setup.",
        url: "https://amzn.to/44dlJvi",
        source: "Amazon",
      },
      {
        name: "Short extension cords",
        description: "Small extensions that keep large plugs from blocking neighboring outlets.",
        url: "https://amzn.to/4ob7o9R",
        source: "Amazon",
      },
      {
        name: "Multixel USB-C charging hub",
        description: "A multi-port USB-C source for replacing several individual adapters.",
        url: "https://amzn.to/4ppcMak",
        source: "Amazon",
      },
      {
        name: "USB-C charging hub",
        description: "A second high-output hub option used in the comparison.",
        url: "https://amzn.to/3K93e4g",
        source: "Amazon",
      },
      {
        name: "Anker USB-A charging hub",
        description: "A similar multi-port USB-A option for lower-power devices.",
        url: "https://amzn.to/43KveC9",
        source: "Amazon",
      },
      {
        name: "5V barrel-jack assortment",
        description: "USB-to-barrel adapters for common 5-volt devices.",
        url: "https://amzn.to/49BTvNM",
        source: "Amazon",
      },
      {
        name: "12V barrel-jack assortment",
        description: "USB-C PD adapters for common 12-volt devices.",
        url: "https://amzn.to/4joDCNX",
        source: "Amazon",
      },
      {
        name: "Adjustable-voltage barrel-jack set",
        description: "A configurable adapter set for less common voltage requirements.",
        url: "https://amzn.to/445V83t",
        source: "Amazon",
      },
    ],
  },
];

export function getVideo(slug: string) {
  return videos.find((video) => video.slug === slug);
}
