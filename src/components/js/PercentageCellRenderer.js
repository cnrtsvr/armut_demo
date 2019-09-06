import { formatDecimal } from "./numberHelpers.js";

function PercentageCellRenderer() {}

PercentageCellRenderer.prototype.init = function (params) {
  let element = document.createElement('div');
  element.classList.add('number-cell');
  element.innerHTML = formatDecimal(Math.round(params.value)) + '%';
  this.eGui = element;
};

PercentageCellRenderer.prototype.getGui = function () {
  return this.eGui;
};

export default PercentageCellRenderer;
