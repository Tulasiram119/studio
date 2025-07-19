# Changelog

## [Unreleased]

### Added
- Created a new main page component in [`src/app/page.tsx`](src/app/page.tsx) with:
  - Dark mode toggle using `isDarkMode` state.
  - Theme switching logic for background and text colors.
  - Integration of a custom `Header` component that receives dark mode state and setter.
  - Integration of a custom `HabitLogForm` component for logging habits.
  - `handleHabitSubmit` function to handle habit form submissions (currently logs to console).

### Changed
- Applied Inter font family for a modern look, following style guidelines from [docs/blueprint.md](docs/blueprint.md).
- Used Tailwind CSS utility classes for responsive and clean layout.
- Ensured the main page supports both light and dark themes with smooth transitions.

### Notes
- The app structure and style choices align with the PWA blueprint and design guidelines.
- No breaking changes; all additions are new features for the main