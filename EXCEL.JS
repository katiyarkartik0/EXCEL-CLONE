let rowNumberSection = document.querySelector(".row-number-section");
for(let i = 1; i<=100;i++){
    let div = document.createElement("div");
    div.innerText = i;
    div.classList.add("row-number");
    rowNumberSection.append(div);
}

let columnTagsSection = document.querySelector(".column-tag-section");
for(let i = 0; i<26; i++){
    let ASCIIcode = 65 + i;
    let correspondingCharacter = String.fromCharCode(ASCIIcode);
    let div = document.createElement("div");
    div.innerText = correspondingCharacter;
    div.classList.add("column-tag");
    columnTagsSection.append(div);
}

let lastCell = undefined;
let selectedCellDiv = document.querySelector(".selected-cell-div");
let cellSection = document.querySelector(".cell-section");
let dataObj = {};
for(let i = 1; i<=100; i++){

    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row")
    for(let j = 0; j<26; j++){
        let ASCIIcode = 65 + j;
        let correspondingCharacter = String.fromCharCode(ASCIIcode);
        let cellAdress = correspondingCharacter + i;
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("data-address", cellAdress);
        cellDiv.setAttribute("contentEditable",true);
        cellDiv.addEventListener("click", function(e){
            if(lastCell){
                lastCell.classList.remove("cell-selected");
            }
            e.currentTarget.classList.add("cell-selected");
            let currCellAddress = e.currentTarget.getAttribute("data-address");
            selectedCellDiv.innerText = currCellAddress;
            lastCell = e.currentTarget;
        })
        dataObj[cellAdress] = {
            value : undefined,
            formula : undefined,
            upstream : [],
            downstream : [],
            align: "left",
            Color: "black",
            bgColor : "white",
            isBold : "false",
        }
        cellDiv.addEventListener("input", function(e){
            let currCellAddress = e.currentTarget.getAttribute("data-address");
            let currCellObj = dataObj[currCellAddress];
            currCellObj.value = e.currentTarget.innerText;
            currCellObj.formula = undefined;

            let currCellUpstream = currCellObj.upstream;
            for(let k = 0; k< currCellUpstream.length; k++){
                removeFromDownstreamOfParent(currCellUpstream[k],currCellAddress);
            }
            currCellObj.upstream = [];

            let currCellDownstream = currCellObj.downstream;
            for(let i = 0 ; i< currCellDownstream.length; i++){
                // we are sending an element of the downstream array to update its cell
                updateDownstream(currCellDownstream[i]);
            }
            dataObj[currCellAddress] = currCellObj;
            
        })
        rowDiv.append(cellDiv);
    }
    cellSection.append(rowDiv);
}

cellSection.addEventListener("scroll", function(e){
    columnTagsSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
    rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`
})

function removeFromDownstreamOfParent(parentCell,childCell){
    //fetching downstream array of parentCell and storing it into a variable named parentDownstream
    let parentDownstream = dataObj[parentCell].downstream;

    //filtering parentDownstream array to exclude all child elements
    let filteredDownstream = [];
    for(let i = 0; i< parentDownstream.length; i++){
        if(parentDownstream[i]!=childCell){
            filteredDownstream.push[parentDownstream[i]];
        }
    }

    // overwriting the downstream array by new filteredDownstream array
    dataObj[parentCell].downstream = filteredDownstream;
}

function updateDownstream(childCell){
    let childUpstream = dataObj[childCell].upstream; //referring to upstream array of this cell
    let childFormula = dataObj[childCell].formula; // refferring to formula string of this cell
    
    `creating a value object of the format
    valObj[Y1] = {
        C1 : 20,
        D2 : 32,
        F4 : 43
    }
    as formula contains Y1 = C1 + D2 + F4`
    valObj = {}
    for(let i = 0 ; i<childUpstream.length; i++){
        let parentCellValue = dataObj[childUpstream[i]].value;
        valObj[childUpstream[i]] = parentCellValue;
    }

    for(let key in valObj){
        childFormula = childFormula.replace(key,valObj[key]);
    }

    let newValue = eval(childFormula);
    let cellOnUi = document.querySelector(`[data-address='${childCell}']`);
    cellOnUi.innerText = newValue;
    dataObj[childCell].value = newValue;
    
    `preparing a recursive function call 
    since a ripple effect of change of cell Value will ask for
    change of value of its own child and so on`
    let currCellObj = dataObj[childCell]; // referring to cellObject of this cell
    let currCellDownstream = currCellObj.downstream;
    for(let i = 0; i< currCellDownstream.length; i++){
        updateDownstream(currCellDownstream[i]);
    }
    dataObj[childCell] = currCellObj;
    
}

let formulaInput = document.querySelector(".formula-input-section");
formulaInput.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        let typedFormula = e.currentTarget.value;
        if(!lastCell){
            return;
        }
        let selectedCellAddress = lastCell.getAttribute("data-address");
        let currCellObj = dataObj[selectedCellAddress];
        currCellObj.formula = typedFormula;
        let currCellUpstream = currCellObj.upstream;
        for(let k = 0; k< currCellUpstream.length; k++){
            removeFromDownstreamOfParent(currCellUpstream[k],selectedCellAddress);
        }
        currCellObj.upstream = []; 
        
        let splittedFormula = typedFormula.split(" ");
        for(let i = 0; i < splittedFormula.length; i++){
            let ele = splittedFormula[i];
            if(ele != "+" && ele != "-" && ele != "*" && ele != "/" && ele != " " && ele != ")" && ele != "("){
                currCellObj.upstream.push(ele);
            }
        }

        for(let j = 0; j< currCellObj.upstream.length; j++){
            addToDownstreamArray(currCellObj.upstream[j], selectedCellAddress);
        }

        valObj = {}
        for(let i = 0 ; i<currCellObj.upstream.length; i++){
            let parentCellValue = dataObj[currCellObj.upstream[i]].value;
            valObj[currCellObj.upstream[i]] = parentCellValue;
        }
    
        for(let key in valObj){
            typedFormula = typedFormula.replace(key,valObj[key]);
        }
    
        let newValue = eval(typedFormula);
        dataObj[selectedCellAddress].value = newValue;

        let currCellDownstream = currCellObj.downstream;
        for(let i = 0 ; i< currCellDownstream.length; i++){
            // we are sending an element of the downstream array to update its cell
            updateDownstream(currCellDownstream[i]);
        }
        dataObj[selectedCellAddress] = currCellObj;   
        lastCell.innerText = newValue;
        
    }
})

function addToDownstreamArray(parent, child){
    dataObj[parent].downstream.push(child);
}






