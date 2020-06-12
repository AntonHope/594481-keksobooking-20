'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var similarPinsList = document.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = ['palace', 'flat', 'house', 'bungalo'];
function getRandomElements(arr) {
  var index = Math.floor(Math.random() * arr.length);
  var targetArr = [];
  for (var i = index; i < arr.length; i++) {
    targetArr.push(arr[i]);
  }
  return targetArr;
}

function getRandomElement(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function getRandomNamber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomTime(first, second, third) {
  var index = Math.floor(Math.random() * 5);
  if (index < 1) {
    return first;
  } else if (2 <index < 4){
    return second;
  } else {
    return third;
  }
}

function getRandomOriginNumber(min, max) {
  var totalNumbers = max - min + 1;
  var arrTotalNumbers = [];
  var arrRandomNumbers = [];
  var tempRandomNumber;

  while (totalNumbers--) {
    arrTotalNumbers.push(totalNumbers + min);
  }
  while (arrTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrTotalNumbers.length - 1));
    arrRandomNumbers.push(arrTotalNumbers[tempRandomNumber]);
    arrTotalNumbers.splice(tempRandomNumber, 1);
  }
  return arrRandomNumbers;
}


function renderArrSimilar(quantity) {
  var similarAds = [];
  var value = getRandomOriginNumber(1, 8);
  for (var i = 0; i < quantity; i++) {

    var objAds =
    {
      'author': {
          'avatar': 'img/avatars/user' + '0' + value[i] + '.png'
      },
      'offer': {
          'title': 'заголовок предложения',
          'address': getRandomNamber(100, 1000) + ', ' + getRandomNamber(100, 1000),
          'price': getRandomNamber(500, 5000),
          'type': getRandomElement(types),
          'rooms': getRandomNamber(1, 5),
          'guests': getRandomNamber(1, 10),
          'checkin': getRandomTime('13:00', '14:00', '12:00'),
          'checkout': getRandomTime('13:00', '14:00', '12:00'),
          'features': getRandomElements(features),
          'description': 'строка с описанием',
          'photos': getRandomElements(photos)
      },
      'location': {
          'x': getRandomNamber(50, 1150),
          'y': getRandomNamber(130, 630)
      }
    };
    similarAds.push(objAds);
  }
  return similarAds;
}

function renderAds() {
var adsElements = [];
var similarAds = renderArrSimilar(8);
  for (var i = 0; i < similarAds.length; i++) {
    var pinsElement = similarPinsTemplate.cloneNode(true);
    var locationPinsElement = pinsElement.querySelector('.map__pin');
    var imgPinsElement = pinsElement.querySelector('img');
    locationPinsElement.style.left = similarAds[i].location.x + 'px';
    locationPinsElement.style.top = similarAds[i].location.y +'px';
    imgPinsElement.src = similarAds[i].author.avatar;
    imgPinsElement.alt = similarAds[i].offer.title;
    adsElements.push(pinsElement);
  }
  return adsElements;
}

function renderSimilarAds() {
  var fragment = document.createDocumentFragment();
  var adsElements = renderAds();
  for (var i = 0; i < adsElements.length; i++) {
    fragment.append(adsElements[i]);
  }
  return similarPinsList.append(fragment);
}

renderSimilarAds();
