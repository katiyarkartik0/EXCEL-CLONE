let allAlignmentOptions = document.querySelectorAll(".align-cell-content span");

let leftAlign = allAlignmentOptions[0];
let centerAlign = allAlignmentOptions[1];
let rightAlign = allAlignmentOptions[2];


leftAlign.addEventListener("click", function(e){
    if(lastCell){
        lastCell.style.textAlign = "left";
        let address = lastCell.getAttribute("data-address");
        dataObj[address].align = "left";
    }
})
centerAlign.addEventListener("click", function(e){
    if(lastCell){
        lastCell.style.textAlign = "center";
        let address = lastCell.getAttribute("data-address");
        dataObj[address].align = "center";
    }
})
rightAlign.addEventListener("click", function(e){
    if(lastCell){
        lastCell.style.textAlign = "right";
        let address = lastCell.getAttribute("data-address");
        dataObj[address].align = "right";
    }
})

let allBoldItalicUnderlineOptions = document.querySelectorAll(".bold-italics-underline span");

let bold = allBoldItalicUnderlineOptions[0];
let italics = allBoldItalicUnderlineOptions[1];
let underline = allBoldItalicUnderlineOptions[2];

bold.addEventListener("click", function(e){ 
    if(lastCell){
        lastCell.style.fontWeight = "900";
        let address = lastCell.getAttribute("data-address");
        dataObj[address].isBold = "true";
    } 
})
italics.addEventListener("click", function(e){
    if(lastCell){
        lastCell.style.fontStyle = "italic";
    }
})
underline.addEventListener("click", function(e){
    if(lastCell){
        lastCell.style.textDecoration = "underline"
    }
})

let allCellColorOptions = document.querySelectorAll(".cell-color-options span");
let body = document.querySelector("body")

let bgColorPicker = allCellColorOptions[0];
bgColorPicker.addEventListener("click", function(e){
    let colorPickerElement = document.createElement("input");
    colorPickerElement.type = "color";
    body.append(colorPickerElement);
    colorPickerElement.click();
    colorPickerElement.addEventListener("input", function(e){
        if(lastCell){
            lastCell.style.backgroundColor = e.currentTarget.value;
            let address = lastCell.getAttribute("data-address");
            dataObj[address].bgColor = e.currentTarget.value;
        }
    });
});

let fontColorPicker = allCellColorOptions[1];
fontColorPicker.addEventListener("click", function(e){
    let colorPickerElement = document.createElement("input");
    colorPickerElement.type = "color";
    body.append(colorPickerElement);
    colorPickerElement.click();
    colorPickerElement.addEventListener("input", function(e){
        if(lastCell){
            lastCell.style.color = e.currentTarget.value;
            let address = lastCell.getAttribute("data-address");
            dataObj[address].Color = e.currentTarget.value;
        }
    });
});



