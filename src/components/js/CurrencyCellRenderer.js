import { formatCurrency } from "./numberHelpers.js";

function CurrencyCellRenderer() {}

CurrencyCellRenderer.prototype.init = function (params) {
  let element = document.createElement('div');
  element.classList.add('currency-cell');
  element.innerHTML = formatCurrency(params.value);
  this.eGui = element;
};

CurrencyCellRenderer.prototype.getGui = function () {
  return this.eGui;
};

export default CurrencyCellRenderer;
