# Brian Contreras — portfolio site setup guide

This folder is a complete website. GitHub Pages hosts it for free.
Everything below happens in the GitHub website in your browser: no coding tools and no command line.

Time needed: about 20 minutes.

---

## What's in this folder

| Item | What it is |
|---|---|
| `index.html` | The homepage |
| `off-the-gaze/`, `the-agent/`, `kynd/`, `re-create/`, `touch-grass/`, `amerihcc-licc/` | One folder per project page |
| `assets/` | The design (`style.css`) and the interactive effects (`site.js`) |
| `media/` | **Empty on purpose.** Your images and PDFs go here (step 1) |
| `README.md` | This guide |

---

## 1. Put your images in the `media` folder

Copy all your image files and the award letter PDF into the `media` folder, **with their names exactly as they are now**. The pages already point to these names:

```
alexa_misc_cargo.png          nostalgia_tgrass_cargo.png
architecture_otgaze_cargo.png nri_misc_cargo.png
basket_tgrass_cargo.png       outcome_recreate_cargo.png
blankbox_recreate_cargo.png   performance_tagent_cargo.png
closeup_otgaze_cargo.png      picnic_tgrass_cargo.png
entrace_recreate_cargo.png    quetzal_cargo.png
exhibit_recreate_cargo.png    rooms_recreate_cargo.png
final_otgaze_cargo.png        samplebox_recreate_cargo.png
final_recreate_cargo.png      schematic_otgaze_cargo.png
hashtag_tgrass_cargo.png      schematic_recreate_cargo.png
headshot_cargo.png            setup_recreate_cargo.png
inprogress_otgaze_cargo.png   spotrecording_otgaze_cargo.png
inprogress_tgrass_cargo.png   still_alicc_cargo.png
journey_kynd_cargo.png        storyboard_recreate_cargo.png
logo_kynd_cargo.png           team_kynd_cargo.png
map_tgrass_cargo.png          team_otgaze_cargo.png
mlearning_kynd_cargo.png      team_recreate_cargo.png
narrative_tagent_cargo.png    textbooks_misc_cargo.png
                              timelinedraft_tagent_carog.png
                              vision_alicc_cargo.png
Contreras_Scholarship Award Letter_TSAF.pdf
```

Notes:
- Keep the two odd spellings as they are: `entrace_recreate_cargo.png` and `timelinedraft_tagent_carog.png`. The site expects exactly these names.
- You don't need `filenames.txt` on the site.
- **Your thesis PDF:** name it `thesis.pdf` and put it in `media` too. The "Download Complete Thesis PDF" link points there.
- **Make the images smaller first (recommended).** Large PNGs make the site slow to load. Drop each one into [squoosh.app](https://squoosh.app), keep the same file name, and aim for under about 1 MB each. GitHub also refuses any single file over 100 MB.
- **Award letter:** it will be public. Check it doesn't show anything you'd rather keep private, such as a home address or ID number.

Tip: before uploading, double-click `index.html` to preview the whole site on your computer. If an image name doesn't match, its spot will say `[ missing image: media/… ]`.

## 2. Create a GitHub account and a repository

1. Sign up at [github.com](https://github.com) (free). Your **username** becomes part of your site address.
2. Click **+** (top right) → **New repository**.
3. **Repository name:** `yourusername.github.io`, using your exact username. For example, if your username is `briancontreras`, name it `briancontreras.github.io`.
4. Set it to **Public**.
5. Click **Create repository**.

## 3. Upload the site

1. On the new repository's page, click the link **uploading an existing file**.
2. Open this folder on your computer and select **everything inside it**: `index.html`, `README.md`, and the folders `assets`, `media`, `off-the-gaze`, `the-agent`, `kynd`, `re-create`, `touch-grass`, `amerihcc-licc`.
   Drag them all into the upload area together.
   Drag the *contents*, not the outer folder itself, so that `index.html` ends up at the top level.
3. Wait until every file has finished uploading. With lots of images this can take a few minutes.
4. Scroll down and click **Commit changes**.

## 4. Turn on GitHub Pages

1. In the repository, click **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait 1–3 minutes, then refresh. A box at the top shows **"Your site is live at https://yourusername.github.io"**.

That's it. The site is online.

---

## Making changes later

**Edit text:** open the file on GitHub (for example `kynd/index.html`), click the **pencil icon**, make the change, then click **Commit changes**. The live site updates within a minute or two.

**Replace an image:** go into the `media` folder on GitHub → **Add file** → **Upload files**. Upload the new image **with the same file name** as the one it replaces, then commit.

**Add a new image to a page:** in that page's file, copy an existing block like this one, then change the file name and caption:

```html
<figure class="media-item">
  <img src="../media/your_new_image.png" alt="Short description" loading="lazy" decoding="async">
  <figcaption class="media-caption">Fig 8. Your caption.</figcaption>
</figure>
```

**Change a work's colour:** find that work's `<section class="portfolio-block">` on the homepage and add `data-color="#ff3ea5"` (any colour code) inside the opening tag.

**Captions:** the figure captions were written from the image file names (for example "Fig 3. System architecture."). Read through each page and correct anything that doesn't describe the image well. One needs real text: the caption for `nri_misc_cargo.png` on the homepage just says "NRI."

## Email

The **Get in touch** and **Request Research Dossier** links are email links. Clicking one opens the visitor's own email program with your address filled in. No email server or setup is needed.

If you'd like an address at your own domain (like `hello@yourname.com`), that comes from an email provider such as Fastmail, Google Workspace or Zoho, not from GitHub.

## Optional: your own domain

To use an address like `yourname.com` instead of `yourusername.github.io`:
1. Buy the domain from a registrar (Namecheap, Porkbun, Cloudflare, etc.).
2. In the repository: **Settings → Pages → Custom domain**. Enter it and save.
3. At your registrar, add the DNS records GitHub lists in its guide: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. Once it works, tick **Enforce HTTPS** on the same settings page.
