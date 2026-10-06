# shoukat2002.github.io

Personal portfolio of Shoukat Ali Piracha — a static site (HTML, CSS, JavaScript), no build step.

## Upload to the new repository

1. On GitHub, create a **new public repository** named exactly `shoukat2002.github.io`.
   Leave "Add a README" **unchecked**.
2. On the empty repository page, click **uploading an existing file**.
3. Drag in **everything inside this folder** (not the folder itself), so that
   `index.html` sits at the top level of the repository.
   - On Windows, `.nojekyll` may be hidden. Turn on **View → Show → Hidden items** so it uploads too.
4. Click **Commit changes**.

## Turn on GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
4. Open the **Actions** tab and wait for the green check (usually under a minute).
5. Visit https://shoukat2002.github.io/ in a private window.

## Files

| File | Purpose |
|---|---|
| `index.html` | The page |
| `styles.css`, `script.js` | Styling and interactions |
| `og-image.png` | Link-preview image for LinkedIn, iMessage, etc. |
| `Shoukat_Ali_Piracha_Resume.pdf` | Linked from every Resume button |
| `Remote_Work_and_Wage_Dynamics_Piracha.pdf` | Project PDF |
| `CPS_Wage_Analysis_Piracha.pdf`, `CPS_Wage_Analysis_Piracha.qmd` | Project PDF and code |
| `.nojekyll` | Tells GitHub to publish the files as-is (no Jekyll processing) |

## When you start at JPMorganChase (October 12, 2026)

Update three places, each marked with a comment in `index.html`:
the hero line under your name, the JPMorganChase entry in Experience
(title, date, and bullets), and replace `Shoukat_Ali_Piracha_Resume.pdf`.
