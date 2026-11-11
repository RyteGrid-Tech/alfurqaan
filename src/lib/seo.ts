import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { DEFAULT_SITE_ORIGIN, normalizeOrigin } from "./seo-meta";

export * from "./seo-meta";

export const getRequestOrigin = createIsomorphicFn()
  .server(() => {
    try {
      return normalizeOrigin(getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin);
    } catch {
      return DEFAULT_SITE_ORIGIN;
    }
  })
  .client(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return normalizeOrigin(window.location.origin);
    }
    return DEFAULT_SITE_ORIGIN;
  });
