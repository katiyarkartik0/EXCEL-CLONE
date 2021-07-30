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
        dataObj[address].align = "right";
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
        lastCell.style.fontWeight = "bold";
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

