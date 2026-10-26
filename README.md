# Lorence Berganting — Portfolio

A responsive, static portfolio for a Network and System Administrator, ready to deploy to Vercel.

## Theme

The portfolio opens in its black-and-red dark theme, with an interactive network background fixed across the page that respects reduced-motion preferences. Visitors can use the **Light** button in the header to switch to the light red-accented theme; their choice is saved in the browser.

## Certificates

The **Certificates & training** section lists the credentials and courses in the résumé. To show certificate scans, add the image or PDF files to the project and link them from the corresponding cards in `index.html`. Only publish certificate files after checking that they do not expose personal information you want to keep private.

## Keep it up to date

1. Review the experience dates, project descriptions, skills, and contact details in `index.html` before publishing.
2. Add links or screenshots for completed project case studies when available.
3. Keep `Lorence_Berganting_Resume_SysAdmin.pdf` up to date; visitors can download it from the hero section.
4. Keep `kingt.png` in the project folder; it is used as the hero artwork.
5. Adjust colors and layout in `styles.css` if you want to customize the visual style.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Leave the framework preset as **Other**. No build command or output directory is needed for this static site.
4. Select **Deploy**. Vercel will serve `index.html` and `styles.css` directly.

You can also deploy the folder using the Vercel CLI with `vercel` from this directory.
