---
next:
  text: "Features: Stitcher"
  link: "/features/stitcher"
---

# Package

The package job will prepare an HLS playlist for your asset. Before you package, check the [transcode](/features/transcode) instructions.

::: code-group

```sh [shell]
curl -X POST https://api.domain.com/package
  -H "Content-Type: application/json"
  -d "{body}"
```

:::

A minimal body payload may look like this:

```json
{
  "assetId": "f7e89553-0d3b-4982-ba7b-3ce5499ac689"
}
```

Your asset is now available for playback at:

```
{S3_PUBLIC_URL}/package/f7e89553-0d3b-4982-ba7b-3ce5499ac689/hls/master.m3u8
```

::: tip
Each package result is uploaded to /package/{assetId}/hls/master.m3u8
:::
