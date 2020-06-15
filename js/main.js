'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var similarPinsList = document.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var photoNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

var MIN_PRICE = 500;
var MAX_PRICE = 5000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var CHECK_12 = '12:00';
var CHECK_13 = '13:00';
var CHECK_14 = '14:00';
var LOCATION_X_MIN = 50;
var LOCATION_X_MAX = 1150;
var LOCATION_Y_MAX = 130;
var LOCATION_Y_MIN = 630;
var ADRESS_MIN = 100;
var ADRESS_MAX = 1000;

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
  } else if (index > 42 && index < 4) {
    return second;
  } else {
    return third;
  }
}

function renderArrSimilar(quantity) {
  var similarAds = [];

  for (var i = 0; i < quantity; i++) {

    var objAds =
  {
    'author': {
      'avatar': 'img/avatars/user' + '0' + photoNumbers[i] + '.png'
    },
    'offer': {
      'title': 'заголовок предложения',
      'address': getRandomNamber(ADRESS_MIN, ADRESS_MAX) + ', ' + getRandomNamber(ADRESS_MIN, ADRESS_MAX),
      'price': getRandomNamber(MIN_PRICE, MAX_PRICE),
      'type': getRandomElement(types),
      'rooms': getRandomNamber(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomNamber(MIN_GUESTS, MAX_GUESTS),
      'CHECK': getRandomTime(CHECK_13, CHECK_14, CHECK_12),
      'checkout': getRandomTime(CHECK_13, CHECK_14, CHECK_12),
      'features': getRandomElements(features),
      'description': 'строка с описанием',
      'photos': getRandomElements(photos)
    },
    'location': {
      'x': getRandomNamber(LOCATION_X_MIN, LOCATION_X_MAX),
      'y': getRandomNamber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
    similarAds.push(objAds);
  }

  return similarAds;
}

function createAds() {
  var adsElements = [];
  var similarAds = renderArrSimilar(8);

  for (var i = 0; i < similarAds.length; i++) {
    var pinsElement = similarPinsTemplate.cloneNode(true);
    var locationPinsElement = pinsElement.querySelector('.map__pin');
    var imgPinsElement = pinsElement.querySelector('img');

    locationPinsElement.style.left = similarAds[i].location.x + 'px';
    locationPinsElement.style.top = similarAds[i].location.y + 'px';
    imgPinsElement.src = similarAds[i].author.avatar;
    imgPinsElement.alt = similarAds[i].offer.title;
    adsElements.push(pinsElement);
  }

  return adsElements;
}

function renderSimilarAds() {
  var fragment = document.createDocumentFragment();
  var adsElements = createAds();

  for (var i = 0; i < adsElements.length; i++) {
    fragment.append(adsElements[i]);
  }

  return similarPinsList.append(fragment);
}

renderSimilarAds();
