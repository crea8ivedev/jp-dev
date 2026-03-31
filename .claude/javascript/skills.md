# Shopify JavaScript Skill Pack (Dawn Theme)

Context:

- Platform: Shopify
- Theme: Dawn
- JS Philosophy: Minimal, modular, performance-first
- Pattern: ES6 + Custom Elements + Event Delegation

---

## GLOBAL RULES (MANDATORY)

- Do NOT use jQuery
- Use vanilla JavaScript (ES6+)
- Prefer event delegation over multiple listeners
- Avoid inline JS in Liquid
- Use `data-*` attributes for dynamic behavior
- Keep JS modular and reusable
- Ensure compatibility with Shopify sections (dynamic reload)
- Use `defer` when adding scripts
- Avoid global scope pollution

---

## FILE STRUCTURE (Dawn Standard)

Assets:

- /assets/global.js (main logic)
- /assets/component-\*.js (modular components)

Include in theme.liquid:

<script src="{{ 'global.js' | asset_url }}" defer></script>

---

## SKILL 1: SAFE EVENT LISTENER (SECTION LOAD SUPPORT)

Shopify reloads sections dynamically.

Use:

document.addEventListener('DOMContentLoaded', () => {
init();
});

document.addEventListener('shopify:section:load', () => {
init();
});

function init() {
// Initialize components
}

---

## SKILL 2: EVENT DELEGATION

document.addEventListener('click', (e) => {
const btn = e.target.closest('[data-action="toggle"]');
if (!btn) return;

const target = document.querySelector(btn.dataset.target);
target.classList.toggle('active');
});

---

## SKILL 3: CUSTOM ELEMENT (DAWN STYLE)

class ToggleComponent extends HTMLElement {
constructor() {
super();
}

connectedCallback() {
this.button = this.querySelector('[data-toggle]');
this.content = this.querySelector('[data-content]');

    this.button.addEventListener('click', () => {
      this.content.classList.toggle('active');
    });

}
}

customElements.define('toggle-component', ToggleComponent);

---

## SKILL 4: DATA ATTRIBUTE DRIVEN LOGIC

<button data-action="open-modal" data-target="#modal-1">Open</button>

JS:

document.addEventListener('click', (e) => {
const trigger = e.target.closest('[data-action="open-modal"]');
if (!trigger) return;

const modal = document.querySelector(trigger.dataset.target);
modal.classList.add('active');
});

---

## SKILL 5: CART DRAWER TRIGGER (DAWN COMPATIBLE)

Use Shopify’s built-in events.

document.addEventListener('click', (e) => {
const btn = e.target.closest('[data-add-to-cart]');
if (!btn) return;

fetch('/cart/add.js', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
id: btn.dataset.variantId,
quantity: 1
})
})
.then(res => res.json())
.then(() => {
document.dispatchEvent(new CustomEvent('cart:refresh'));
});
});

---

## SKILL 6: AJAX CART UPDATE

function updateCart() {
fetch('/cart.js')
.then(res => res.json())
.then(cart => {
document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
});
}

---

## SKILL 7: DEBOUNCE (PERFORMANCE)

function debounce(fn, delay = 300) {
let t;
return (...args) => {
clearTimeout(t);
t = setTimeout(() => fn.apply(this, args), delay);
};
}

---

## SKILL 8: INTERSECTION OBSERVER (LAZY LOAD)

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
observer.unobserve(entry.target);
}
});
});

document.querySelectorAll('.animate').forEach(el => {
observer.observe(el);
});

---

## SKILL 9: SLIDER (LIGHTWEIGHT)

class SimpleSlider {
constructor(el) {
this.el = el;
this.slides = el.querySelectorAll('[data-slide]');
this.current = 0;

    this.next();

}

next() {
setInterval(() => {
this.slides[this.current].classList.remove('active');
this.current = (this.current + 1) % this.slides.length;
this.slides[this.current].classList.add('active');
}, 3000);
}
}

document.querySelectorAll('[data-slider]').forEach(el => {
new SimpleSlider(el);
});

---

## SKILL 10: FORM HANDLING (AJAX)

document.addEventListener('submit', (e) => {
const form = e.target.closest('[data-ajax-form]');
if (!form) return;

e.preventDefault();

fetch(form.action, {
method: 'POST',
body: new FormData(form)
}).then(() => {
alert('Submitted');
});
});

---

## SKILL 11: VARIANT CHANGE HANDLING

document.addEventListener('change', (e) => {
const select = e.target.closest('[data-variant-select]');
if (!select) return;

const variantId = select.value;

document.dispatchEvent(new CustomEvent('variant:change', {
detail: { variantId }
}));
});

---

## SKILL 12: MODAL SYSTEM

document.addEventListener('click', (e) => {
const open = e.target.closest('[data-modal-open]');
const close = e.target.closest('[data-modal-close]');

if (open) {
document.querySelector(open.dataset.modalOpen).classList.add('active');
}

if (close) {
close.closest('.modal').classList.remove('active');
}
});

---

## SKILL 13: ACCORDION

document.addEventListener('click', (e) => {
const header = e.target.closest('[data-accordion]');
if (!header) return;

const item = header.parentElement;
item.classList.toggle('active');
});

---

## SKILL 14: CLEANUP (IMPORTANT)

Avoid duplicate bindings:

let initialized = false;

function init() {
if (initialized) return;
initialized = true;

// attach listeners
}

---

## SKILL 15: ERROR HANDLING

fetch('/cart.js')
.then(res => res.json())
.catch(err => {
console.error('Cart error:', err);
});

---

## HOW TO USE

Prompt Claude like:

"Use Shopify JavaScript Skill Pack.
Apply:

- Event delegation
- Cart drawer compatibility
- Section reload support

Build: [feature]"

---

END OF FILE
