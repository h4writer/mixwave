---
next:
  text: "Features: Dashboard"
  link: "/features/dashboard"
---

# Stitcher

Stitcher is a playlist manipulator that can insert HLS interstitials on-the-fly. Several use cases include:

- Insert ads at given cue points.
- Add a bumper manifest at the start of a playlist, like Netflix' intro.

::: info
Stitcher is in alpha, until we have proper documentation for this, refer to the source for more info and the API contract. Get in touch if you have questions!
:::

## Create a session

Each playout to a viewer can be considered a session.

```sh [shell]
curl -X POST https://stitcher.domain.com/session
  -H "Content-Type: application/json"
  -d "{body}"
```

A minimal body payload may look like this:

```json
{
  "assetId": "f7e89553-0d3b-4982-ba7b-3ce5499ac689"
}
```

Behind the scenes, stitcher will create a session and return you a personalised playlist url. Each session is identifiable by a randomly generated uuid. In the example below, we got back a new session with id `44220f14-ffdd-4cfa-a67f-62ef421b4460`. As all we did was create a session with an `assetId`, the resulting master playlist will only cover that asset. Scroll further down if you'd like to extend the session with ads or a bumper.

```json
{
  "url": "https://stitcher.domain.com/session/44220f14-ffdd-4cfa-a67f-62ef421b4460/master.m3u8"
}
```

## Playlist manipulation

### Limit resolution

```json
{
  "assetId": "f7e89553-0d3b-4982-ba7b-3ce5499ac689",
  "maxResolution": 480
}
```

## Interstitials

### Manual

Let's say you transcoded and packaged a new asset with the id `abbda878-8e08-40f6-ac8b-3507f263450a`. The example below will add it as an interstitial. An HLS interstitials supported player will then switch to the new asset at position `10` and when finished, it'll go back to the main master playlist.

```json
{
  "assetId": "f7e89553-0d3b-4982-ba7b-3ce5499ac689",
  "interstitials": [
    {
      "timeOffset": 10,
      "assetId": "abbda878-8e08-40f6-ac8b-3507f263450a"
    }
  ]
}
```

### Bumper

You can manually add a bumper at timeOffset 0 but it is advised to use the `bumperAssetId` option instead.

```json
{
  "assetId": "f7e89553-0d3b-4982-ba7b-3ce5499ac689",
  "bumperAssetId": "abbda878-8e08-40f6-ac8b-3507f263450a"
}
```

::: info
When you use both vmapUrl and bumperAssetId, it'll add the bumper interstitial as the last asset in a preroll (starting from 0).
:::

### VMAP

Instruct stitcher to add interstitials based on VMAP definitions. Each VMAP contains one or more `AdBreak` elements with a position of where the interstitial should be.

```json
{
  "assetId": "f7e89553-0d3b-4982-ba7b-3ce5499ac689",
  "vmapUrl": "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpost&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&cmsid=496&vid=short_onecue&correlator="
}
```

1. Stitcher will fetch the VMAP. Parses, resolves and flattens each corresponding VAST.
2. For each ad that has not yet been transcoded, it'll start a transcode and package job with sane defaults.
   - Each transcode or package job responsible for an ad is tagged with `ad` and can be observed in the dashboard.
3. For each ad that is available, it'll add an interstitial for playback.

::: warning
Ad impressions are not tracked yet, we'd eventually like to provide a client wrapper that tracks ads in a certified manner.
:::
