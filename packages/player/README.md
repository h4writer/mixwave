# hls.js wrapper

Using https://www.svgrepo.com/collection/solar-broken-line-icons for icons.

## Bugs

- When we have a preroll interstitial and we select the subtitle, it will only respect the first selected subtitle. Changing subtitle afterwards has no effect.

- When interstitials startTime is beyond the end of the content duration, there are stalls sometimes and content stops buffering. This can be replicated manually when setting interstitials further away.

- Selecting audio and quality during interstitials works for the main asset, but subtitles not.

- Seeking to `this.getInterstitialsManager_().integrated.duration` does not work properly.

- InterstitialEvent should contain custom tags (like X-MIX-TYPES).

- Need to talk about ABR & interstitials, do they share the same instance? Same bandwidth estimation? That might give troubles as for all we know eg; interstitials might be on a different CDN.

- Custom HLS tags? Is this needed?
