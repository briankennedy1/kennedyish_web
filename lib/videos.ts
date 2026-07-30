export type Product = {
  name: string;
  description?: string;
  url: string;
  source: string;
  image?: string;
};

export type MiniProjectStep = {
  number: number;
  text: string;
  image: string;
  imageAlt: string;
};

export type MiniProject = {
  label: string;
  subtitle: string;
  theme?: "mustard" | "blue";
  note?: string;
  image?: string;
  imageAlt?: string;
  products: Product[];
  steps?: MiniProjectStep[];
};

export type Video = {
  number: number;
  slug: string;
  youtubeId?: string;
  listed?: boolean;
  title: string;
  shortTitle: string;
  description: string;
  published: string;
  publishedDate: string;
  image: string;
  projects?: MiniProject[];
  products: Product[];
};

export const videos: Video[] = [
  {
    number: 6,
    slug: "powering-house-electric-truck",
    listed: false,
    title: "Powering my house with my electric truck",
    shortTitle: "Powering my house with my electric truck",
    description:
      "My truck has a TON of battery energy, but how do I get that power into my house?",
    published: "Today",
    publishedDate: "July 29, 2026",
    image: "/images/powering-house-electric-truck-placeholder.jpg",
    projects: [
      {
        label: "BAD",
        subtitle: "you know better, don't build this",
        note:
          "If it's a life or death situation, you should know how to make a suicide cord. It's called that because once you plug it in to power the other side is energized and EASILY able to give you a shock. I obviously DO NOT recommend this at all. But if it's the zombie apocalypse, World War III or a week after a 9.5 earthquake with no help in sight this is one way to power up a single circuit or to power one full leg of a split-phase system instead of having to use many extension cords.",
        image: "/images/video-6/combined-extensioncord-art-v2.png",
        imageAlt:
          "A homemade extension cord assembled with a lighted male plug and plug cover",
        products: [
          {
            name: "extension cord",
            url: "https://amzn.to/4q6smcN",
            source: "Amazon",
            image: "/images/video-6/extensioncord-art-v2.png",
          },
          {
            name: "lighted male plug",
            url: "https://amzn.to/4yIkgux",
            source: "Amazon",
            image: "/images/video-6/lightedoutlet-art-v2.png",
          },
          {
            name: "plug cover",
            url: "https://amzn.to/4vTBeU3",
            source: "Amazon",
            image: "/images/video-6/outletcover-art-v2.png",
          },
          {
            name: "klein stripper",
            url: "https://amzn.to/4pKtgLP",
            source: "Amazon",
            image: "/images/video-6/kleincatapult-art-v1.png",
          },
          {
            name: "klein screwdriver",
            url: "https://amzn.to/4x3XJ9U",
            source: "Amazon",
            image: "/images/video-6/kleindriver-art-redo-v1.png",
          },
          {
            name: "klein sidecutters",
            url: "https://amzn.to/4fGFnEZ",
            source: "Amazon",
            image: "/images/video-6/kleinsidecutters-art-v1.png",
          },
        ],
        steps: [
          {
            number: 1,
            text: "Turn generator power off",
            image: "/images/video-6/steps01/step-01-generator-off.png",
            imageAlt: "Generator with its power switch turned off",
          },
          {
            number: 2,
            text: "Break connection with main grid power",
            image: "/images/video-6/steps01/step-02-grid-disconnected.png",
            imageAlt: "Broken electrical connection between the grid and a house",
          },
          {
            number: 3,
            text: "turn all breakers off",
            image: "/images/video-6/steps01/step-03-breakers-off.png",
            imageAlt: "Electrical panel with every breaker switched off",
          },
          {
            number: 4,
            text: "keep cover plug on non-lighted side",
            image: "/images/video-6/steps01/step-04-cover-on.png",
            imageAlt: "Covered plug beside an electrical hazard symbol",
          },
          {
            number: 5,
            text: "Insert lighted plug into DEAD power receptacle",
            image: "/images/video-6/steps01/step-05-lighted-plug.png",
            imageAlt: "Lighted plug being inserted into a dead receptacle",
          },
          {
            number: 6,
            text:
              "remove plastic cover and plug non lighted side into generator power source",
            image: "/images/video-6/steps01/step-06-generator-plug.png",
            imageAlt: "Uncovered plug aligned with a generator receptacle",
          },
          {
            number: 7,
            text: "turn generator power on",
            image: "/images/video-6/steps01/step-07-generator-on.png",
            imageAlt: "Generator with its power switch turned on",
          },
          {
            number: 8,
            text: "Single circuit will be powered",
            image: "/images/video-6/steps01/step-08-single-circuit.png",
            imageAlt: "House with one energized circuit",
          },
          {
            number: 9,
            text:
              "Turn on other home breakers to share power to other circuits on same leg",
            image: "/images/video-6/steps01/step-09-share-power.png",
            imageAlt: "Electrical panel sharing power with several home circuits",
          },
        ],
      },
      {
        label: "UGLY",
        subtitle: "it's better than bad",
        theme: "blue",
        image: "/images/video-6/inletbox-lighted-cord-assembly-art-v4.png",
        imageAlt:
          "A lighted extension cord connected to a covered inlet box assembly",
        note:
          'This is a much better way to energize a dead circuit, but it\'s still not great. The box cover gives you a bit more protection, but you\'re still exposed to danger. Uses all the same tools and materials as the "BAD" cord with three added pieces.',
        products: [
          {
            name: "weatherproof box",
            url: "https://amzn.to/3RF9WD2",
            source: "Amazon",
            image: "/images/video-6/outdoorbox-art-v1.png",
          },
          {
            name: "strain relief",
            url: "https://amzn.to/4wx5568",
            source: "Amazon",
            image: "/images/video-6/strain-art-v1.png",
          },
          {
            name: "inlet receptacle",
            url: "https://amzn.to/4c8Vb28",
            source: "Amazon",
            image: "/images/video-6/box-art-v2.png",
          },
        ],
      },
    ],
    products: [],
  },
  {
    number: 5,
    slug: "ikea-matter-home-assistant",
    youtubeId: "9T-vmiHgYFI",
    title:
      "Overhauling my smart home with IKEA’s new Matter over Thread devices and Home Assistant",
    shortTitle: "IKEA’s Matter devices meet Home Assistant",
    description:
      "Now that IKEA has jumped in, Matter over Thread is finally ready for the big leagues AND it's pretty affordable!",
    published: "2 months ago",
    publishedDate: "April 21, 2026",
    image: "/images/9T-vmiHgYFI.jpg",
    products: [
      {
        name: "CanaKit Raspberry Pi 5 Starter Kit Pro",
        description: "The 4GB Raspberry Pi kit running Home Assistant.",
        url: "https://amzn.to/4cCCeo2",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/81j9KVsffLL.jpg",
      },
      {
        name: "Home Assistant",
        description: "The local-first smart home platform used to bring the setup together.",
        url: "https://www.home-assistant.io/",
        source: "Home Assistant",
        image: "/images/products/home-assistant.png",
      },
      {
        name: "Home Assistant Connect ZBT-2",
        description: "The Thread radio connected to the Raspberry Pi.",
        url: "https://www.amazon.com/dp/B0G34ZTW51?tag=bkxc-20",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/2160WoKFhdL.jpg",
      },
      {
        name: "IKEA KAJPLATS smart bulb",
        description: "The 1100-lumen color and white-spectrum Matter bulb.",
        url: "https://www.ikea.com/us/en/p/kajplats-led-bulb-e26-1100-lumen-smart-color-and-white-spectrum-globe-opal-30611462/",
        source: "IKEA",
        image: "https://www.ikea.com/us/en/images/products/kajplats-led-bulb-e26-1100-lumen-smart-color-and-white-spectrum-globe-opal__1452549_pe991078_s5.jpg",
      },
      {
        name: "IKEA TIMMERFLOTTE sensor",
        description: "The Matter temperature and humidity sensor.",
        url: "https://www.ikea.com/us/en/p/timmerflotte-temperature-humidity-sensor-smart-50618957/",
        source: "IKEA",
        image: "https://www.ikea.com/us/en/images/products/timmerflotte-temperature-humidity-sensor-smart__1402991_pe969207_s5.jpg",
      },
      {
        name: "IKEA GRILLPLATS smart plug",
        description: "The Matter-over-Thread plug with energy monitoring.",
        url: "https://www.ikea.com/us/en/p/grillplats-plug-smart-70624740/",
        source: "IKEA",
        image: "https://www.ikea.com/us/en/images/products/grillplats-plug-smart__1570372_pe1029861_s5.jpg",
      },
      {
        name: "Miady 8-inch extension cords",
        description: "A 10-pack of short outlet-saver extension cords.",
        url: "https://amzn.to/4tYO7vw",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61bH4dGoRVL.jpg",
      },
      {
        name: "IKEA MYGGBETT door/window sensor",
        description: "The contact sensor used on the attic hatch and garage door.",
        url: "https://www.ikea.com/us/en/p/myggbett-door-window-sensor-smart-60617641/",
        source: "IKEA",
        image: "https://www.ikea.com/us/en/images/products/myggbett-door-window-sensor-smart__1420257_pe977237_s5.jpg",
      },
      {
        name: "IKEA BILRESA remote control",
        description: "The dual-button Matter remote used for the bathroom fan.",
        url: "https://www.ikea.com/us/en/p/bilresa-remote-control-white-smart-dual-button-80617876/",
        source: "IKEA",
        image: "https://www.ikea.com/us/en/images/products/bilresa-remote-control-white-smart-dual-button__1402959_pe969197_s5.jpg",
      },
      {
        name: "YoLink Smart Garage Door Kit",
        description: "The garage-door kit used before the Matter conversion.",
        url: "https://amzn.to/3QQ3fwY",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/519ewq0QMOL.jpg",
      },
      {
        name: "Shelly 1 Gen4",
        description: "The relay used to control the garage-door opener.",
        url: "https://www.shelly.com/products/shelly-1-gen4",
        source: "Shelly",
        image: "https://www.shelly.com/cdn/shop/files/Shelly-1-Gen4-main-image.png?v=1739456230",
      },
    ],
  },
  {
    number: 4,
    slug: "cleaning-up-home-network",
    youtubeId: "CT7ARZAsB0E",
    title: "Cleaning up my MESS of a home network",
    shortTitle: "Cleaning up my home network",
    description:
      "It always starts as a simple project: make the network stuff look nice. But I just couldn't help myself and had to give my fancy new rack a fancy new home.",
    published: "3 months ago",
    publishedDate: "March 26, 2026",
    image: "/images/CT7ARZAsB0E.jpg",
    products: [
      {
        name: "DeskPi RackMate T1",
        description: "A compact desktop rack for organizing the core network hardware.",
        url: "https://amzn.to/4tg9Q2I",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61KiB5NEg9L._AC_SL1500_.jpg",
      },
      {
        name: "Print3DSteve rack accessories",
        description: "Custom 3D-printed pieces that make small hardware rack-friendly.",
        url: "https://www.etsy.com/shop/Print3DSteve",
        source: "Etsy",
        image: "/images/products/print3dsteve.png",
      },
      {
        name: "GeekPi 12-port patch panel",
        description: "A keystone patch panel sized for a compact rack.",
        url: "https://amzn.to/4q6GTDD",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/41FL5Ji9a2L._AC_SL1500_.jpg",
      },
      {
        name: "XGS-PON ONT on a stick",
        description: "An SFP+ module that brings the fiber handoff into the rack.",
        url: "https://www.ecin.ca/shop/en-xgsfpp-omac-v8311-xgs-pon-sfp-ont-in-a-stick-w-t-mac-function-local-mgmt-community-fw-8311-10108",
        source: "ECIN",
        image: "https://www.ecin.ca/web/image/product.product/9787/image_1920?unique=8828436",
      },
      {
        name: "IKEA TIMMERFLOTTE sensor",
        description: "A Matter temperature and humidity sensor for the rack.",
        url: "https://www.ikea.com/us/en/p/timmerflotte-temperature-humidity-sensor-smart-50618957/",
        source: "IKEA",
        image: "https://www.ikea.com/us/en/images/products/timmerflotte-temperature-humidity-sensor-smart__1402991_pe969207_s5.jpg",
      },
      {
        name: "IKEA GRILLPLATS smart plug",
        description: "An affordable Matter-over-Thread plug with energy monitoring.",
        url: "https://www.ikea.com/us/en/p/grillplats-plug-smart-70624740/",
        source: "IKEA",
        image: "https://www.ikea.com/us/en/images/products/grillplats-plug-smart__1570372_pe1029861_s5.jpg",
      },
    ],
  },
  {
    number: 3,
    slug: "wifi-7-outdoors",
    youtubeId: "tsxr_ECLVNs",
    title: "WiFi 7 is fast, but it can’t break through walls | UniFi U7 Pro Outdoor",
    shortTitle: "WiFi 7 still can’t break through walls",
    description:
      "I thought my back patio would be covered with overflow WiFi from my backyard shed. But the latest and greatest 6ghz WiFi tech has a tough time penetrating through walls. Let’s build out an outdoor access point and do it right.",
    published: "4 months ago",
    publishedDate: "March 3, 2026",
    image: "/images/tsxr_ECLVNs.jpg",
    products: [
      {
        name: "UniFi U7 Pro XG",
        description: "The indoor WiFi 7 access point used in the shed.",
        url: "https://store.ui.com/us/en/category/wifi-flagship/products/u7-pro-xg?variant=u7-pro-xg-us",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/a433b9e5-4dd1-4784-adf8-9d12bcba4c87/6e27f358-5455-48cc-91be-89d457b5e70f.png",
      },
      {
        name: "UniFi U7 Pro Wall",
        description: "The wall-mounted WiFi 7 access point used inside the house.",
        url: "https://store.ui.com/us/en/category/all-wifi/products/u7-pro-wall",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/7dacb4f6-b703-4154-9264-784f2eb0dbda/f1cb65a5-c557-4e02-bcbb-090502a95b84.png",
      },
      {
        name: "UniFi U7 Pro Outdoor",
        description: "An IP67 WiFi 7 access point with 6 GHz support and a directional antenna.",
        url: "https://store.ui.com/us/en/category/wifi-outdoor/products/u7-pro-outdoor-us",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/29714d60-88e2-482c-aded-e0c456b51f98/277445cb-7d35-4be0-b267-1331067895bf.png",
      },
      {
        name: "UniFi Flex 2.5G PoE",
        description: "The compact multi-gig PoE switch installed in the shed.",
        url: "https://store.ui.com/us/en/products/usw-flex-2-5g-8-poe",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/dd55113e-93b2-40da-b10b-945ab4d609d0.png",
      },
      {
        name: "Pica-Dry 3030 Pencil",
        description: "A long-reach mechanical pencil with a built-in sharpener.",
        url: "https://www.amazon.com/dp/B002X7Y90U?tag=bkxc-20",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/51Y8Prwl1IL.jpg",
      },
      {
        name: "FastCap ProCarpenter Standard Reverse Tape Measure",
        description: "A 25-foot tape measure with readable fractions and an erasable notepad.",
        url: "https://www.amazon.com/dp/B0001GUE3Q?tag=bkxc-20",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61qmmhurzML._SL1200_.jpg",
      },
      {
        name: "trueCABLE Cat6A Shielded Direct Burial Cable",
        description: "The outdoor-rated bulk Ethernet cable used for the shed run.",
        url: "https://www.amazon.com/dp/B09CRHYDXF?tag=bkxc-20",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/71Ig6DTRd-L._SL1500_.jpg",
      },
      {
        name: "FGB Cat6A RJ45 Keystone Couplers",
        description: "A 25-pack of 10 Gbps female-to-female Ethernet keystones.",
        url: "https://amzn.to/4b0ZgVL",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/41-WY09-EPL.jpg",
      },
      {
        name: "Klein Tools VDV226-110 Pass-Thru Crimper",
        description: "The Ethernet crimper used to terminate the shielded cable.",
        url: "https://www.amazon.com/dp/B076MGPQZQ?tag=bkxc-20",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61d+Jq5DB1L._AC_SL1000_.jpg",
      },
      {
        name: "Knipex Super Knips Flush Cutters",
        description: "Compact flush cutters used while terminating the Ethernet cable.",
        url: "https://www.amazon.com/dp/B0048F601Q?tag=bkxc-20",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/71myAmm14WL._AC_SL1500_.jpg",
      },
      {
        name: "Glow rod",
        description: "A flexible cable-running tool for pulling Ethernet through the house.",
        url: "https://amzn.to/3MzQa9l",
        source: "Amazon",
        image: "/images/products/glow-rod.jpg",
      },
      {
        name: "Leatherman ARC",
        description: "The multitool used throughout the installation.",
        url: "https://www.leatherman.com/products/arc",
        source: "Leatherman",
        image: "https://www.leatherman.com/cdn/shop/files/arc_20260402201530_u9uh.jpg?crop=center&height=1200&v=1777553914&width=1200",
      },
      {
        name: "Sika PostFix",
        description: "Expanding fence-post mix used to set the access point pole.",
        url: "https://retail.usa.sika.com/en/products/specialty/sikar-postfixr-fence-post-mix",
        source: "Sika",
        image: "https://sika.scene7.com/is/image/sikacs/us-sika-postfix-light-green-33-oz-main-pack-shot-04327923:1-1?wid=960&hei=960&fit=crop%2C1&fmt=png-alpha",
      },
    ],
  },
  {
    number: 2,
    slug: "rebuilding-home-network",
    youtubeId: "xtVD7qWAVH0",
    title: "Rebuilding my home network for ridiculous internet speeds",
    shortTitle: "A home network built for ridiculous speed",
    description:
      "What better way to fill that hole inside me than to spend a bunch of money so file transfers are faster?",
    published: "5 months ago",
    publishedDate: "February 10, 2026",
    image: "/images/xtVD7qWAVH0.jpg",
    products: [
      {
        name: "UniFi Cloud Gateway Fiber",
        description: "A compact 10G gateway and controller for the rebuilt network.",
        url: "https://store.ui.com/us/en/category/cloud-gateways-compact/collections/cloud-gateway-fiber/products/ucg-fiber",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/48cf74fa-0456-4c5f-bbcc-c1a1ffdc11f9/465257f3-0acc-4a11-bb15-762e7f6c0e9c.png",
      },
      {
        name: "UniFi Switch Pro XG 8 PoE",
        description: "Multi-gig PoE switching with a 10G path through the rack.",
        url: "https://store.ui.com/us/en/products/usw-pro-xg-8-poe",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/104a0f86-8c2e-462d-a95c-ebbc5675ebb8/a78f6eeb-f4ef-4401-aae4-4d8a50e30fce.png",
      },
      {
        name: "UniFi U7 Pro XG",
        description: "A WiFi 7 access point with a 10 GbE uplink.",
        url: "https://store.ui.com/us/en/category/wifi-flagship/products/u7-pro-xg?variant=u7-pro-xg-us",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/a433b9e5-4dd1-4784-adf8-9d12bcba4c87/6e27f358-5455-48cc-91be-89d457b5e70f.png",
      },
      {
        name: "UniFi Flex 2.5G PoE",
        description: "A small multi-gig PoE switch for faster devices at the edge.",
        url: "https://store.ui.com/us/en/products/usw-flex-2-5g-8-poe",
        source: "Ubiquiti",
        image: "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/dd55113e-93b2-40da-b10b-945ab4d609d0.png",
      },
      {
        name: "Glow rod",
        description: "A flexible cable-running tool for getting Ethernet through the house.",
        url: "https://amzn.to/3MzQa9l",
        source: "Amazon",
        image: "/images/products/glow-rod.jpg",
      },
      {
        name: "Tailscale",
        description: "A private mesh network for reaching home services securely.",
        url: "https://tailscale.com/",
        source: "Tailscale",
        image: "/images/products/tailscale.png",
      },
    ],
  },
  {
    number: 1,
    slug: "ditching-power-bricks-usb-c",
    youtubeId: "2_4LWblPQPs",
    title: "Ditching power bricks for USB-C",
    shortTitle: "Ditching power bricks for USB-C",
    description:
      "These old wall wart power adapters are such a pain, if only there was a way to replace them with something a little more sleek.",
    published: "6 months ago",
    publishedDate: "December 31, 2025",
    image: "/images/2_4LWblPQPs.jpg",
    products: [
      {
        name: "SUPERDANNY power strip",
        description: "A compact base for consolidating the new power setup.",
        url: "https://amzn.to/44dlJvi",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/71ul-8eS9IL._AC_SL1500_.jpg",
      },
      {
        name: "Short extension cords",
        description: "Small extensions that keep large plugs from blocking neighboring outlets.",
        url: "https://amzn.to/4ob7o9R",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61bH4dGoRVL._AC_SL1500_.jpg",
      },
      {
        name: "Multixel USB-C charging hub",
        description: "A multi-port USB-C source for replacing several individual adapters.",
        url: "https://amzn.to/4ppcMak",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/710iyx9WnpL._AC_SL1500_.jpg",
      },
      {
        name: "Anker USB-A charging hub",
        description: "A similar multi-port USB-A option for lower-power devices.",
        url: "https://amzn.to/43KveC9",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61-OI5bXY1L._AC_SL1500_.jpg",
      },
      {
        name: "5V barrel-jack assortment",
        description: "USB-to-barrel adapters for common 5-volt devices.",
        url: "https://amzn.to/49BTvNM",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61ovc6fFUWL._AC_SL1500_.jpg",
      },
      {
        name: "12V barrel-jack assortment",
        description: "USB-C PD adapters for common 12-volt devices.",
        url: "https://amzn.to/4joDCNX",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/61L4CrZASkL._AC_SL1500_.jpg",
      },
      {
        name: "Adjustable-voltage barrel-jack set",
        description: "A configurable adapter set for less common voltage requirements.",
        url: "https://amzn.to/445V83t",
        source: "Amazon",
        image: "https://m.media-amazon.com/images/I/6173mfFZ0gL._SL1500_.jpg",
      },
    ],
  },
];

export function getVideo(slug: string) {
  return videos.find((video) => video.slug === slug);
}

export function getVideoByNumber(number: string | number) {
  const parsedNumber =
    typeof number === "number" ? number : Number(number);

  if (!Number.isInteger(parsedNumber)) return undefined;

  return videos.find((video) => video.number === parsedNumber);
}
