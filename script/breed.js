"use strict";
// selector element
const btnBreed = document.querySelector("#submit-btn");
const inputBreed = document.querySelector("#input-breed");
const inputTypeBreed = document.querySelector("#input-type");
// sự kiện khi click submit
btnBreed.addEventListener("click", function () {
  const data = {
    name: inputBreed.value,
    type: inputTypeBreed.value,
  };
  validate(data);
  //luu du lieu len local storage
  saveToStorageBreed(breedArr, getBreed);
  // lấy dữ liệu từ local store xuống
  getFromStorageBreed(breedArr);
  // render table data
  renderBreed(getBreed);
});
// xac nhan data
function validate(inputData) {
  let checkInputBreed = true;
  let checkType = true;
  if (inputData.name === "") {
    checkInputBreed = false;
    alert("Please enter input Breed !");
  } else {
    let checkDuplicate = true;
    getFromStorageBreed(breedArr);
    for (let i = 0; i < getBreed.length; i++) {
      if (getBreed[i].name === inputData.name) {
        checkDuplicate = false;
        alert("Loài này đã có trong danh sách! vui lòng hãy đặt tên khác.");
        break;
      }
    }
    if (checkDuplicate === true) {
      checkInputBreed = true;
    } else {
      checkInputBreed = false;
    }
  }

  if (inputData.type === "Select type") {
    checkType = false;
    alert("Please enter input Type !");
  } else {
    checkType = true;
  }
  if (checkInputBreed && checkType) {
    getBreed.push(inputData);
  }
}
// render table breed
function renderBreed(dataLocal) {
  const tbody = document.querySelector("#tbody");
  tbody.querySelectorAll("tr").forEach((el) => el.remove());
  dataLocal.forEach((breeds, id) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${id}</td>
                    <td>${breeds.name}</td>
                    <td>${breeds.type}</td>
                    <td><button onclick="deleteBreed(this)" style="background-color:red;">Delete</button></td>`;
    tbody.appendChild(tr);
  });
  inputBreed.value = "";
  inputTypeBreed.value = "Select type";
}
renderBreed(getBreed);
// delet pet
function deleteBreed(tag) {
  let confirmRemove = confirm("Are You Sure?");
  if (confirmRemove) {
    let id = tag.parentElement.parentElement.firstElementChild.textContent;
    getBreed.splice(id, 1);
    tag.parentElement.parentElement.remove();
    saveToStorageBreed(breedArr, getBreed);
    getFromStorageBreed(breedArr);
    renderBreed(getBreed);
  }
}
