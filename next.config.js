/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  extends: ["next", "prettier", "next/core-web-vitals"],
  rules: {
    "react/no-underscaped-entities": [
      "error",
      {
        forbid: [
          {
            char: ">",
            alternatives: ["&gt;"],
          },
          {
            char: "}",
            alternatives: ["&#125;"],
          },
        ],
      },
    ],
    "@next/next/no-page-custom-font": "off",
  },
  env: {
    production: "https://blogapies.herokuapp.com/graphql",
    development: "http://localhost:4000/graphql",
    webscoket: "wss://blogapies.herokuapp.com/graphql",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
