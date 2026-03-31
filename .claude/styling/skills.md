# Shopify CSS + Tailwind Skill Pack (Dawn Theme)

Context:

- Platform: Shopify
- Theme: Dawn
- Styling Approach: Native CSS (primary) + Tailwind (optional utility layer)
- Goal: Clean, scalable, performant styling

---

## GLOBAL RULES (MANDATORY)

- Prefer native CSS (Dawn-compatible)
- Scope all styles using section ID
- Avoid global CSS overrides unless necessary
- Follow mobile-first approach
- Keep CSS minimal and reusable
- Avoid !important unless unavoidable
- Maintain consistency with Dawn variables

---

## IMPORTANT LIMITATION (TAILWIND)

Tailwind is NOT natively supported in Shopify themes unless:

1. You use a build tool (CLI, Webpack, Vite)
2. You precompile Tailwind into CSS

So:

❌ You cannot directly write Tailwind classes in Liquid without setup  
✅ You CAN:

- Use Tailwind via compiled CSS file
- OR follow Tailwind-like utility patterns manually

---

## SKILL 1: SECTION SCOPED CSS (MANDATORY)

<style>
  .section-{{ section.id }} {
    padding-top: {{ section.settings.padding_top }}px;
    padding-bottom: {{ section.settings.padding_bottom }}px;
  }

  @media screen and (max-width: 989px) {
    .section-{{ section.id }} {
      padding-top: {{ section.settings.padding_top_mobile }}px;
      padding-bottom: {{ section.settings.padding_bottom_mobile }}px;
    }
  }
</style>

---

## SKILL 2: COMPONENT-BASED CSS

Use structured classes:

.section-{{ section.id }} .card {
border-radius: 12px;
overflow: hidden;
}

.section-{{ section.id }} .card\_\_title {
font-size: 18px;
font-weight: 600;
}

---

## SKILL 3: RESPONSIVE DESIGN

Mobile-first:

.grid {
display: grid;
grid-template-columns: 1fr;
gap: 16px;
}

@media screen and (min-width: 750px) {
.grid {
grid-template-columns: repeat(2, 1fr);
}
}

@media screen and (min-width: 990px) {
.grid {
grid-template-columns: repeat(3, 1fr);
}
}

---

## SKILL 4: UTILITY CLASS PATTERN (TAILWIND-LIKE)

If not using Tailwind build:

.u-flex { display: flex; }
.u-center { align-items: center; justify-content: center; }
.u-gap { gap: 16px; }
.u-hidden { display: none; }

---

## SKILL 5: USING DAWN VARIABLES

Use CSS variables:

color: rgb(var(--color-foreground));
background: rgb(var(--color-background));

---

## SKILL 6: BUTTON STYLING (DAWN SAFE)

.button-custom {
background: rgb(var(--color-button));
color: rgb(var(--color-button-text));
padding: 12px 20px;
border-radius: 6px;
}

---

## SKILL 7: IMAGE HANDLING

.image-wrapper {
position: relative;
overflow: hidden;
}

.image-wrapper img {
width: 100%;
height: auto;
display: block;
}

---

## SKILL 8: HOVER EFFECTS

.card:hover {
transform: translateY(-4px);
transition: 0.3s ease;
}

---

## SKILL 9: ANIMATIONS (LIGHTWEIGHT)

.fade-in {
opacity: 0;
transform: translateY(20px);
transition: all 0.4s ease;
}

.fade-in.visible {
opacity: 1;
transform: translateY(0);
}

---

## SKILL 10: GRID VS FLEX

Use:

- Grid → layout structure
- Flex → alignment

---

## SKILL 11: TAILWIND (WITH BUILD SETUP)

If Tailwind is properly installed:

Example usage:

<div class="flex items-center justify-between gap-4 md:grid md:grid-cols-3">
</div>

---

## SKILL 12: TAILWIND BUILD PROCESS (REQUIRED)

You must:

1. Install Tailwind via CLI
2. Configure `tailwind.config.js`
3. Build CSS file:

npx tailwindcss -i ./src/input.css -o ./assets/tailwind.css --watch

4. Include in theme:

{{ 'tailwind.css' | asset_url | stylesheet_tag }}

---

## SKILL 13: AVOID CONFLICTS WITH DAWN

- Do not override `.button` globally
- Do not reset base styles
- Avoid changing `.grid` globally
- Scope everything

---

## SKILL 14: PERFORMANCE

- Minimize CSS size
- Avoid unused Tailwind utilities (use purge)
- Avoid deep nesting
- Reduce reflows

---

## SKILL 15: SECTION ISOLATION

Always wrap:

<div class="section-{{ section.id }}">
  <!-- content -->
</div>

---

## SKILL 16: DARK MODE SUPPORT (OPTIONAL)

@media (prefers-color-scheme: dark) {
.section-{{ section.id }} {
background: #000;
color: #fff;
}
}

---

## SKILL 17: COMMON MISTAKES

❌ Global CSS overrides  
❌ Not scoping with section.id  
❌ Using Tailwind without build  
❌ Inline styles everywhere  
❌ Breaking Dawn variables

---

## SKILL 18: BEST PRACTICE COMBO

- Use CSS for structure
- Use utility classes for spacing/alignment
- Use Tailwind only if build system exists

---

## HOW TO USE

Prompt Claude:

"Use Shopify CSS + Tailwind Skill Pack.
Apply:

- Section scoped CSS
- Responsive grid
- Dawn-safe styling

Build: [UI component]"

---

END OF FILE
