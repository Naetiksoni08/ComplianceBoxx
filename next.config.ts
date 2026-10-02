import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hostinger's Single shared plan has no persistent Node.js runtime, so the
   * site is emitted as a plain static bundle in `out/` and uploaded straight
   * into `public_html`. The contact form is a standalone PHP file
   * (`public/contact.php`) served by the same host, which is why it is kept
   * inside `public/` — Next copies it into `out/` unchanged.
   */
  output: "export",

  /**
   * There is no image-optimisation server on shared hosting, so `next/image`
   * must emit the plain <img> src instead of pointing at `/_next/image`.
   */
  images: {
    unoptimized: true,
  },

  /**
   * Emit `/about/index.html` (not `/about.html`) so Apache can serve the
   * directory directly. With trailingSlash disabled the export writes only
   * RSC metadata into `out/about/`, which makes `/about` resolve to an empty
   * directory and return HTTP 403 on shared hosting.
   */
  trailingSlash: true,
};

export default nextConfig;
