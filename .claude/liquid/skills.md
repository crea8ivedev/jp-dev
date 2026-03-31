# Shopify Liquid Skill Pack (Dawn Theme)

Context:

- Platform: Shopify
- Theme Base: Dawn
- Development: Shopify CLI
- Goal: Build scalable, performant, and error-free sections/snippets

---

## GLOBAL RULES (APPLY TO EVERY TASK)

- Follow Dawn theme structure strictly
- Use semantic HTML
- Avoid inline JS unless necessary
- Scope CSS using section ID
- Ensure no Liquid syntax errors
- Use `render` instead of `include`
- Ensure cart drawer compatibility
- Optimize for performance (lazy load, defer JS)
- Follow mobile-first responsive design

---

## STANDARD PADDING SYSTEM (MANDATORY)

Every section MUST include:

Settings:

- padding_top (desktop)
- padding_bottom (desktop)
- padding_top_mobile
- padding_bottom_mobile

CSS:

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

## SKILL 1: SECTION GENERATOR

Goal:
Create a fully functional Shopify section.

Requirements:

- Include schema
- Include padding system
- Use blocks for repeatable content
- Add responsive layout
- No hardcoded content

Output:

- Complete `.liquid` section file

---

## SKILL 2: BLOCK-BASED CONTENT

Use blocks when:

- Repeating items (cards, timeline, features)

Block schema example:

{
"type": "item",
"name": "Item",
"settings": [
{ "type": "text", "id": "title", "label": "Title" },
{ "type": "textarea", "id": "description", "label": "Description" }
]
}

Render:

{% for block in section.blocks %}

  <div {{ block.shopify_attributes }}>
    <h3>{{ block.settings.title }}</h3>
    <p>{{ block.settings.description }}</p>
  </div>
{% endfor %}

---

## SKILL 3: IMAGE OPTIMIZATION

Rules:

- Use `image_url` filter
- Use responsive sizes
- Always add alt text

Example:

<img
src="{{ image | image_url: width: 800 }}"
alt="{{ image.alt | escape }}"
loading="lazy"

>

---

## SKILL 4: CART DRAWER COMPATIBILITY

For Add to Cart buttons:

<form method="post" action="/cart/add">
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
  <button type="submit">Add to cart</button>
</form>

OR (preferred for Dawn):

Use existing snippet:

{% render 'buy-buttons', product: product %}

---

## SKILL 5: CONDITIONAL RENDERING

{% if product.available %}
<span>In Stock</span>
{% else %}
<span>Out of Stock</span>
{% endif %}

---

## SKILL 6: DYNAMIC CLASSES

<div class="{% if section.settings.full_width %}full-width{% endif %}">
</div>

---

## SKILL 7: SETTINGS SCHEMA TEMPLATE

{
"name": "Section Name",
"settings": [
{
"type": "range",
"id": "padding_top",
"min": 0,
"max": 100,
"step": 4,
"unit": "px",
"label": "Padding Top",
"default": 40
}
],
"blocks": [],
"presets": [
{
"name": "Section Name"
}
]
}

---

## SKILL 8: RESPONSIVE GRID

Use CSS grid:

.grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;
}

@media screen and (max-width: 989px) {
.grid {
grid-template-columns: 1fr;
}
}

---

## SKILL 9: PERFORMANCE OPTIMIZATION

- Lazy load images
- Avoid large DOM loops
- Minimize JS
- Avoid duplicate CSS
- Use `defer` for scripts

---

## SKILL 10: REUSABLE SNIPPETS

Use:

{% render 'card-product', product: product %}

NOT:

{% include 'card-product' %}

---

## SKILL 11: COLLECTION LOOP

{% for product in collection.products %}
{% render 'card-product', product: product %}
{% endfor %}

---

## SKILL 12: SAFE OUTPUT

Always escape user input:

{{ text | escape }}

---

## SKILL 13: JAVASCRIPT HANDLING

- Use `data-*` attributes
- Avoid inline scripts
- Attach events via JS file

---

## SKILL 14: ACCESSIBILITY

- Add alt text
- Use semantic tags
- Ensure button labels are clear

---

## SKILL 15: DEBUGGING

- Check Liquid errors
- Validate schema JSON
- Ensure all settings exist

---

## SKILL 16: METAFIELDS (CORE DATA LAYER)

Definition:
Metafields store custom data for products, collections, pages, etc.

Format:
{{ resource.metafields.namespace.key }}

Example (Product):

{{ product.metafields.custom.subtitle }}

---

### SAFE OUTPUT (IMPORTANT)

Always check existence:

{% if product.metafields.custom.subtitle != blank %}

  <p>{{ product.metafields.custom.subtitle }}</p>
{% endif %}

---

### TYPES HANDLING

Text:
{{ product.metafields.custom.text_field }}

Rich text:
{{ product.metafields.custom.richtext | metafield_tag }}

Image:
<img
src="{{ product.metafields.custom.image | image_url: width: 800 }}"
alt=""

>

URL:
<a href="{{ product.metafields.custom.link }}">Link</a>

Number:
{{ product.metafields.custom.rating }}

Boolean:
{% if product.metafields.custom.featured %}
<span>Featured</span>
{% endif %}

---

### LIST METAFIELDS

{% assign items = product.metafields.custom.features.value %}

{% for item in items %}

  <li>{{ item }}</li>
{% endfor %}

---

## SKILL 17: METAOBJECTS (STRUCTURED CONTENT)

Definition:
Metaobjects = reusable structured entries (like CMS)

Access:

{% assign obj = shop.metaobjects.testimonial['john-doe'] %}

---

### BASIC OUTPUT

{% if obj %}

  <h3>{{ obj.name }}</h3>
  <p>{{ obj.review }}</p>
{% endif %}

---

### REFERENCE METAFIELD → METAOBJECT

Product metafield referencing metaobject:

{% assign testimonial = product.metafields.custom.testimonial.value %}

<h3>{{ testimonial.name }}</h3>
<p>{{ testimonial.review }}</p>

---

### LIST OF METAOBJECTS

{% assign testimonials = product.metafields.custom.testimonials.value %}

{% for item in testimonials %}

  <div>
    <h4>{{ item.name }}</h4>
    <p>{{ item.review }}</p>
  </div>
{% endfor %}

---

### IMAGE IN METAOBJECT

<img
src="{{ item.image | image_url: width: 600 }}"
alt="{{ item.name }}"

>

---

## SKILL 18: DYNAMIC SOURCE (THEME EDITOR)

Use dynamic source instead of hardcoding:

{{ section.settings.title }}

Then connect:
Theme Editor → Dynamic Source → Metafield

---

## SKILL 19: FALLBACK STRATEGY

{% assign subtitle = product.metafields.custom.subtitle | default: product.title %}

<p>{{ subtitle }}</p>

---

## SKILL 20: PERFORMANCE RULES

- Avoid deep nested metaobject loops
- Do not fetch unnecessary references
- Use `.value` only when needed
- Cache using assign before loops

BAD:

{% for item in product.metafields.custom.items.value %}
{{ item.name }}
{% endfor %}

GOOD:

{% assign items = product.metafields.custom.items.value %}
{% for item in items %}
{{ item.name }}
{% endfor %}

---

## SKILL 21: COMMON ERRORS (AVOID)

❌ Missing `.value` on reference fields  
❌ Not checking `blank`  
❌ Treating list as single object  
❌ Using metafield without namespace

---

## SKILL 22: REAL USE CASE PATTERNS

### Product Highlights

{% assign highlights = product.metafields.custom.highlights.value %}

<ul>
  {% for item in highlights %}
    <li>{{ item }}</li>
  {% endfor %}
</ul>

---

### FAQ (Metaobject)

{% assign faqs = product.metafields.custom.faq.value %}

{% for faq in faqs %}

  <div>
    <h4>{{ faq.question }}</h4>
    <p>{{ faq.answer }}</p>
  </div>
{% endfor %}

---

### Testimonials (Metaobject)

{% assign testimonials = shop.metaobjects.testimonial.values %}

{% for t in testimonials %}

  <blockquote>
    {{ t.review }}
    <cite>{{ t.name }}</cite>
  </blockquote>
{% endfor %}

---

## HOW TO USE THIS FILE

When prompting Claude:

"Use Shopify Liquid Skill Pack.
Apply:

- Section Generator
- Padding System
- Block-based structure

Build: [your requirement]"

---

END SECTION
