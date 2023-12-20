"use strict";
// selector element
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
// thay đổi giá trị option breed khi thay đổi giá trị tupe input
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
    option.value = el.name;
    breedInput.appendChild(option);
  });
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
                  <button onclick="edit(this)" type="button" class="btn btn-danger" style="background-color: yellow; color: black">Edit</button>
                </td>`;
    tbody.appendChild(row);
  }
}
getFromStoragePet(petArr);
renderData(getPet);

// edit pet
const containerForm = document.querySelector("#container-form");
let indexEdit;
function edit(tag) {
  containerForm.classList.remove("hide");
  let id = tag.parentElement.parentElement.firstElementChild.textContent;
  getFromStoragePet(petArr);
  getPet.forEach(function (el, i) {
    if (el.id === id) {
      indexEdit = i;
      idInput.value = el.id;
      nameInput.value = el.name;
      ageInput.value = el.age;
      typeInput.value = el.type;
      weightInput.value = el.weight;
      lengthInput.value = el.length;
      colorInput.value = el.color;
      changeBreed();
      breedInput.value = el.breed;
      el.vaccinated === "bi-check-circle-fill"
        ? (vaccinatedInput.checked = true)
        : (vaccinatedInput.checked = false);

      el.dewormed === "bi-check-circle-fill"
        ? (dewormedInput.checked = true)
        : (dewormedInput.checked = false);

      el.sterilized === "bi-check-circle-fill"
        ? (sterilizedInput.checked = true)
        : (sterilizedInput.checked = false);
    }
  });
}
// click để lưu thông tin pet sau khi thay đổi
submitbtn.addEventListener("click", function () {
  if (validate()) {
    getFromStoragePet(petArr);
    getPet.forEach(function (el, i) {
      if (i === indexEdit) {
        el.name = nameInput.value;
        el.age = ageInput.value;
        el.type = typeInput.value;
        el.weight = weightInput.value;
        el.length = lengthInput.value;
        el.color = colorInput.value;
        el.breed = breedInput.value;
        vaccinatedInput.checked
          ? (el.vaccinated = "bi-check-circle-fill")
          : (el.vaccinated = "bi-x-circle-fill");
        dewormedInput.checked
          ? (el.dewormed = "bi-check-circle-fill")
          : (el.dewormed = "bi-x-circle-fill");
        sterilizedInput.checked
          ? (el.sterilized = "bi-check-circle-fill")
          : (el.sterilized = "bi-x-circle-fill");
        saveToStoragePet(petArr, getPet);
        getFromStoragePet(petArr);
        console.log(getPet);
        renderData(getPet);
        // reset các trường nhập dữ liệu
        idInput.value = "";
        nameInput.value = "";
        ageInput.value = "";
        typeInput.value = "Select Type";
        weightInput.value = "";
        lengthInput.value = "";
        colorInput.value = "black";
        breedInput.value = "Select breed";
        changeBreed();
        vaccinatedInput.checked = false;
        dewormedInput.checked = false;
        sterilizedInput.checked = false;
        containerForm.classList.add("hide");
        return;
      }
    });
  }
});

// xác nhận dữ liệu có đầy đủ hay chưa?
function validate() {
  let checkName = true;
  let checkAge = true;
  let checkType = true;
  let checkWeight = true;
  let checkLength = true;
  let checkColor = true;
  let checkBreed = true;

  if (nameInput.value === "") {
    alert("Please enter name input");
    checkName = false;
  }
  if (ageInput.value === "") {
    alert("Please enter age input");
    checkAge = false;
  } else {
    if (Number(ageInput.value) < 1 || Number(ageInput.value > 15)) {
      alert("Age must be between 1 and 15!");
      checkAge = false;
    }
  }
  if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    checkType = false;
  }
  if (weightInput.value === "") {
    alert("Please enter weight input");
    checkWeight = false;
  } else {
    if (Number(weightInput.value) < 1 || Number(weightInput.value > 15)) {
      alert("Weight must be between 1 and 15!");
      checkAge = false;
    }
  }
  if (lengthInput.value === "") {
    alert("Please enter length input");
    checkLength = false;
  } else {
    if (Number(lengthInput.value) < 1 || Number(lengthInput.value > 100)) {
      alert("Length must be between 1 and 100!");
      checkAge = false;
    }
  }
  if (colorInput.value === "#000000") {
    let confirmColor = confirm(
      "The current Color is Black. Do You want to choose this one?"
    );
    if (!confirmColor) {
      alert("Please choose Color of Pet");
      checkColor = false;
    }
  }
  if (breedInput.value === "Select Breed" || breedInput.value === "") {
    alert("Please select Breed");
    checkBreed = false;
  }
  if (
    checkName === true &&
    checkAge === true &&
    checkType === true &&
    checkWeight === true &&
    checkLength === true &&
    checkColor === true &&
    checkBreed === true
  ) {
    return true;
  }
  return false;
}
