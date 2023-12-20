"use strict";
// selector element
const findBtn = document.querySelector("#find-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
// thay đổi dữ liệu option khi type thay đổi loài Dog or cat
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
                <td>${render[i].breed} </td>
                <td>
                  <i class="bi bi-square-fill" style="color: ${render[i].color}"></i>
                </td>
                <td><i class="${render[i].vaccinated}"></i></td>
                <td><i class="${render[i].dewormed}"></i></td>
                <td><i class="${render[i].sterilized}"></i></td>
                <td>${render[i].Date}</td>`;
    tbody.appendChild(row);
  }
}
renderData(getPet);

// find pet theo các giá trị được nhập
findBtn.addEventListener("click", function () {
  if (
    idInput.value === "" &&
    nameInput.value === "" &&
    typeInput.value === "Select Type" &&
    breedInput.value === "Select Breed" &&
    vaccinatedInput.checked === false &&
    dewormedInput.checked === false &&
    sterilizedInput.checked === false
  ) {
    getFromStoragePet(petArr);
    renderData(getPet);
    alert("Please enter infomation Pet !");
  } else {
    getFromStoragePet(petArr);
    let tempArr = getPet.concat();
    if (idInput.value !== "") {
      tempArr = tempArr.filter(function (el) {
        if (el.id.includes(idInput.value)) {
          return el;
        }
      });
    }

    if (nameInput.value !== "") {
      tempArr = tempArr.filter(function (el) {
        if (el.name.includes(nameInput.value)) {
          return el;
        }
      });
    }

    if (typeInput.value !== "Select Type") {
      tempArr = tempArr.filter(function (el) {
        if (el.type.includes(typeInput.value)) {
          return el;
        }
      });
    }

    if (breedInput.value !== "Select Breed") {
      tempArr = tempArr.filter(function (el) {
        if (el.breed.includes(breedInput.value)) {
          return el;
        }
      });
    }

    if (vaccinatedInput.checked !== false) {
      tempArr = tempArr.filter(function (el) {
        if (el.vaccinated.includes("bi-check-circle-fill")) {
          return el;
        }
      });
    }

    if (dewormedInput.checked !== false) {
      tempArr = tempArr.filter(function (el) {
        if (el.dewormed.includes("bi-check-circle-fill")) {
          return el;
        }
      });
    }

    if (sterilizedInput.checked !== false) {
      tempArr = tempArr.filter(function (el) {
        if (el.sterilized.includes("bi-check-circle-fill")) {
          return el;
        }
      });
    }
    renderData(tempArr);
  }
});
