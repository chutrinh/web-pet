"use strict";
let getBreed = [];
let getPet = [];
let breedArr = "breedArr";
let petArr = "petArr";
// save data to local
function saveToStorageBreed(key, arrData) {
  localStorage.setItem(key, JSON.stringify(arrData));
}
// get data from local
function getFromStorageBreed(key) {
  getBreed = JSON.parse(localStorage.getItem(key));
}
// breed arr---------
if (localStorage.getItem(breedArr) === null) {
  saveToStorageBreed(breedArr, []);
} else {
  getFromStorageBreed(breedArr);
}
// pet arrr-----
function saveToStoragePet(key, arrData) {
  localStorage.setItem(key, JSON.stringify(arrData));
}
// get data from local
function getFromStoragePet(key) {
  getPet = JSON.parse(localStorage.getItem(key));
}
if (localStorage.getItem(petArr) === null) {
  saveToStoragePet(petArr, []);
} else {
  getFromStoragePet(petArr);
}
