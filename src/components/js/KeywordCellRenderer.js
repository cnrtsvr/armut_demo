function KeywordCellRenderer() {}

KeywordCellRenderer.prototype.init = function (params) {
  let element = document.createElement('div');
  element.classList.add('keyword-cell');
  element.innerHTML = params.value;
  this.eGui = element;
};

KeywordCellRenderer.prototype.getGui = function () {
  return this.eGui;
};

export default KeywordCellRenderer;
