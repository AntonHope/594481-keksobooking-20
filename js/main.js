'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var similarPinsList = document.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var photoUrl = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var checkTime = ['12:00', '13:00', '14:00'];
var title = ['заголовок первый', 'заголовок второй', 'заголовок третий'];
var descriptionAds = ['строка с описанием один', 'строка с описанием два', 'строка с описанием три'];

var MIN_PRICE = 500;
var MAX_PRICE = 5000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function mockAds(i) {
  var ads =
  {
    'author': {
      'avatar': photoUrl[i]
    },
    'offer': {
      'title': getRandomElement(title),
      'address': getRandomNumber(ADRESS_MIN, ADRESS_MAX) + ', ' + getRandomNumber(ADRESS_MIN, ADRESS_MAX),
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': getRandomElement(types),
      'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      'CHECK': getRandomElement(checkTime),
      'checkout': getRandomElement(checkTime),
      'features': getRandomElements(features),
      'description': getRandomElement(descriptionAds),
      'photos': getRandomElements(photos)
    },
    'location': {
      'x': getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
      'y': getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };

  return ads;
}

function createSimilarAds(amount) {
  var similarAdsNew = [];

  for (var i = 0; i < amount; i++) {
    var newAds = mockAds(i);
    similarAdsNew.push(newAds);
  }

  return similarAdsNew;
}

var similarAds = createSimilarAds(8);

function createElement(element) {
  var pinsElement = similarPinsTemplate.cloneNode(true);
  var locationPinsElement = pinsElement.querySelector('.map__pin');
  var imgPinsElement = pinsElement.querySelector('img');

  locationPinsElement.style.left = element.location.x + 'px';
  locationPinsElement.style.top = element.location.y + 'px';
  imgPinsElement.src = element.author.avatar;
  imgPinsElement.alt = element.offer.title;

  return pinsElement;
}

function createAds() {
  var adsElements = [];

  for (var i = 0; i < similarAds.length; i++) {
    adsElements.push(createElement(similarAds[i]));
  }

  return adsElements;
}

var adsElementsList = createAds();

function renderSimilarAds() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsElementsList.length; i++) {
    fragment.append(adsElementsList[i]);
  }

  return similarPinsList.append(fragment);
}

renderSimilarAds();
