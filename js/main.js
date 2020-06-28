'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var similarPinsList = document.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content;
var similarCardTemplate = document.querySelector('#card').content;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var checkTime = ['12:00', '13:00', '14:00'];
var titles = ['заголовок первый', 'заголовок второй', 'заголовок третий'];
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

function getRandomListValues(arr) {
  var index = Math.floor(Math.random() * arr.length);
  var targetArr = [];

  for (var i = index; i < arr.length; i++) {
    targetArr.push(arr[i]);
  }

  return targetArr;
}

function getRandomListValue(arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createAd(i) {
  return {
    'author': {
      'avatar': avatars[i]
    },
    'offer': {
      'title': getRandomListValue(titles),
      'address': getRandomNumber(ADRESS_MIN, ADRESS_MAX) + ', ' + getRandomNumber(ADRESS_MIN, ADRESS_MAX),
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': getRandomListValue(types),
      'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      'checkin': getRandomListValue(checkTime),
      'checkout': getRandomListValue(checkTime),
      'features': getRandomListValues(features),
      'description': getRandomListValue(descriptionAds),
      'photos': getRandomListValues(photos)
    },
    'location': {
      'x': getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
      'y': getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
}

function createSimilarAds(amount) {
  var similarAdsNew = [];

  for (var i = 0; i < amount; i++) {
    similarAdsNew.push(createAd(i));
  }

  return similarAdsNew;
}

var similarAds = createSimilarAds(8);

function createPinElement(element) {
  var pinsElement = similarPinsTemplate.cloneNode(true);
  var locationPinsElement = pinsElement.querySelector('.map__pin');
  var imgPinsElement = pinsElement.querySelector('img');

  locationPinsElement.style.left = element.location.x + 'px';
  locationPinsElement.style.top = element.location.y + 'px';
  imgPinsElement.src = element.author.avatar;
  imgPinsElement.alt = element.offer.title;

  return pinsElement;
}

function createAds(similarAdsList) {
  var adsElements = [];

  for (var i = 0; i < similarAdsList.length; i++) {
    adsElements.push(createPinElement(similarAdsList[i]));
  }

  return adsElements;
}

var adsElementsList = createAds(similarAds);

function renderSimilarAds(elementsList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elementsList.length; i++) {
    fragment.append(elementsList[i]);
  }

  return similarPinsList.append(fragment);
}

renderSimilarAds(adsElementsList);

function getTypeValue(cardType, element) {
  if (element.offer.type === 'flat') {
    cardType.textContent = 'Квартира';
  } else if (element.offer.type === 'bungalo') {
    cardType.textContent = 'Бунгало';
  } else if (element.offer.type === 'house') {
    cardType.textContent = 'Дом';
  } else if (element.offer.type === 'palace') {
    cardType.textContent = 'Дворец';
  }
}

function createFeaturesElement(featuresElement) {
  var newFeatureElement = document.createElement('li');
  newFeatureElement.classList.add('popup__feature');
  newFeatureElement.classList.add('popup__feature--' + featuresElement);
  newFeatureElement.textContent = featuresElement;

  return newFeatureElement;
}

function createPhotoRooms(photosList) {
  var newPhoto = document.createElement('img');
  newPhoto.classList.add('.popup__photo');
  newPhoto.src = photosList;
  newPhoto.width = 45;
  newPhoto.height = 40;
  newPhoto.alt = 'Фотография жилья';

  return newPhoto;
}

function createCardElement(element) {
  var cardElement = similarCardTemplate.cloneNode(true);

  var cardTitle = cardElement.querySelector('.popup__title');
  cardTitle.textContent = element.offer.title;

  var cardAdress = cardElement.querySelector('.popup__text--address');
  cardAdress.textContent = element.offer.address;

  var cardPrice = cardElement.querySelector('.popup__text--price');
  cardPrice.textContent = element.offer.price + '₽/ночь';

  var cardType = cardElement.querySelector('.popup__type');
  getTypeValue(cardType, element);

  var cardCapacity = cardElement.querySelector('.popup__text--capacity');
  cardCapacity.textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';

  var cardTime = cardElement.querySelector('.popup__text--time');
  cardTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

  var cardDescription = cardElement.querySelector('.popup__description');
  cardDescription.textContent = element.offer.description;

  var cardAvatar = cardElement.querySelector('.popup__avatar');
  cardAvatar.src = element.author.avatar;

  var cardPhotoList = cardElement.querySelector('.popup__photos');
  var cardPhotoElement = cardPhotoList.querySelector('.popup__photo');
  cardPhotoElement.remove();

  for (var i = 0; i < element.offer.photos.length; i++) {
    cardPhotoList.append(createPhotoRooms(element.offer.photos[i]));
  }

  var cardFeaturesList = cardElement.querySelector('.popup__features');
  var cardFeaturesElements = cardElement.querySelectorAll('.popup__feature');

  for (var k = 0; k < cardFeaturesElements.length; k++) {
    cardFeaturesElements[k].remove();
  }

  for (var j = 0; j < element.offer.features.length; j++) {
    cardFeaturesList.append(createFeaturesElement(element.offer.features[j]));
  }

  return cardElement;
}

var card = createCardElement(similarAds[0]);

function renderCards(cardElement) {
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  return map.append(cardElement, mapFiltersContainer);
}

renderCards(card);
