# media/

Files for the "Meet Shoukat in 45 seconds" section on the homepage.

The section is **hidden until the video loads**. Drop the files below into this
folder and it appears automatically — no code changes needed. If the video is
missing, visitors see nothing rather than a broken player.

## Expected files

| Filename | Required | Notes |
|---|---|---|
| `shoukat-intro.mp4` | Yes | H.264 / AAC MP4. 1920×1080 or 1280×720, 16:9. Aim for under ~25 MB so it loads quickly. |
| `shoukat-intro-poster.jpg` | Recommended | Thumbnail shown before playback. Same 16:9 dimensions as the video. |
| `shoukat-intro.vtt` | Recommended | WebVTT captions. Without it the caption button is inert. |

Filenames must match exactly — they are referenced in `index.html`.

## Video settings already handled in the markup

- `controls` — native play/pause, scrub, volume, fullscreen
- **no `autoplay`** and **no `loop`**
- `playsinline` so iOS plays inline instead of forcing fullscreen
- `preload="metadata"` — only the header is fetched until someone presses play
- caption `<track>` marked `default`

## Script

Roughly 30–45 seconds:

> Hi, I'm Shoukat Ali Piracha. I'm a recent Quantitative Economics graduate from
> Queens College with experience across startup GTM, financial operations, market
> research, and data analysis. I currently support growth and creator acquisition
> at an early-stage startup, and previously handled financial operations and client
> coordination at Kassam Trading Company. I've also worked on process improvement,
> KPI reporting, and quantitative research projects using Excel, SQL, Python, and
> Power BI. I'm currently exploring opportunities in Business Operations, Strategy &
> Operations, GTM, and analytics. I'm a U.S. citizen based in New York and open to
> relocation.

## Making captions

If you don't have a `.vtt` file, most tools that generate the video can export one.
The format is plain text:

```
WEBVTT

00:00:00.000 --> 00:00:04.500
Hi, I'm Shoukat Ali Piracha. I'm a recent
Quantitative Economics graduate from Queens College

00:00:04.500 --> 00:00:09.000
with experience across startup GTM, financial
operations, market research, and data analysis.
```

## If the presenter is AI-generated

`index.html` contains a commented-out `<p class="video-note">` directly below the
video element. Uncomment it to disclose that the presenter is synthetic. Do this if
the video uses an AI avatar delivering the first-person script — a recruiter who
later meets you in person should not be surprised.
