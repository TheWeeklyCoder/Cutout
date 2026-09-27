# Cutout — what's new, and how to set it up

## Files
- `index.html` — the app itself (open this to use it)
- `manifest.webmanifest` — makes the app installable
- `sw.js` — lets it keep working offline once installed
- `logo.png`, `logo-192.png`, `logo-512.png` — **placeholder** icons/logo (see below)

## Add your logo
Replace the three placeholder image files with your own, keeping the same file names:
- `logo.png` — shown in the header (any size, roughly square works best)
- `logo-192.png` — 192×192px, used as the installed app icon
- `logo-512.png` — 512×512px, used as the installed app icon (larger devices/splash screens)

Nothing else needs to change — `index.html` and `manifest.webmanifest` already point at these file names.

## Making it installable
For "Install app" / "Add to Home Screen" to work, the four files above need to be uploaded together to a web host so they're served over **https** (installing straight from a `file://` link on your phone doesn't support this — it's a browser/OS restriction, not something the code can work around). Any of these work well and are free:
- GitHub Pages
- Netlify or Vercel (drag-and-drop the folder)
- Your own web host, if you have one

Once it's hosted, open the link on your phone in Chrome (Android) or Safari (iOS):
- **Android/Chrome**: you'll see an "Install app" button in the header, or use the browser menu → "Install app" / "Add to Home Screen".
- **iOS/Safari**: use the Share icon → "Add to Home Screen" (iOS doesn't show a browser install prompt, but the result is the same — an icon on the home screen that opens full-screen).

Everything the tool does (background removal, painting, compression) runs entirely on the device — hosting is only needed to make it installable, not for the tool to function.

## What's new
- **Smart background removal** for busy, photographic backgrounds (not just plain colours/green screens) — a "Photo / complex" mode next to the existing "Plain colour" mode.
- **Paint brush** for covering watermarks or blemishes with a solid colour, with a colour picker, a text box to paste a hex code directly, and a copy button.
- Every detected/plain background colour now shows its hex code in an editable, copyable box.
- An **X button** on the image preview to remove the loaded image and start over.
- Installable as an app, with a spot reserved for your logo (shown in the header and as the app icon).
- Updated wording and icon on the start screen to reflect general background removal, not just green screens.
