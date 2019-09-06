function CategoriesCellRenderer() {}

CategoriesCellRenderer.prototype.init = function (params) {
  let element = document.createElement('div');
  element.classList.add('categories-cell');
  let text = '';
  params.value.forEach((item, index) => {
    text += item;
    if(index !== params.value.length - 1) {
      text += ', ';
    }
  });
  element.innerHTML = text;
  this.eGui = element;
};

CategoriesCellRenderer.prototype.getGui = function () {
  return this.eGui;
};

export default CategoriesCellRenderer;
