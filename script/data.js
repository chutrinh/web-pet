"use strict";

// Export file
function saveStaticDataToFile() {
  getFromStoragePet(petArr);
  if (getPet.length !== 0) {
    let blob = new Blob([JSON.stringify(getPet)], {
      type: "text/plain;charset=utf-8",
    });
    let confiemSaveFile = confirm("Bạn có muốn tải file xuống?");
    if (confiemSaveFile) {
      saveAs(blob, "static.json");
    }
  } else {
    alert("Không có dữ liệu để tải xuống !");
  }
}
// bắt sự kiện khi người dùng chọn file.
let result;
async function readFile(event) {
  const fileInput = event.target.files.item(0);
  // kiểm tra loại file
  if (fileInput.type === "application/json") {
    const textData = await fileInput.text();
    result = textData;
  } else {
    alert("Vui lòng chọn loại  file có tên là 'application/json' !");
  }
}
// Import file
function uploadFile() {
  if (result) {
    let confirmUpLoadFile = confirm("Bạn có muốn upload file lên không?");
    if (confirmUpLoadFile) {
      const converData = JSON.parse(result);
      saveToStoragePet(petArr, converData);
      getFromStorageBreed(breedArr);
      let DataBreed = [...getBreed];
      converData.forEach(function (el) {
        let data = {
          name: el.breed,
          type: el.type,
        };
        DataBreed.push(data);
      });
      if (DataBreed.length !== 0) {
        let breedDog = DataBreed.filter((el) => {
          if (el.type === "Dog") {
            return el;
          }
        });
        let breedCat = DataBreed.filter((el) => {
          if (el.type === "Cat") {
            return el;
          }
        });
        let dogNew = [];
        breedDog.forEach(function (el) {
          let isDuplicate = dogNew.some(function (elm) {
            return elm.name === el.name;
          });
          if (!isDuplicate) {
            dogNew.push(el);
          }
        });
        let CatNew = [];
        breedCat.forEach((el) => {
          let isDuplicate = CatNew.some((elm) => {
            return elm.name === el.name;
          });
          if (!isDuplicate) {
            CatNew.push(el);
          }
        });

        let theEmResult = [...CatNew, ...dogNew];
        getBreed = theEmResult.concat();
        saveToStorageBreed(breedArr, getBreed);
        alert("Upload file thành công !");
        document.querySelector("#input-file").value = "";
      }
    }
  } else {
    alert("Vui lòng hãy chọn file !");
  }
}
// ---------------------------------
