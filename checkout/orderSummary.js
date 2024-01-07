import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../scripts/utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import{deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary} from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
/*
//External libraries practice code
hello();

// this gets the current time ie dayjs()
//console.log(dayjs());
const today = dayjs();
const deliveryDate = today.add(7,'days');
//console.log(deliveryDate);
console.log(deliveryDate.format('dddd, MMMM D'));
*/
calculateCartQuantity();

export function renderOrderSummary(){


  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
  //gtting the right delivery date
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);


//15l
     const dateString = calculateDeliveryDate(deliveryOption);
    //Not working
    console.log(dateString);
   /* //calculating date
    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    //15m
    //checking if delivery date is a saturday or sunday
    if(deliveryDate.format('dddd') === 'Saturday'){
      deliveryDate = deliveryDate.add(2, 'days');
      console.log(deliveryDate);
      
    }
    else if(deliveryDate.format('dddd') === 'Sunday'){
      deliveryDate =deliveryDate.add(1, 'days');
      console.log(deliveryDate);
    }
   
    const dateString = deliveryDate.format('dddd, MMMM D');

*/

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date:${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span class="js-quantity-amount">
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <!--14g-->
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save </span>
              
              
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });




  //function for generating deliver options
  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    //loop through delivery options and for each option generate some HTMl and combine all the HTML
    deliveryOptions.forEach((deliveryOption)=>{
      //calculating date
      /*const today = dayjs();
      let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
       //15k or 15m
    //checking if delivery date is a saturday or sunday
    if(deliveryDate.format('dddd') === 'Saturday'){
      deliveryDate = deliveryDate.add(2, 'days');
      console.log(deliveryDate);
      
    }
    else if(deliveryDate.format('dddd') === 'Sunday'){
      deliveryDate =deliveryDate.add(1, 'days');
      console.log(deliveryDate);
    }*/
//15l
      let dateString = calculateDeliveryDate(deliveryOption);
      //determing the price
      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      :`${formatCurrency(deliveryOption.priceCents)} -`;

      //checking which delivery option should be checked
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
          </div>
        </div>
        </div>`

    });

    return html;

  }

  //EXCERCISE 14b
  //update cartQuantity 
  /*function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }*/
  calculateCartQuantity();


  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;


  //14C put updatedCartQuantity() for when product in cart is deleted
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        calculateCartQuantity();

        renderPaymentSummary();
        //15h
        renderOrderSummary();
        //15k
        renderCheckoutHeader();
      });
    
    });

    //onclicklistener for the radio buttons for delivery date
    document.querySelectorAll('.js-delivery-option')
      .forEach((element)=>{
        element.addEventListener('click', () => {
          //updated delivery option
          const {productId, deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          //update teh ifnor
          renderOrderSummary();
          //update the order summary when delivery options are changed
          renderPaymentSummary();
        });
    });


    //14f
    document.querySelectorAll('.js-update-quantity-link')
    .forEach((link)=> {
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        //console.log(productId);
      

        //14h
      let containeer = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
      containeer.classList.add('is-editing-quantity');
      //14i
      document.querySelector('.js-quantity-input')
      .addEventListener('click', ()=>{
        if(containeer.classList.contains('is-editing-quantity')){
          document.querySelector('.js-update-quantity-link').classList.add('is-editing-quantity');
          document.querySelector(`.js-quantity-label-${productId}`).classList.add('is-editing-quantity');
        }
    
      });
      
      });

    });




    savebutton();
  
    //14j
    function savebutton(){
      document.querySelectorAll('.js-save-quantity-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
      // console.log(productId);
  
      const containeer = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
      containeer.classList.remove('is-editing-quantity');
        console.log('switch to updated')

      //14k
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
    
      const newQuantity = Number(quantityInput.value);
  //14n
      if(newQuantity > 0 && newQuantity <100){
          //14l
        updateQuantity(productId, newQuantity);
      //  console.log(updateQuantity(productId, newQuantity));
      reload();

      }
      else if(newQuantity <= 0 || newQuantity >99) {
      alert('Please enter a number between than 0 and 100');
      }


        //14l
    // updateQuantity(productId, newQuantity);
      //console.log(updateQuantity(productId, newQuantity));
    //14m
    
    // let updatedQuantity = document.querySelector(`.js-quantity-label-${productId}`);
      // updatedQuantity.innerHTML = newQuantity;
      //updateQuantity();
      
      });

      
    
    });
    //reload();

    }

    document.body.addEventListener('keydown', (event)=>{
      //13 is enter but use event.KeyCode instead
      if(event.key === 'Enter'){
        savebutton();
      }
      
    });

    function reload(){
      window.location.reload();
    }
}
