import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, 
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];
export function getDeliveryOption(deliveryOptionId){
  
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }

  });
  return deliveryOption;
}

// 15l
export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  //15m
  //checking if delivery date is a saturday or sunday
  if(deliveryDate.format('dddd') === 'Saturday'){
    deliveryDate = deliveryDate.add(2, 'days');
   //console.log(deliveryDate);
    
  }
  else if(deliveryDate.format('dddd') === 'Sunday'){
    deliveryDate =deliveryDate.add(1, 'days');
    //console.log(deliveryDate);
  }
 
  let dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}