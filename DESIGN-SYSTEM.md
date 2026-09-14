# KAMENOTES

Public presentation remains plain HTML, CSS and JavaScript. Run `node perfect_finish.js` to regenerate the pages using the existing `build-site.js`. The admin rebuild hooks continue to use that same generator.

## Foundations

- Lora 500 for H1, H2 and the brand; Inter for interface and body copy.
- White #FFFFFF, surface #F5F5F2, text #14181D, secondary text #667085.
- #7360F2 is reserved for Viber actions.
- Container: 1400px maximum; horizontal gutters 48 / 32 / 20px.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Section spacing: 112 / 80 / 56px.
- H1: 60px base, page-specific editorial sizes; H2: 44 / 36 / 30px.
- Buttons: 48px minimum height, 2px radius. Icon controls: 44px minimum.
- Images: 2px radius, reserved aspect ratios, no frames or shadows.
- Hover: 200–250ms; catalog images scale to 1.02, arrows move 3px.
- Reduced motion stops decorative disc rotation and transitions.

## Composition

The header is sticky at 92px on desktop, with a stable two-row mobile layout. The home page uses a typographic introduction and a wide production photograph, followed by production, selected models, materials, a photo essay, reviews, Viber and contacts.

Catalog models use three desktop columns, two tablet columns and one mobile column. Specifications remain available in the detail dialog. Production uses wide and portrait images with intervening text, rather than repeated framed cards.

Home reviews are two editorial Lora quotes paired with work photographs. City and year come from existing review records; missing cities are not invented. All 19 published reviews remain on the asymmetric archive page.

Contacts use a prominent address and primary telephone, a role-based directory, and a large map. The mobile layout places the map after the contact details. The shared footer has three columns: brand, navigation and contacts. Photo-only dialogs omit the product panel.

Responsive QA covers 1440, 1024, 768, 375 and 320px. `contacts.html` and `catalog/index.html` retain their established redirects to `kontakty.html` and `catalog.html`.

`site/css/design-system.css` is shared by every generated public page and is not overwritten by generation. Product and review data are unchanged by this visual pass.
