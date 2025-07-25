const variantLogic = [
  { title: "$1.27", min: 0, max: 70 },
  { title: "$1.67", min: 70, max: 100 },
  { title: "$2.97", min: 100, max: 150 },
  { title: "$3.97", min: 150, max: 200 },
  { title: "$5.47", min: 200, max: 250 },
  { title: "$6.97", min: 250, max: 300 },
  { title: "$8.47", min: 300, max: 350 },
  { title: "$9.97", min: 350, max: 400 },
  { title: "$11.47", min: 400, max: 450 },
  { title: "$12.97", min: 450, max: 500 },
  { title: "$14.47", min: 500, max: 550 },
  { title: "$15.97", min: 550, max: 600 },
  { title: "$17.47", min: 600, max: 650 },
  { title: "$18.97", min: 650, max: 700 },
  { title: "$20.47", min: 700, max: 750 },
  { title: "$21.97", min: 750, max: 800 },
  { title: "$23.47", min: 800, max: 850 },
  { title: "$24.97", min: 850, max: 900 },
  { title: "$26.47", min: 900, max: 950 },
  { title: "$27.97", min: 950, max: 1000 },
  { title: "$29.47", min: 1000, max: 1050 },
  { title: "$30.97", min: 1050, max: 1100 },
  { title: "$32.47", min: 1100, max: 1150 },
  { title: "$33.97", min: 1150, max: 1200 },
  { title: "$35.47", min: 1200, max: 1250 },
  { title: "$36.97", min: 1250, max: 1300 },
  { title: "$38.47", min: 1300, max: 1350 },
  { title: "$39.97", min: 1350, max: 1400 },
  { title: "$41.47", min: 1400, max: 1450 },
  { title: "$42.97", min: 1450, max: 1500 },
  { title: "$44.47", min: 1500, max: 1550 },
  { title: "$45.97", min: 1550, max: 1600 },
  { title: "$47.47", min: 1600, max: 1650 },
  { title: "$48.97", min: 1650, max: 1700 },
  { title: "$50.47", min: 1700, max: 1750 },
  { title: "$51.97", min: 1750, max: 1800 },
  { title: "$53.47", min: 1800, max: 1850 },
  { title: "$54.97", min: 1850, max: 1900 },
  { title: "$56.47", min: 1900, max: 1950 },
  { title: "$57.97", min: 1950, max: 2000000 },
];

// State variables (populated on demand)
let productData; // â€œSwipeâ€ product JSON
let postProtectedProduct = null; // existing protection line item, if any

// Helper to replace "{{amount}}" in the shopâ€™s money format
const moneyFormat = (amount) => {
  return window.postMoneyFomat.replace("{{amount}}", amount);
};

// Build fetch params for JSON calls
const prepParams = (method, body) => {
  let obj = { method, headers: { "Content-Type": "application/json" } };
  if (body) obj.body = JSON.stringify(body);
  return obj;
};

// Parse textâ†’JSON if there is a response body
const prepResponse = async (response) => {
  const text = await response.text();
  if (!text) return { response: false };
  return { response: true, data: JSON.parse(text) };
};

// Fetch the current cart JSON from Shopify
async function getCartItem() {
  const response = await fetch("/cart.js", prepParams("GET"));
  return response.json();
}

// Fetch the â€œSwipeâ€ product JSON (requires /products/swipe.js to exist)
async function getSwipeProductData() {
  if (productData) return productData; // cache if already fetched
  const response = await fetch("/products/swipe.js", prepParams("GET"));
  const result = await prepResponse(response);
  if (result.response) {
    productData = result.data;
    return productData;
  } else {
    throw new Error("Could not fetch Swipe product data.");
  }
}

// 1. Compute cart subtotal (excluding any existing Swipe protection).
// 2. Determine correct tier from variantLogic.
// 3. Return { tier, existingLineItem }.
async function computeProtectionTier() {
  const cart = await getCartItem();
  const items = cart.items || [];

  // Exclude any Swipe / â€œSwipe Package Protectionâ€ items from subtotal
  let subtotal = 0;
  postProtectedProduct = null;
  items.forEach((item) => {
    const title = item.product_title || "";
    if (title === "Swipe" || title === "Swipe Package Protection") {
      postProtectedProduct = item;
    } else {
      subtotal += (item.final_line_price || 0) / 100;
    }
  });

  // Find the tier {title, min, max} where min â‰¤ subtotal < max
  let tier = null;
  for (const t of variantLogic) {
    if (t.min <= subtotal && subtotal < t.max) {
      tier = t;
      break;
    }
  }

  return { tier, postProtectedProduct };
}

//  Add or update the Swipe protection variant to match the computed tier.
//  1) Fetch Swipe product data, 2) compute tier & existing line item,
//  3) find matching variant by title, 4) build updates, 5) POST to /cart/update.js.
async function applyProtectionVariant() {
  try {
    const { tier, postProtectedProduct: existing } =
      await computeProtectionTier();
    if (!tier) {
      console.warn("No protection tier matches the cart subtotal.");
      return;
    }

    // Already have a protection item at correct tier? Just update displayed price (if needed)
    if (existing && existing.variant_title === tier.title) {
      return; // nothing to do
    }

    // Fetch productData (Swipe) so we can find the variant whose title === tier.title
    const swipe = await getSwipeProductData();
    const matching = swipe.variants.filter((v) => v.title === tier.title);
    if (!matching.length) {
      console.warn(`Could not find Swipe variant titled "${tier.title}".`);
      return;
    }
    const chosenVariant = matching[0];

    // Build updates: set chosenVariant.id=1; if existing, existing.id=0
    const updates = { [chosenVariant.id]: 1 };
    if (existing && existing.id) {
      updates[existing.id] = 0;
    }

    await fetch("/cart/update.js", prepParams("POST", { updates }));
  } catch (err) {
    console.error("applyProtectionVariant error:", err);
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 2) Render Cart Block + â€œLearn Moreâ€ Popup
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

async function renderCartBlock() {
  // 1) show the hidden wrapper if present
  const cartBlock = document.querySelector(".post-protect_cart");
  if (cartBlock) cartBlock.style.display = "block";

  // 4) now do the fetch for dynamic branding, but donâ€™t bail out if no shopId
  try {
    const shopId = document.querySelector(".post-protect_cart")?.dataset.shop;
    if (!shopId) {
      console.warn(
        "No data-shop on .post-protect_cart â€” skipping dynamic fetch"
      );
    } else {
      const response = await fetch(
        `https://app.swipe.ai/merchant/widget/${shopId}`,
        prepParams("GET")
      );
      const result = await prepResponse(response);
      if (result.response && result.data.data.cart_page?.is_active) {
        const cp = result.data.data.cart_page;
        // â€¦ your existing DOM-population code here â€¦
      } else {
        // if inactive, hide the block
        cartBlock && (cartBlock.style.display = "none");
      }
    }
  } catch (err) {
    console.error("renderCartBlock fetch error:", err);
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 3) Auto-Inject â€œCheckout + Protectionâ€ Buttons (Cart & Product Pages),
//    Always compute & apply correct tier on click. Show 1.5s â€œProcessingâ€¦â€ then /checkout.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Inject CSS for button styling and loading state:
const styleTag = document.createElement("style");
styleTag.textContent = `
/* Cart & Product page checkout button tweaks */

 
   .open-popup {
    display: flex;
     justify-content:flex-start; 
  align-items:flex-start; 
    border-radius: 13px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.swipe-container h1,h2,h3,h4,h5,,h6 , .swipe-container * {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif !important;


}

.swipe-info-box {
    order: 1;
    text-align: left;
  padding:8px 0px;
}
  .swipe-info-box span {
    font-size: 14px;
}
.swipe-container{
    width: 480px;
    height: auto;   
  border-radius:13px;
  background:#FFF;
  box-sizing:border-box;
  border-radius:13px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif !important;

  background:#FFF;
  padding:18px;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  gap:20px;
  position:relative;
}
.swipe-header-logo{
  display:flex;           
  justify-content:space-between;
   width:100%;  
}
.swipe-header-logo svg{
width:67px;
height:20px;
}
.swipe-heading{
width:100%
}
.swipe-header-logo svg{width:67px;height:20px;}
.close img{width:14px;height:14px;cursor:pointer;}
.swipe-heading h1{
  margin:0;
  color:#000;
  font-size:36px;
  font-weight:500;
  line-height:34px;
  letter-spacing:-1.08px;
      text-align: start;
}
.swipe-para {
    text-align: left;
    width: 80%;
    font-size: 11px !important;
    font-weight: normal !important;
}
.swipe-heading span{
  background:linear-gradient(91deg,#EDB6AA -22.38%,#9B8EC4 45.43%);
  background-clip:text;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  font-size:36px;
  font-weight:500;
  line-height:34px;
  letter-spacing:-1.08px;
}
.swipe-para{
  margin:8px 0 0;
  color:#9A9A9A;
  font-size:11px;

  line-height:14px;
}
.swipe-popup__feature-content{
    text-align: start;

}
  .swipe-checkout-hide{
display:none;
  visibility:hidden;
  opacity:0;

  }
.swipe-listing-heading {
    margin: 0;
    color: #6f6f6f;
    font-size: 18px;
    font-weight: 500;
    line-height: 17.43px;
    letter-spacing: -0.212px;
    text-transform: capitalize;
    text-align: start;
    padding-left: 0px;
}

.swipe-popup__features{
list-style:none;
padding:0;
margin:0;
display:
flex;
flex-direction:column;
gap:16px;}
.swipe-popup__feature{
display:flex;
gap:10px;
padding-left: 0px;
align-items:flex-start;
}
.swipe-popup__feature-icon img {
    width: 50px;
    height: 50px;

}
.swipe-popup__feature-title{
    color: #6a6a6a;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 28px;
    text-transform: capitalize;
    letter-spacing: -0.34px;
  margin:0px;
}
.swipe-popup__feature-description{
color: #6f6f6f;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.4px;
  margin:0px;
}
.swipe-custom-box {
    display: flex !important;
    flex-direction: column-reverse;
    position: relative;
    gap: 0px !important;
    margin-top: 0px !important;
    width: 100% !important;
    max-width: 100%;
      margin-bottom: 0px !important;
}
  button.swipe-btn-protection {
    background: #000;
    color: #fff;
    line-height: 32px;
    font-size: 16px;
    border-radius: 0px !important;
  position:relative;
  width:100%;
}
.swipe-popup-privacy-content {
    text-align: center;
    color: #919191;
    font-size: 12px;
    font-weight: 300;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    line-height: 14px;
    padding: 0px !important;
}
.swipe-popup-privacy-content a{
  color:#B1A4D7;
  font-weight:700;
  text-decoration:underline;
}
.swipe-link-no-protection {
    position: relative;
    text-align: center;
    font-size: 14px;
    padding: 12px 0px 0px;
  position: static;
    font-size: 12px !important;
    width: 100%;
  text-transform: lowercase !important;
}
  /** swipe-pop-redeign */
.pp_footer_cart .full-carbon-text_cart {
  letter-spacing: .0;
}
body:has(.open-popup) {
  overflow: hidden;
}
.close * {
  pointer-events: none;
}
.tabing ul li a * {
  pointer-events: none;
}

.swipe-popup {
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 99;
  height: 100vh;
  overflow: auto;
  margin: 0px;
  padding: 15px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.swipe-popup {
  opacity: 0;
  visibility: hidden;
  display:none;
}
.swipe-popup.open-popup {
  opacity: 1;
  visibility: visible;
  display: flex;
}

.close {
  position: absolute;
  right: 15px;
  top: 13px;
  width: 14px;
  display: block;
  cursor: pointer;
}
.close span {
  cursor: pointer;
  position: fixed;
  width: 20px;
  height: 3px;
  background: #099ccc;
}
.close span:nth-child(1) {
  transform: rotate(45deg);
}
.close span:nth-child(2) {
  transform: rotate(135deg);
}

.popup__content_inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 5px;
}

@media only screen and (max-width: 749px) {
  .post-protect_cart{
    width: 100%;
    max-width: 358px;
    margin: 0 auto;
  }
}


/* new shema css */
.pp-price{
  display:none;
}
.pp-checkbox:has(#post_protection_checkbox[checked]) + .pp-price.show_price{
  display: inline-block !important;
}
@media screen and (min-width: 750px) {
  .cart__ctas {
    display: flex;
    gap: 1rem;
    flex-direction: column-reverse;
  }
}
.cart__checkout-button {
  position: relative;
}
.cart__checkout-button svg {
  width: 20px !important;
  height: 20px !important;
  background: #eeeeee;
  position: absolute;
  left: 24px;
  top: 15px;
  border-radius: 25px;
}
.post-protect_cart {
  display: none !important;
}

.swipe-info-box {
    width: 100%;
}
.swipe-custom-box {
    display: flex !important;
    flex-direction: column-reverse;
    position: relative;
    gap: 0px !important;
    margin-top: 0px !important;
}
.pw-learn-more svg {
    width: 16px;
    height: 16px;
   position: relative;
    top: 3px;
}

svg .st0 {
    fill: #fff;
}
.pp_logo p {
  padding: 0px !important;
  margin: 0px !important;
}
.pp_subtitle-text p {
  font-size: 10px;
  padding: 0px !important;
  margin: 0px 0px 10px;
}
/* Processing state: dims & disables clicks */
.loading-overlay {
  opacity: 0.6;
  pointer-events: none;
}
`;
document.head.appendChild(styleTag);

// Show â€œProcessingâ€¦â€ on a button/link and disable further clicks:
function showLoadingOnElement(el) {
  el.classList.add("loading-overlay");
  if (el.tagName.toLowerCase() === "input") {
    el.value = "Processing..";
  } else {
    el.innerHTML = "Processing";
  }
}

// Find/update all checkout-trigger elements, add our custom handlers:

// Helper to remove any existing Swipe protection before plain checkout:
async function removeExistingProtectionIfAny() {
  const cart = await getCartItem();
  const items = cart.items || [];
  const existing = items.find(
    (itm) =>
      itm.product_title === "Swipe" ||
      itm.product_title === "Swipe Package Protection"
  );
  if (existing && existing.id) {
    await fetch(
      "/cart/update.js",
      prepParams("POST", { updates: { [existing.id]: 0 } })
    );
  }
}

// 3.9) Observe DOM for dynamically added checkout buttons (drawers/popups)
function watchForCheckoutButtons() {
  const observer = new MutationObserver(() => {
    replaceNativeWithCustom();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 4) Initialization: Render Cart Block + Protection Logic, then
//    set up all Checkout buttons & clones (with â€œProcessingâ€¦â€ states).
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const popupHTML = `<!-- begin Swipe popup -->
<section class="swipe-popup">
<div class="swipe-container">
  <div class="swipe-header-logo">
   <svg xmlns="http://www.w3.org/2000/svg" width="67" height="20" viewBox="0 0 67 20" fill="none">
  <g clip-path="url(#clip0_914_104)">
    <path d="M19.4084 13.4214C19.5385 13.304 19.6544 13.1712 19.7557 13.0241C19.8565 12.8769 19.9077 12.708 19.9077 12.5163C19.9077 12.2809 19.8241 12.0823 19.6581 11.9203C19.4915 11.7583 19.2889 11.6223 19.0502 11.5118C18.8116 11.4013 18.5619 11.3169 18.3013 11.2579C18.0408 11.1995 17.824 11.1474 17.6501 11.1033C17.1728 10.9859 16.7243 10.842 16.3044 10.6731C15.8845 10.5041 15.5195 10.2981 15.2083 10.0548C14.897 9.81202 14.6511 9.52518 14.4704 9.19373C14.2892 8.8628 14.1994 8.4692 14.1994 8.01291C14.1994 7.58638 14.2996 7.18533 14.5002 6.80979C14.7007 6.43478 14.9691 6.10332 15.3054 5.81648C15.6417 5.52965 16.037 5.30124 16.4914 5.13232C16.9452 4.96341 17.4256 4.87842 17.9321 4.87842C18.3802 4.87842 18.8074 4.94588 19.2126 5.0792C19.6173 5.21359 19.9829 5.39579 20.3087 5.62685C20.6341 5.85738 20.9088 6.13625 21.1333 6.46346C21.3573 6.79067 21.5057 7.1524 21.5782 7.54972L19.6899 8.01344C19.6032 7.66021 19.4147 7.36594 19.1259 7.13062C18.8361 6.89531 18.4387 6.77739 17.9321 6.77739C17.7588 6.77739 17.5776 6.80342 17.3896 6.85441C17.2016 6.90593 17.0277 6.98295 16.8689 7.08547C16.7096 7.18799 16.576 7.31282 16.4673 7.45995C16.3587 7.60709 16.3044 7.77548 16.3044 7.96617C16.3044 8.17174 16.366 8.34756 16.4887 8.49469C16.6115 8.64183 16.7598 8.76294 16.9337 8.85802C17.107 8.95363 17.295 9.03065 17.4977 9.08962C17.7003 9.14805 17.8883 9.19957 18.0622 9.24366C18.8288 9.43488 19.4654 9.64045 19.9719 9.86036C20.4779 10.0803 20.8832 10.3225 21.1871 10.587C21.491 10.851 21.7041 11.141 21.8273 11.4571C21.9501 11.7731 22.0117 12.129 22.0117 12.5253C22.0117 12.9949 21.9067 13.4357 21.6978 13.8469C21.4884 14.258 21.2002 14.6139 20.832 14.9145C20.4644 15.2157 20.0241 15.4505 19.5118 15.6194C18.9995 15.7883 18.4476 15.8728 17.8559 15.8728C16.9613 15.8728 16.1639 15.6481 15.4642 15.1998C14.7644 14.7509 14.2918 14.1512 14.0469 13.4007L15.8266 12.5837C16.0579 13.099 16.3545 13.4485 16.7164 13.6323C17.0778 13.8166 17.4904 13.908 17.9536 13.908C18.5322 13.908 19.0168 13.7459 19.4074 13.4225L19.4084 13.4214Z" fill="#949494"/>
    <path d="M26.4834 15.6289L22.9893 5.05518H25.2249L27.6552 13.0463L30.2162 5.05518H32.0826L34.6435 12.9799L37.0525 5.05518H39.2881L35.7939 15.6289H33.4936L31.3233 9.16067L31.1499 8.14505L30.9765 9.16067L28.8281 15.6289H26.4844H26.4834Z" fill="#949494"/>
    <path d="M41.8702 2.75948C41.4936 2.75948 41.1756 2.6235 40.915 2.351C40.6544 2.07904 40.5244 1.7513 40.5244 1.36885C40.5244 0.986402 40.6544 0.662382 40.915 0.397323C41.1756 0.132264 41.4936 0 41.8702 0C42.2467 0 42.5647 0.132264 42.8248 0.397323C43.0853 0.662382 43.2154 0.985871 43.2154 1.36885C43.2154 1.75183 43.0853 2.07904 42.8248 2.351C42.5642 2.6235 42.2462 2.75948 41.8702 2.75948ZM42.9553 15.6289H40.8283V5.05524H42.9334L42.9553 15.6289Z" fill="#949494"/>
    <path d="M45.2979 20V5.05525H46.9517L47.3815 6.15904C47.8019 5.7325 48.2844 5.40105 48.8285 5.16573C49.3727 4.93042 49.9852 4.8125 50.6673 4.8125C51.3926 4.8125 52.0637 4.95592 52.6804 5.24276C53.2971 5.52959 53.8298 5.92373 54.2794 6.42357C54.729 6.92394 55.0805 7.51302 55.3348 8.18974C55.5886 8.867 55.7155 9.58781 55.7155 10.3532C55.7155 11.1187 55.5886 11.84 55.3348 12.5167C55.081 13.194 54.729 13.7825 54.2794 14.2829C53.8298 14.7833 53.2966 15.1769 52.6804 15.4637C52.0637 15.7506 51.3931 15.894 50.6673 15.894C49.9414 15.894 49.3325 15.7723 48.7962 15.5296C48.2593 15.2868 47.7883 14.9373 47.382 14.481V20H45.2989H45.2979ZM50.4954 6.75503C50.0745 6.75503 49.675 6.82514 49.298 6.96484C48.9204 7.10507 48.5899 7.32551 48.3068 7.62722C48.0238 7.92893 47.8024 8.30448 47.6426 8.7528C47.4828 9.20164 47.4029 9.73495 47.4029 10.3532C47.4029 11.0156 47.4828 11.5781 47.6426 12.0419C47.8024 12.5056 48.0238 12.8806 48.3068 13.1674C48.5899 13.4543 48.9204 13.6641 49.298 13.7969C49.6756 13.9291 50.0745 13.9955 50.4954 13.9955C50.9163 13.9955 51.3158 13.8999 51.6934 13.7087C52.071 13.5175 52.3973 13.2561 52.6736 12.9252C52.9498 12.5943 53.1671 12.2076 53.3269 11.7662C53.4867 11.3248 53.5666 10.8541 53.5666 10.3532C53.5666 9.85234 53.4867 9.38171 53.3269 8.9403C53.1671 8.49889 52.9493 8.11644 52.6736 7.79242C52.3973 7.46893 52.071 7.21503 51.6934 7.03071C51.3158 6.84692 50.9169 6.75503 50.4954 6.75503Z" fill="#949494"/>
    <path d="M62.4649 15.894C61.7124 15.894 61.0074 15.7506 60.3489 15.4637C59.6903 15.1769 59.1154 14.7833 58.6235 14.2829C58.1315 13.7831 57.7446 13.194 57.4621 12.5167C57.1801 11.84 57.0391 11.1187 57.0391 10.3532C57.0391 9.58781 57.1728 8.867 57.4406 8.18974C57.708 7.51302 58.0699 6.92447 58.5258 6.42357C58.9817 5.9232 59.5133 5.52959 60.1212 5.24276C60.729 4.95592 61.3797 4.8125 62.0742 4.8125C62.7688 4.8125 63.4377 4.93786 64.0383 5.18804C64.6383 5.43823 65.1595 5.82812 65.6007 6.35823C66.042 6.88782 66.3856 7.56136 66.6316 8.37831C66.8776 9.19527 67.0008 10.17 67.0008 11.303H59.2747C59.3754 11.686 59.5352 12.0424 59.752 12.3739C59.9692 12.7048 60.2256 12.9921 60.5222 13.2349C60.8188 13.4776 61.1515 13.6652 61.5202 13.7979C61.8894 13.9302 62.2758 13.9966 62.6816 13.9966C63.231 13.9966 63.7411 13.8941 64.2117 13.6875C64.6817 13.4814 65.0832 13.2094 65.4159 12.8705L66.7183 14.1953C66.2117 14.7105 65.5929 15.1222 64.8629 15.4313C64.1323 15.7405 63.3328 15.895 62.4649 15.895V15.894ZM62.0742 6.75503C61.7411 6.75503 61.4267 6.82142 61.1301 6.95369C60.8335 7.08595 60.5583 7.27027 60.3055 7.50558C60.0522 7.74143 59.835 8.02083 59.6543 8.34432C59.4731 8.66834 59.3394 9.02157 59.2527 9.40402H64.7433C64.714 9.05079 64.6347 8.71243 64.5046 8.38841C64.3746 8.06492 64.1934 7.78127 63.9621 7.53852C63.7302 7.29577 63.4592 7.10454 63.1479 6.96431C62.8367 6.82461 62.4784 6.7545 62.0737 6.7545L62.0742 6.75503Z" fill="#949494"/>
    <path d="M9.09227 11.6514C9.18 12.3063 8.97947 12.8689 8.45464 13.2901C7.02378 14.439 5.58769 15.5811 4.15108 16.722C3.41894 17.3032 2.34736 17.1741 1.78128 16.4442C1.18648 15.6777 1.29353 14.6122 2.04134 14.0077C3.08054 13.1679 4.12863 12.3387 5.17514 11.508C5.82739 10.9895 5.92034 10.1806 5.39917 9.53199C5.36366 9.4879 5.12501 9.27384 5.10099 9.22072C5.16261 9.21912 5.45505 9.35245 5.50936 9.3721C6.35639 9.68444 7.20655 9.9888 8.04575 10.3224C8.62698 10.5534 8.96798 11.0092 9.09174 11.6519L9.09227 11.6514Z" fill="#949494"/>
    <path d="M0.0199006 8.34823C-0.0678313 7.69328 0.132699 7.13076 0.657523 6.70953C2.08839 5.56059 3.52448 4.41855 4.96109 3.27758C5.69323 2.69647 6.76481 2.82554 7.33089 3.55539C7.92569 4.32188 7.81864 5.38743 7.07083 5.99191C6.03162 6.83171 4.98354 7.66088 3.93702 8.49164C3.28478 9.01008 3.19183 9.81906 3.713 10.4676C3.74851 10.5117 3.98716 10.7258 4.01118 10.7789C3.94956 10.7805 3.65712 10.6472 3.60281 10.6275C2.75578 10.3152 1.90561 10.0108 1.06642 9.67724C0.485193 9.44618 0.144187 8.99042 0.0204228 8.34769L0.0199006 8.34823Z" fill="#949494"/>
  </g>
  <defs>
    <clipPath id="clip0_914_104">
      <rect width="67" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
<div class="close">
  <img src="https://swipe.ai/wp-content/uploads/2025/06/close-swipe-icon.png" alt="remove" width="14" height="14" />
    
</div>

  </div>
  <div class="swipe-heading">
    <h1>Checkout with<br><span>Peace of Mind</span></h1>
    <h2 class="swipe-para">Your package is protected withÂ <b>Swipe</b>Â from the moment it ships.</h2>
  </div>
  <h1 class="swipe-listing-heading">What You Get with Swipe Protection:</h1>
  <ul class="swipe-popup__features">
    <li class="swipe-popup__feature">
      <div class="swipe-popup__feature-icon">
        <img src="https://swipe.ai/wp-content/uploads/2025/06/swipe-icon-three.png" alt="">
      </div>
      <div class="swipe-popup__feature-content">
        <h2 class="swipe-popup__feature-title">Shipping & Order Protection</h2>
        <p class="swipe-popup__feature-description">
          If your order is lost, stolen, or damaged in transitâ€”Swipe has you covered.
        </p>
      </div>
    </li>
    <li class="swipe-popup__feature">
      <div class="swipe-popup__feature-icon">
       <img src="https://swipe.ai/wp-content/uploads/2025/06/swipe-icon-two.png" alt="">
      </div>
      <div class="swipe-popup__feature-content">
        <h2 class="swipe-popup__feature-title">Fast & Simple Claims</h2>
        <p class="swipe-popup__feature-description">
          No lengthy forms or waiting. File a claim in just a few clicks.
        </p>
      </div>
    </li>
    <li class="swipe-popup__feature">
      <div class="swipe-popup__feature-icon">
        <img src="https://swipe.ai/wp-content/uploads/2025/06/swipe-icon-one.png" alt="">
      </div>
      <div class="swipe-popup__feature-content">
        <h2 class="swipe-popup__feature-title">Direct Support</h2>
        <p class="swipe-popup__feature-description">
          Swipe manages your claim from start to finishâ€”no runaround.
        </p>
      </div>
    </li>
  </ul>
  <div class="swipe-popup-privacy-content">
  By adding Swipe Protection, you agree to our <a href="https://swipe.ai/privacy-policy">Terms and Privacy Policy</a>.Coverage is subject to Swipeâ€™s  <a href="https://swipe.ai/claims-policy">Claims Policy</a>.

  </div>
</div>
  </section>
 
<!-- end Swipe popup -->`;

function injectGlobalPopup() {
  if (document.querySelector(".swipe-popup")) return; // already injected
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // grab your popup
  const swipepopup = document.querySelector(".swipe-popup");
  const closer = swipepopup.querySelector(".close");

  // stop clicks inside popup from bubbling up (so outside-click closes it)
  swipepopup.addEventListener("click", (e) => e.stopPropagation());

  // close button
  closer.addEventListener("click", (e) => {
    e.stopPropagation();
    swipepopup.classList.remove("open-popup");
  });

  // clicking anywhere else closes it
  document.addEventListener("click", () =>
    swipepopup.classList.remove("open-popup")
  );

  // *** NEW: wire up your "Learn More" triggers ***
  document.querySelectorAll(".pw-learn-more").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      swipepopup.classList.add("open-popup");
    })
  );
}

/**
 * Hide every native checkout trigger and inject your custom two-control box.
 */
/**
 * Hides native checkout triggers and injects a custom two-control box.
 * Adds a â€œProcessingâ€¦â€ overlay when either control is clicked.
 */
async function replaceNativeWithCustom() {
  let formattedTotal = "";
  try {
    const cart = await getCartItem();
    formattedTotal = formatCentsToMoney(cart.items_subtotal_price);
  } catch (e) {
    console.error("Cart fetch failed", e);
  }

  const checkoutSelectors = [
    'a[href$="/checkout"]',
    'button[name="checkout"]',
    'input[name="checkout"]',
    ".cart__checkout",
    ".buy-now",
    ".buy-it-now",
  ];

  checkoutSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((origEl) => {
      if (origEl.dataset.swipeInjected) return;
      origEl.dataset.swipeInjected = "true";

      // hide the original
      origEl.classList.add("swipe-checkout-hide");

      // build custom box
      const box = document.createElement("div");
      box.className = "swipe-custom-box";
      box.style.cssText =
        "margin:1rem 0; display:flex; gap:1rem; align-items:center;";

      box.innerHTML = `
           <div class="swipe-info-box">
      <span class="pw-learn-more post_protect">
        Swipe Package Protection
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C7.07107 8.75 8.75 7.07107 8.75 5C8.75 2.92893 7.07107 1.25 5 1.25C2.92893 1.25 1.25 2.92893 1.25 5C1.25 7.07107 2.92893 8.75 5 8.75ZM5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z" fill="#999999"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.375 7.5V4.375H5.625V7.5H4.375Z" fill="#999999"/>
          <circle cx="5" cy="3.125" r="0.625" fill="#999999"/>
        </svg>
      </span>
    </div>
        <a href="#" class="swipe-link-no-protection" style="text-decoration:none; color:#000;">
          Checkout without package protection
        </a>
        <button class="swipe-btn-protection" style="padding:.5rem 1rem; border:none; border-radius:4px; cursor:pointer;">
          Checkout + ${formattedTotal}
        </button>
      `;

      origEl.insertAdjacentElement("afterend", box);

      const link = box.querySelector(".swipe-link-no-protection");
      const btn = box.querySelector(".swipe-btn-protection");

      // override link: plain checkout
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        showLoadingOnElement(link); // show â€œProcessingâ€¦â€
        try {
          await removeExistingProtectionIfAny();
        } catch (err) {
          console.error("Error removing protection:", err);
        }
        setTimeout(() => (window.top.location.href = "/checkout"), 300);
      });

      // override button: add protection then checkout
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        showLoadingOnElement(btn); // show â€œProcessingâ€¦â€
        try {
          await applyProtectionVariant();
        } catch (err) {
          console.error("Error applying protection:", err);
        }
        setTimeout(() => (window.top.location.href = "/checkout"), 300);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", replaceNativeWithCustom);

// Then observe for all future DOM changes
const pageObserver = new MutationObserver(() => replaceNativeWithCustom());
pageObserver.observe(document.body, { childList: true, subtree: true });
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Initialization: on load, and also whenever new checkout buttons appear
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.addEventListener("DOMContentLoaded", () => {
  // 1) your existing popup & button setup
  renderCartBlock().then(() => {
    // 2) replace natives immediately
    replaceNativeWithCustom();
    setTimeout(injectGlobalPopup, 500);
  });

  // 3) re-run both whenever new checkout triggers appear
  watchForCheckoutButtons(); // sets up cloned protection buttons
  // reuse that same DOM watcher to also replace natives:
  const observer = new MutationObserver(() => {
    replaceNativeWithCustom();
  });
});

// Utility to format cents â†’ money string
function formatCentsToMoney(cents) {
  const decimalStr = (cents / 100).toFixed(2);
  return moneyFormat(decimalStr);
}
