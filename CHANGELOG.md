# Changelog
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Semantic Versioning.

## [Unreleased]
### Added
- Add `README.md` with the project case study to provide product and technical context.

### Changed
- Document the profile model, theming decisions, and styling structure in the README.

### Fixed
- (none)

---

## [1.0.0] - 2026-02-11
### Added
- Added minimum styling and structure for the home page.
- Added a dedicated home page stylesheet at `src/styles/pages/_index.scss`.
- Added a semantic footer on the home page with author attribution and link.

### Changed
- Updated the Arodav profile theme across HTML, theme tokens, and profile styles.
- Improved profile badge styling and adjusted profile container spacing.
- Refined shared styles in base layout, links, profile components, and main SCSS composition.
- Updated Arodav profile content and assets (`src/profiles/arodav/arodav.json` and `public/arodav-profile.webp`).
- Updated profile page markup for Arodav and Marces to align with current theme and structure.

### Fixed
- (none)

---

## [0.3.0] - 2026-02-09
### Added
- Added footer styles for profile pages.

### Changed
- Improved the links grid component styles and layout.
- Updated the grid rendering logic in `src/main.ts` to populate links per profile.
- Refined base layout and theme tokens.
- Updated the Marces profile JSON data.
- Reorganized SCSS structure and component styling.

### Fixed
- (none)

---

## [0.2.0] - 2026-02-02
### Added
- Built the profile HTML structure for Arodav and Marces with a skip link, banner layout, and links grid placeholder.
- Added JSON profile data for Arodav and Marces, including link metadata and icons.
- Introduced the SCSS architecture with a main entry point plus tokens, base, and component layers.
- Added the public icon set and the Linkims SVG asset.

### Changed
- Updated the app favicon to use `linkims.svg`.
- Refined profile copy and applied profile-specific theme classes in the HTML.
- Removed the unused `src/styles/styles.scss` entry.

### Fixed
- (none)

---

## [0.1.0] - 2026-01-31
### Added
- Set up the folder structure.
- Prepared the project architecture to enable smooth progress.
- Published the repository.
- Added this changelog.
