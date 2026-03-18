var cats = [
{ name: “Summer Clothing”, items: [
{ n: “Lightweight tops (4\u20135)”, c: false },
{ n: “Shorts (2)”, c: false },
{ n: “Light pants or skirt”, c: false },
{ n: “Sundress / going-out piece”, c: false }
]},
{ name: “Winter Clothing”, items: [
{ n: “Coat or parka”, c: false },
{ n: “Fleece or sweater”, c: false },
{ n: “Long-sleeve shirts (2\u20133)”, c: false },
{ n: “Pants / jeans (2)”, c: false },
{ n: “Thermals or warm leggings”, c: false },
{ n: “Scarf, beanie and gloves”, c: false }
]},
{ name: “Year-Round Essentials”, items: [
{ n: “Underwear (7 days)”, c: false },
{ n: “Socks (7 days)”, c: false },
{ n: “Pajamas”, c: false },
{ n: “Formal / interview outfit”, c: false },
{ n: “Workout clothes”, c: false },
{ n: “Sturdy shoes (wear on plane)”, c: false },
{ n: “Light shoes or sneakers”, c: false },
{ n: “Sandals / flip-flops”, c: false }
]},
{ name: “Toiletries and Health”, items: [
{ n: “Toothbrush and toothpaste”, c: false },
{ n: “Deodorant”, c: false },
{ n: “Shampoo and conditioner”, c: false },
{ n: “Sunscreen”, c: false },
{ n: “Razor”, c: false },
{ n: “Nail clippers”, c: false },
{ n: “Prescriptions and medications”, c: false },
{ n: “First aid basics”, c: false },
{ n: “Quick-dry towel”, c: false }
]},
{ name: “Documents and Money”, items: [
{ n: “Passport”, c: false },
{ n: “Visa paperwork”, c: false },
{ n: “Work contract / offer letter”, c: false },
{ n: “Diplomas and certificates”, c: false },
{ n: “Medical records”, c: false },
{ n: “Digital backups of all docs”, c: false },
{ n: “Credit / debit cards (1\u20132)”, c: false },
{ n: “Small amount of local cash”, c: false }
]},
{ name: “Tech and Electronics”, items: [
{ n: “Phone and charger”, c: false },
{ n: “Power adapter (destination type)”, c: false },
{ n: “Portable battery pack”, c: false },
{ n: “Earbuds / headphones”, c: false },
{ n: “Laptop + charger (if needed)”, c: false }
]},
{ name: “Practical Extras”, items: [
{ n: “Daypack or packable tote”, c: false },
{ n: “Packing cubes”, c: false },
{ n: “Reusable water bottle”, c: false },
{ n: “Travel lock”, c: false },
{ n: “Earplugs and sleep mask”, c: false },
{ n: “Ziplock bags”, c: false },
{ n: “Pen”, c: false }
]}
];

var addingTo = -1;
var showNC = false;

function el(tag, cls) {
var e = document.createElement(tag);
if (cls) e.className = cls;
return e;
}

function makeSvg(d, sw) {
var ns = “http://www.w3.org/2000/svg”;
var s = document.createElementNS(ns, “svg”);
s.setAttribute(“width”, “14”);
s.setAttribute(“height”, “14”);
s.setAttribute(“viewBox”, “0 0 14 14”);
s.setAttribute(“fill”, “none”);
var p = document.createElementNS(ns, “path”);
p.setAttribute(“d”, d);
p.setAttribute(“stroke”, “currentColor”);
p.setAttribute(“stroke-width”, sw || “2”);
p.setAttribute(“stroke-linecap”, “round”);
p.setAttribute(“stroke-linejoin”, “round”);
s.appendChild(p);
return s;
}

function checkSvg() {
return makeSvg(“M2.5 7.5L5.5 10.5L11.5 3.5”);
}

function trashSvg() {
return makeSvg(“M2 4h10M5 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4m1.5 0v7.5a1 1 0 01-1 1h-5a1 1 0 01-1-1V4h8z”, “1.2”);
}

function plusSvg() {
return makeSvg(“M7 2v10M2 7h10”);
}

function updateProgress() {
var total = 0;
var checked = 0;
for (var i = 0; i < cats.length; i++) {
total += cats[i].items.length;
for (var j = 0; j < cats[i].items.length; j++) {
if (cats[i].items[j].c) checked++;
}
}
var pct = total ? Math.round(checked / total * 100) : 0;
var f = document.getElementById(“pf”);
f.style.width = pct + “%”;
f.style.background = pct === 100 ? “#5a8a5e” : “#c47a4a”;
document.getElementById(“pc”).textContent = checked + “ / “ + total;
}

function render() {
var main = document.getElementById(“main”);
main.innerHTML = “”;

for (var ci = 0; ci < cats.length; ci++) {
(function(ci) {
var cat = cats[ci];
var sec = el(“div”, “cat”);

```
  var cc = 0;
  for (var j = 0; j < cat.items.length; j++) {
    if (cat.items[j].c) cc++;
  }
  var allDone = cat.items.length > 0 && cc === cat.items.length;

  var top = el("div", "cat-top");
  var h2 = document.createElement("h2");
  h2.textContent = cat.name;
  if (allDone) h2.className = "alldone";
  var cnt = document.createElement("span");
  cnt.textContent = cc + "/" + cat.items.length;
  top.appendChild(h2);
  top.appendChild(cnt);
  sec.appendChild(top);

  for (var idx = 0; idx < cat.items.length; idx++) {
    (function(idx) {
      var it = cat.items[idx];
      var row = el("div", "row");

      var cb = el("button", it.c ? "cb on" : "cb");
      cb.type = "button";
      cb.appendChild(checkSvg());
      cb.addEventListener("click", function() {
        it.c = !it.c;
        render();
      });
      row.appendChild(cb);

      var lbl = el("span", it.c ? "lbl on" : "lbl");
      lbl.textContent = it.n;
      row.appendChild(lbl);

      var rm = el("button", "rm");
      rm.type = "button";
      rm.appendChild(trashSvg());
      rm.addEventListener("click", function() {
        cat.items.splice(idx, 1);
        if (cat.items.length === 0) {
          cats.splice(ci, 1);
        }
        render();
      });
      row.appendChild(rm);

      sec.appendChild(row);
    })(idx);
  }

  if (addingTo === ci) {
    var irow = el("div", "irow");

    var inp = document.createElement("input");
    inp.type = "text";
    inp.placeholder = "New item...";
    inp.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        var v = inp.value.trim();
        if (v) {
          cat.items.push({ n: v, c: false });
          addingTo = -1;
          render();
        }
      }
    });
    irow.appendChild(inp);

    var gobtn = el("button", "go");
    gobtn.type = "button";
    gobtn.textContent = "Add";
    gobtn.addEventListener("click", function() {
      var v = inp.value.trim();
      if (v) {
        cat.items.push({ n: v, c: false });
        addingTo = -1;
        render();
      }
    });
    irow.appendChild(gobtn);

    var xbtn = el("button", "xx");
    xbtn.type = "button";
    xbtn.textContent = "\u2715";
    xbtn.addEventListener("click", function() {
      addingTo = -1;
      render();
    });
    irow.appendChild(xbtn);

    sec.appendChild(irow);
    main.appendChild(sec);
    setTimeout(function() { inp.focus(); }, 10);
  } else {
    var ab = el("button", "addbtn");
    ab.type = "button";
    ab.appendChild(plusSvg());
    ab.appendChild(document.createTextNode(" Add item"));
    ab.addEventListener("click", function() {
      addingTo = ci;
      render();
    });
    sec.appendChild(ab);
    main.appendChild(sec);
  }
})(ci);
```

}

updateProgress();
renderNC();
}

function renderNC() {
var nc = document.getElementById(“nc”);
nc.innerHTML = “”;

if (showNC) {
var row = el(“div”, “ncrow”);

```
var inp = document.createElement("input");
inp.type = "text";
inp.placeholder = "Category name...";
inp.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    var v = inp.value.trim();
    if (v) {
      cats.push({ name: v, items: [] });
      showNC = false;
      addingTo = cats.length - 1;
      render();
    }
  }
});
row.appendChild(inp);

var g = el("button", "go");
g.type = "button";
g.textContent = "Create";
g.addEventListener("click", function() {
  var v = inp.value.trim();
  if (v) {
    cats.push({ name: v, items: [] });
    showNC = false;
    addingTo = cats.length - 1;
    render();
  }
});
row.appendChild(g);

var x = el("button", "xx");
x.type = "button";
x.textContent = "\u2715";
x.addEventListener("click", function() {
  showNC = false;
  renderNC();
});
row.appendChild(x);

nc.appendChild(row);
setTimeout(function() { inp.focus(); }, 10);
```

} else {
var btn = el(“button”, “ncbtn”);
btn.type = “button”;
btn.appendChild(plusSvg());
btn.appendChild(document.createTextNode(” Add new category”));
btn.addEventListener(“click”, function() {
showNC = true;
renderNC();
});
nc.appendChild(btn);
}
}

render();
