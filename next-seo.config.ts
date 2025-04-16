export const defaultSEOConfig = {
    title: "Rettiwt",
    description: "Web based social media for retweeting and sharing tweets",
    icons: {
        icon: "/Logo.png",
      },
    openGraph: {
        type: "website",
        locale: "id_ID",
        url: "https://rettiwt.vercel.app/",
        site_name: "Rettiwt",
        images: [
            {
                url: "/Logo.png",
                width: 800,
                height: 600,
                alt: "Rettiwt Logo",
            },
        ],
    },
    twitter: {
        handle: "@rettiwt",
        site: "@rettiwt",
        cardType: "summary_large_image",
    },
}