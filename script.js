"use strict";
// selectoring element
const submitbtn = document.querySelector("#submit-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.querySelector("#input-length");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
// thay đổi giá trị các option breed khi type input thay đổi
function changeBreed() {
  getFromStorageBreed(breedArr);
  breedInput
    .querySelectorAll("option:not(:first-child)")
    .forEach((el) => el.remove());
  let filterType = [];
  filterType = getBreed.filter(function (el) {
    if (el.type === typeInput.value) {
      return el;
    }
  });
  filterType.forEach(function (el) {
    const option = document.createElement("option");
    option.innerHTML = `${el.name}`;
    breedInput.appendChild(option);
  });
}

// tạo dữ biến object để lưu trữ dữ liệu tạm.
let data = {};
// xữ lý event submit
submitbtn.addEventListener("click", function () {
  const classkGood = "bi-check-circle-fill";
  const classBad = "bi-x-circle-fill";
  let tickvaccinated = "";
  let tickdewormed = "";
  let tickSterilized = "";
  if (vaccinatedInput.checked) {
    tickvaccinated = classkGood;
  } else {
    tickvaccinated = classBad;
  }
  if (dewormedInput.checked) {
    tickdewormed = classkGood;
  } else {
    tickdewormed = classBad;
  }
  if (sterilizedInput.checked) {
    tickSterilized = classkGood;
  } else {
    tickSterilized = classBad;
  }
  data = {
    id: idInput.value,
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: tickvaccinated,
    dewormed: tickdewormed,
    sterilized: tickSterilized,
    Date: (function date() {
      let date = new Date();
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    })(),
  };
  // check data empty
  packingData(validate(data));
  if (checkRunParking === true) {
    getPet.push(tempPack[tempPack.length - 1]);
    saveToStoragePet(petArr, getPet);
    getFromStoragePet(petArr);
    renderData(getPet);
    checkRunParking = false;
  }
});

// xữ lý sự kiện check health
const healthyEvent = document.querySelector("#healthy-btn");
healthyEvent.addEventListener("click", function () {
  let tg = healthyEvent.classList.toggle("toggle-show");
  if (tg) {
    healthyEvent.textContent = "Show All Pet";
    function filterPet(petGood) {
      const tempPet = [];
      for (let i = 0; i < petGood.length; i++) {
        if (
          petGood[i].vaccinated === "bi-check-circle-fill" &&
          petGood[i].dewormed === "bi-check-circle-fill" &&
          petGood[i].sterilized === "bi-check-circle-fill"
        ) {
          tempPet.push(petGood[i]);
        }
      }
      return tempPet;
    }
    getFromStoragePet(petArr);
    renderData(filterPet(getPet));
  } else {
    healthyEvent.textContent = "Show Healthy Pet";
    getFromStoragePet(petArr);
    renderData(getPet);
  }
});
// delet những  pet trong table
function delet(tag) {
  let id = tag.parentElement.parentElement.firstElementChild.textContent;
  getFromStoragePet(petArr);
  for (let i = getPet.length - 1; i >= 0; i--) {
    if (getPet[i].id === id) {
      let confirmRemove = confirm("Are you sure?");
      if (confirmRemove) {
        getPet.splice(i, 1);
        tag.parentElement.parentElement.remove();
        saveToStoragePet(petArr, getPet);
        getFromStoragePet(petArr);
        renderData(getPet);
        break;
      }
    }
  }
}
// reset các trường nhập dữ liệu
function reset() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "Select Breed";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
// xác nhận dữ liệu có đầy đủ các yêu cầu hay chưa?
const listItem = [];
function validate(infoInput) {
  let checkID = true;
  let checkName = true;
  let checkAge = true;
  let checkType = true;
  let checkWeight = true;
  let checkLength = true;
  let checkColor = true;
  let checkBreed = true;
  if (infoInput.id === "") {
    alert("Please enter ID input");
    checkID = false;
  } else {
    getFromStoragePet(petArr);
    let CheckArrID = [...listItem, ...getPet];
    for (let i = 0; i < CheckArrID.length; i++) {
      if (infoInput.id === CheckArrID[i].id) {
        alert("ID MUST UNIQUE !");
        checkID = false;
        break;
      }
    }
  }
  if (infoInput.name === "") {
    alert("Please enter name input");
    checkName = false;
  }
  if (infoInput.age === "") {
    alert("Please enter age input");
    checkAge = false;
  } else {
    if (Number(infoInput.age) < 1 || Number(infoInput.age > 15)) {
      alert("Age must be between 1 and 15!");
      checkAge = false;
    }
  }
  if (infoInput.type === "select") {
    alert("Please select Type!");
    checkType = false;
  }
  if (infoInput.weight === "") {
    alert("Please enter weight input");
    checkWeight = false;
  } else {
    if (Number(infoInput.weight) < 1 || Number(infoInput.weight > 15)) {
      alert("Weight must be between 1 and 15!");
      checkAge = false;
    }
  }
  if (infoInput.length === "") {
    alert("Please enter length input");
    checkLength = false;
  } else {
    if (Number(infoInput.length) < 1 || Number(infoInput.length > 100)) {
      alert("Length must be between 1 and 100!");
      checkAge = false;
    }
  }
  if (infoInput.color === "#000000") {
    let confirmColor = confirm(
      "The current Color is Black. Do You want to choose this one?"
    );
    if (!confirmColor) {
      alert("Please choose Color of Pet");
      checkColor = false;
    }
  }
  if (infoInput.breed === "Select Breed") {
    alert("Please select Breed");
    checkBreed = false;
  }
  if (
    checkID === true &&
    checkName === true &&
    checkAge === true &&
    checkType === true &&
    checkWeight === true &&
    checkLength === true &&
    checkColor === true &&
    checkBreed === true
  ) {
    return infoInput;
  }
  return false;
}
// sau khi xữ lý xong đóng gói dữ liệu, chuẩn bị mang đi render
let checkRunParking = false;
let checkEmpty = false;
let tempPack = [];
function packingData(task) {
  if (task === false) {
    alert("Please check again");
    checkEmpty = true;
  } else {
    listItem.push(task);
    checkEmpty = false;
    tempPack = listItem;
    checkRunParking = true;
  }
}
// render table data
function renderData(render) {
  const tbody = document.querySelector("#tbody");
  const clear = tbody.querySelectorAll("tr");
  for (let i = 0; i < clear.length; i++) {
    clear[i].remove();
  }
  for (let i = 0; i < render.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${render[i].id}</th>
                <td>${render[i].name}</td>
                <td>${render[i].age}</td>
                <td>${render[i].type}</td>
                <td>${render[i].weight} kg</td>
                <td>${render[i].length} cm</td>
                <td>${render[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color: ${render[i].color}"></i>
                </td>
                <td><i class="${render[i].vaccinated}"></i></td>
                <td><i class="${render[i].dewormed}"></i></td>
                <td><i class="${render[i].sterilized}"></i></td>
                <td>${render[i].Date}</td>
                <td>
                  <button onclick="delet(this)" type="button" class="btn btn-danger">Delete</button>
                </td>`;
    tbody.appendChild(row);
  }

  if (checkEmpty === false) {
    reset();
  }
}
renderData(getPet);
