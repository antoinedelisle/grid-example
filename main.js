import './style.css'

const GRID_SIZE = 500;
const GRID_AREA = 30;

window.selectedSpan = null;

window.clickX = 0;
window.clickY = 0;

window.offsetX = 0;
window.offsetY = 0;


function applyDataset(s) {
    s.style.gridColumnStart = s.dataset.gridColumnStart;
    s.style.gridColumnEnd = parseInt(s.dataset.gridColumnStart) + parseInt(s.dataset.gridColumnWidth);
    s.style.gridRowStart = s.dataset.gridRowStart;
    s.style.gridRowEnd = parseInt(s.dataset.gridRowStart) + parseInt(s.dataset.gridRowWidth);
}

function defineClickOffset(s, e){
  let ix = s.dataset.gridColumnStart;
  let iy = s.dataset.gridRowStart;
  let x = Math.ceil((e.pageX - window.offsetX) / (GRID_SIZE / (GRID_AREA + 1)));
  let y = Math.ceil((e.pageY - window.offsetY) / (GRID_SIZE / (GRID_AREA + 1)));
  window.clickX = x - ix;
  window.clickY = y - iy;
}

document.addEventListener('DOMContentLoaded', function() {
  window.offsetX = document.querySelector("#grid").offsetLeft;
  window.offsetY = document.querySelector("#grid").offsetTop;
  let spans = this.querySelector("#grid").children;
  for(const s of spans) {
    applyDataset(s);

    s.addEventListener("mousedown", function(e) {
      window.selectedSpan = s;
      s.classList.add("move");
      defineClickOffset(s, e);
      createPhantom({x: s.dataset.gridColumnStart, y: s.dataset.gridRowStart, colWidth: s.dataset.gridColumnWidth, rowWidth: s.dataset.gridRowWidth});
    })
  }
});

document.querySelector("#grid").addEventListener("mouseup", function(e){
  let x = Math.ceil((e.pageX - window.offsetX) / (GRID_SIZE / (GRID_AREA + 1))) - window.clickX;
  if(x == 0) x = 1;
  if(x >= 31 - parseInt(window.selectedSpan.dataset.gridColumnWidth)) x = 31 - window.selectedSpan.dataset.gridColumnWidth;
  let y = Math.ceil((e.pageY - window.offsetY) / (GRID_SIZE / (GRID_AREA + 1))) - window.clickY;
  if(y == 0) y = 1;
  if(y >= 31 - parseInt(window.selectedSpan.dataset.gridRowWidth)) y = 31 - window.selectedSpan.dataset.gridRowWidth
  window.selectedSpan.dataset.gridColumnStart = x;
  window.selectedSpan.dataset.gridColumnEnd = x + window.selectedSpan.dataset.gridColumnWidth;
  window.selectedSpan.dataset.gridRowStart = y;
  window.selectedSpan.dataset.gridRowEnd = y + window.selectedSpan.dataset.gridRowWidth;
  applyDataset(window.selectedSpan);
  window.selectedSpan.classList.remove("move");
  window.selectedSpan = null;
  document.querySelector("#grid-move").remove();
});

document.querySelector("#grid").addEventListener("mousemove", function(e){
  if(window.selectedSpan != null){
    let x = Math.ceil((e.pageX - window.offsetX) / (GRID_SIZE / (GRID_AREA + 1))) - window.clickX;
    if(x == 0) x = 1;
    if(x >= 31 - parseInt(window.selectedSpan.dataset.gridColumnWidth)) x = 31 - window.selectedSpan.dataset.gridColumnWidth;
    let y = Math.ceil((e.pageY - window.offsetY) / (GRID_SIZE / (GRID_AREA + 1))) - window.clickY;
    if(y == 0) y = 1;
    if(y >= 31 - parseInt(window.selectedSpan.dataset.gridRowWidth)) y = 31 - window.selectedSpan.dataset.gridRowWidth
    window.selectedSpan.dataset.gridColumnStart = x;
    window.selectedSpan.dataset.gridColumnEnd = x + window.selectedSpan.dataset.gridColumnWidth;
    window.selectedSpan.dataset.gridRowStart = y;
    window.selectedSpan.dataset.gridRowEnd = y + window.selectedSpan.dataset.gridRowWidth;
    applyDataset(window.selectedSpan)
  }
});
