import { formatDecimal } from "./numberHelpers.js";

function NumberCellRenderer() {}

NumberCellRenderer.prototype.init = function (params) {
  let element = document.createElement('div');
  element.classList.add('number-cell');
  element.innerHTML = formatDecimal(params.value);
  this.eGui = element;
};

NumberCellRenderer.prototype.getGui = function () {
  return this.eGui;
};

export default NumberCellRenderer;
