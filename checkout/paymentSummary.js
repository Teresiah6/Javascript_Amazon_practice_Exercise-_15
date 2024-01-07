import {calculateCartQuantity, cart} from '../data/cart.js';
import { getProduct} from '../data/products.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';
import { formatCurrency } from '../scripts/utils/money.js';

export function renderPaymentSummary(){
//save result of adding price together
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  //loop through teh cart
  cart.forEach((cartItem)=>{
    //use productid to get full product
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    //get price for the delivery option
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents

  });
  //console.log(productPriceCents);
  //console.log(shippingPriceCents);
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  //15i
  const quantityTotal = calculateCartQuantity()

  const paymentSummaryHTML = `

        <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${quantityTotal}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}