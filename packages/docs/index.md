---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: <img class="logo" src="/mixwave/logo.svg" /> <span class="hidden">Mixwave</span>
  text: "Convert, package and manipulate on the fly."
  tagline: "A friendly API to simplify the complexities of video delivery."
  actions:
    - theme: brand
      text: Introduction
      link: /introduction
    - theme: alt
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/matvp91/mixwave

features:
  - title: Transcode
    details: Converting a video file from one format or codec to another, at scale.
    icon:
      src: /transcode.svg
  - title: Package
    details: Prepare and organize video files for delivery and playback.
    icon:
      src: /package.svg
  - title: Stitch
    details: Manipulate and craft HLS playlists on the fly, supports HLS interstitials.
    icon:
      src: /stitch.svg
---
