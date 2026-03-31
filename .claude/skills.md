# Master Skill Controller (Shopify - Dawn)

Context:

- Platform: Shopify
- Theme: Dawn
- Project: Custom store from scratch

---

## GLOBAL INSTRUCTIONS

Always follow:

- Use Dawn-compatible architecture
- Do not break existing theme JS (cart, variants)
- Use modular approach (sections, snippets, components)
- Optimize for performance and Core Web Vitals
- Follow mobile-first responsive design

---

## LOAD SKILLS

### Liquid

Use all skills from:

- /liquid/shopify-liquid-skills.md

Focus on:

- Section architecture
- Schema
- Metafields & Metaobjects
- Snippet reuse

---

### JavaScript

Use all skills from:

- /javascript/shopify-javascript-skills.md

Focus on:

- Event delegation
- Shopify section reload support
- Cart drawer compatibility

---

## EXECUTION RULE

When generating code:

1. Identify if task is Liquid / JS / both
2. Apply relevant skill set
3. Ensure no conflicts with Dawn
4. Return production-ready code only

---

## STRICT RULES

- No jQuery
- No deprecated Liquid (`include`)
- No inline JS unless unavoidable
- Always check for null/blank data
- Always support Shopify editor (dynamic sections)

---

## OUTPUT FORMAT

- Clean, structured, and complete code
- No partial snippets unless explicitly requested
- No explanations unless asked
