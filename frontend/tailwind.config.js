/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#816aff",
        // primary: "#27C690",
        primary: "var(--primary-color)",
        heading: "var(--heading-color)",
        btn_primary_bg: "var(--btn-primary-bg)",
        btn_secondary_bg: "var(--btn-secondary-bg)",
        team_card_bg: "var(--team-card-bg)",
        link_color: "var(--link-color)",
        link_active: "var(--link-active)",
        card_bg: "var(--card-bg)",
        counter_color: "var(--counter-color)",
        body_bg: "var(--body-bg)",
        newsletter_bg: "var(--newsletter-bg)",
        testimonial_bg: "var(--testimonial-bg)",
        font_name: "var(--font-name)",
        small_text_color: "var(--small-text-color)",
        icon_bg: "var(--icon-bg)",
        secondary: "#9CB2AA",
        tertiary: "#B2D8CB",
        bgprimary: "#FAFCFF",
        bgsecondary: "#E3FAFB",
      },
      fontFamily: {
        roboto: ["Roboto", "ui-sans-serif"],
        poppins: ["Poppins", "ui-sans-serif"],
        lato: ["Lato", "SFMono-ui-monospace"],
      },
    },
  },
  plugins: [],
};
