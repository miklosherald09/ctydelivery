import {
  DELIVERY_STATUS_PENDING,
  DELIVERY_STATUS_RECEIVED,
  DELIVERY_STATUS_PACKAGING,
  DELIVERY_STATUS_READY,
  DELIVERY_STATUS_DELIVERED,
  DELIVERY_RECEIVED_NOTIF_MESSAGE,
  DELIVERY_PACKAGING_NOTIF_MESSAGE,
  DELIVERY_READY_NOTIF_MESSAGE,
  DELIVERY_DELIVERED_NOTIF_MESSAGE,
} from './constants'


export function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
    if(array[i][attr] === value) {
        return array[i]
    }
  }
  return false;
}

// USE TO PROPERLY PRESENT ITEMS IN ROW DIRECTION
export function formatData(data, numColumns){
  
  data = filterBox(data)

  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;

	}

  return data;
};

export function filterBox(data){
  data = data.filter((v, i, x) => {
    return v.empty != true
  })
  
  return data
}

export function formatDate(date, format=0) {

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var monthShortNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];
 
  date = parseInt(date)
  d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = '' + d.getFullYear(),
  hours = '' + d.getHours(),
  minutes = ''+ d.getMinutes()
  ampm = hours >= 12 ? 'pm' : 'am';

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  if(format){
    switch(format){
      case 1: {
        return monthShortNames[month-1]+' '+day+', '+year+' '+hours+':'+minutes;
      }
      case 2: {
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        strTime = hours + ':' + minutes + ' ' + ampm;
        return monthShortNames[month-1]+' '+day+', '+year+ ', ' + strTime;
      }
      case 3: {
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        strTime = hours + ':' + minutes + ' ' + ampm;
        return monthShortNames[month-1]+' '+day+', '+year;
      }
    }
  }

  return [year, month, day].join('-');
}

export function csvJSON(csv){

  //var csv is the CSV file with headers
  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

export const playBeepSound = () => {
  Sound.setCategory('Playback');
  soundEffect = new Sound('beep07.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error)
    return
  }
    soundEffect.play()
  })
  soundEffect.release()
}

export const transformDeliverStatus = (status) => {
  switch(status){
    case DELIVERY_STATUS_PENDING:
      return 'Pending'
    case DELIVERY_STATUS_RECEIVED:
      return 'Received'
    case DELIVERY_STATUS_PACKAGING:
      return 'Packaging'
    case DELIVERY_STATUS_READY:
      return 'Ready'
    case DELIVERY_STATUS_DELIVERED:
      return 'Delivered'
    default:
      return status
  }
}

export const transformDeliverTitleStyle = (status) => {
  switch(status){
    case DELIVERY_STATUS_PENDING:
      return {color: '#333'}
    case DELIVERY_STATUS_RECEIVED:
      return {color: '#00C700'}
    case DELIVERY_STATUS_PACKAGING:
      return {color: '#F78914'}
    case DELIVERY_STATUS_READY:
      return {color: '#1D62A2'}
    case DELIVERY_STATUS_DELIVERED:
      return {color: '#1E65A7'}
   
    default:
      return status
  }
}

export const transformDeliveryNotifText = (status) => {
  switch(status){
    case DELIVERY_STATUS_RECEIVED:
      return DELIVERY_RECEIVED_NOTIF_MESSAGE
    case DELIVERY_STATUS_PACKAGING:
      return DELIVERY_PACKAGING_NOTIF_MESSAGE
    case DELIVERY_STATUS_READY:
      return DELIVERY_READY_NOTIF_MESSAGE
    case DELIVERY_STATUS_DELIVERED:
      return DELIVERY_DELIVERED_NOTIF_MESSAGE
   
    default:
      return status
  }
}

export const computeCartTotal = (items) => {
  
  total = 0
  items.forEach((item) => {
    total += item.count * item.price
  })

  return total
}

export const genDeliveryDetails = (delivery) => {

  data = [
    'Cart Ref#: '+delivery.id,
    delivery.userInfo.displayName,
    delivery.userInfo.phoneNumber,
    delivery.userInfo.address,
    formatDate(delivery.datetime, 2),
    'Items count: '+delivery.items.length,
    'Total: '+computeCartTotal(delivery.items),
    'Remarks: '+((delivery.remarks)?delivery.remarks:'')
  ]

  return data.join('\n')
}