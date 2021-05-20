function pushRules(list) {
    var inp = document.getElementById('i1').value.toLowerCase();

    var temp = inp.split(" ");
    inp = "";
    for (var i = 0; i < temp.length; i++){
        if (temp[i] != "")
            inp += " " + temp[i];
    }
   
    var re = varMı(inp);
    if (!re && inp != "") {
        var li = document.createElement("li");
        var rule = document.createTextNode(inp + "-x1");
        li.appendChild(rule);
        removeBtn(li);       
        document.getElementById("list").appendChild(li); 
    }
}

function varMı(nesne) {
    var lst = document.getElementById('list');
    for (var i = 0; i < lst.children.length; i++) {
        var temp = lst.children[i].innerHTML;
        var ns = temp.split("-x");
        if (ns[0] == nesne) {
            ns[1] = parseInt(ns[1]) + 1;
            var vr = ns[0] + "-x" + ns[1];
            lst.children[i].innerHTML = vr;
            removeBtn(lst.children[i]);
            return true;
        }
    }
    return false;
}

function removeBtn(btn) {
    var removeBtn = document.createElement("input");
    removeBtn.type = "image";
    removeBtn.className = "kal";
    removeBtn.src = "delete.png";
    removeBtn.alt = "delete";
    removeBtn.onclick = remove;
    btn.appendChild(removeBtn);
}

function remove(e) {
    var el = e.target;
    el.parentNode.remove();
}
 
function removeRules() {
    const parent = document.querySelector('#list');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}