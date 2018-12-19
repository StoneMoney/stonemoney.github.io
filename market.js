var items = {
    "items":[
        {"name":"painting","gMin":10,"gMax":15,"fmMin":12,"fmMax":17,"weight":3},
        {"name":"vhs-movie","gMin":5,"gMax":7,"fmMin":6,"fmMax":10,"weight":1},
        {"name":"chair","gMin":4,"gMax":5,"fmMin":5,"fmMax":9,"weight":4},
        {"name":"welcome-mat","gMin":2,"gMax":3,"fmMin":3,"fmMax":6,"weight":1},
        {"name":"small-carpet","gMin":4,"gMax":5,"fmMin":4,"fmMax":7,"weight":1},
        {"name":"dog-toy","gMin":2,"gMax":2,"fmMin":3,"fmMax":3,"weight":1},
        {"name":"50-cans-of-tomato-soup","gMin":12,"gMax":14,"fmMin":18,"fmMax":17,"weight":6},
        {"name":"dishware-set","gMin":10,"gMax":15,"fmMin":11,"fmMax":19,"weight":3},
        {"name":"golden-cup","gMin":5,"gMax":7,"fmMin":6,"fmMax":10,"weight":2},
        {"name":"toolbox","gMin":8,"gMax":10,"fmMin":10,"fmMax":15,"weight":4},
        {"name":"garden-tools","gMin":6,"gMax":9,"fmMin":7,"fmMax":9,"weight":3},
        {"name":"shoes","gMin":4,"gMax":6,"fmMin":5,"fmMax":8,"weight":1},
        {"name":"book","gMin":1,"gMax":3,"fmMin":3,"fmMax":5,"weight":1},
        {"name":"kitchen-mixer","gMin":5,"gMax":7,"fmMin":10,"fmMax":9,"weight":2},
        {"name":"tube-tv","gMin":15,"gMax":17,"fmMin":16,"fmMax":20,"weight":6},
        {"name":"tshirt","gMin":4,"gMax":5,"fmMin":5,"fmMax":8,"weight":1},
        {"name":"lantern","gMin":3,"gMax":4,"fmMin":5,"fmMax":9,"weight":2},
        {"name":"breadbox","gMin":3,"gMax":5,"fmMin":4,"fmMax":7,"weight":2},
        {"name":"board-game","gMin":4,"gMax":4,"fmMin":5,"fmMax":9,"weight":1}
    ]
};
var weight = 0;
var score = 0;
var store = [];
var maxWeight = 0;
var gasCost = 0;
var difficultyScale = 0;
function startGame(scores,mweights,gcost,scoremod) {
    score = scores;
    maxWeight = mweights;
    gasCost = gcost;
    difficultyScale = scoremod;
    weight = 0;
    document.getElementById("score").innerHTML = score;
    document.getElementById("weight").innerHTML = weight + " / " + maxWeight;
    document.getElementById("gsale").hidden = false;
    generateGarageSale(true);
}
function generateGarageSale(firstRound) {
    document.getElementById("location").innerHTML = "Garage Sale"
    if(firstRound || score-gasCost>0) {
        score = score-gasCost;
        document.getElementById("score").innerHTML = score;
        for(var i = 1; i <= 4; i++) {
            document.getElementById("button"+i).disabled = false;
            var randomItem = items.items[Math.floor(Math.random() * 18)]
            console.log(Math.floor(Math.random() * 18))
            var salePrice = Math.floor(Math.random() * (randomItem.gMax-randomItem.gMin)) + randomItem.gMin
            document.getElementById("img"+i).src = "img/"+ randomItem.name + ".jpg";
            document.getElementById("title"+i).innerHTML = randomItem.name.replace("-"," ");
            document.getElementById("button"+i).innerHTML = "$"+salePrice;
            randomItem.salePrice = salePrice;
            document.getElementById("itemdata"+i).innerHTML = JSON.stringify(randomItem);
        }
    } else {
        document.getElementById("gsalebutton").disabled = true;
        document.getElementById("gsalebutton").innerHTML = "Cannot Afford"
    }
}
function buyItem(item) {
    var data = JSON.parse(document.getElementById("itemdata"+item).innerHTML)
    if(score < data.salePrice) {
        document.getElementById("button"+item).disabled = true;
        document.getElementById("button"+item).innerHTML = "Cannot Afford"
    } else if (weight + data.weight > maxWeight) {
        document.getElementById("button"+item).disabled = true;
        document.getElementById("button"+item).innerHTML = "Cannot Carry"
    } else {
        document.getElementById("button"+item).disabled = true;
        document.getElementById("button"+item).innerHTML = "Purchased"
        store.push(data);
        score = score - data.salePrice;
        weight = weight + data.weight;
        document.getElementById("score").innerHTML = score;
        document.getElementById("weight").innerHTML = weight + " / " + maxWeight;
    }
}
function market() {
    if(confirm("Once you go market you dont go back")) {
        var time = 0;
        document.getElementById("time").innerHTML = time + " / 60 Minutes";
        document.getElementById("gsale").hidden = true;
        store.forEach(function(item) {
            var op = document.createElement("option");
            op.innerHTML = item.name;
            document.getElementById("listings").add(op)
        })
        for(time = 0; time < 60; time = time + 5) {
            document.getElementById("time").innerHTML = time + " / 60 Minutes";
            document.getElementById("gsale").hidden = true;
            if(store.length > 0) {
                var randomIndex = Math.floor(Math.random() * store.length)
                var selectedItem = store[randomIndex];
                var buyPrice = Math.floor(Math.random() * (selectedItem.fmMax-selectedItem.fmMin)) + selectedItem.fmMin
                if(confirm("Someone is offering $"+buyPrice+" for your "+selectedItem.name+"\n"+"(You paid $"+selectedItem.salePrice+" for this)"+"\n"+"[You have $"+score+" with "+time+" out of 60 minutes left]")) {
                    score = score + buyPrice;
                    document.getElementById("score").innerHTML = score;
                    var element = document.querySelectorAll("option")[randomIndex]
                    store.splice(randomIndex,1);
                    element.parentNode.removeChild(element);
                }
            }
        }
        var finalScore = Math.floor(score + (score * difficultyScale))
        document.getElementById("score").innerHTML = finalScore + " (Difficulty Scale: "+difficultyScale+") FINAL SCORE"
        document.getElementById("time").innerHTML = time + " / 60";
    }
}