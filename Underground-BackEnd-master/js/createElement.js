'use strict';

/**
* @param
* body - куда генерировать
* type - что за блок
* class - class
* id - id
* text - текст в блоку
* html_text - html
* generate - генерировать при определенном условии
* elements - дочерние элементы
* save - созранить как элемент
** {boolean} active - сохранять или нет
** {String} name - имя для сохранения
* on - слушатели
** type - что слушаем
** param - принимает ли параметры
** callback - функция самовызова
*/

function createElement() {
	var _this = this;

	var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('body');
	var _ref = arguments[1];
	var _ref$type = _ref.type,
	    type = _ref$type === undefined ? 'div' : _ref$type,
	    class_element = _ref.class_element,
	    id_element = _ref.id_element,
	    text = _ref.text,
	    html_text = _ref.html_text,
	    _ref$generate = _ref.generate,
	    generate = _ref$generate === undefined ? true : _ref$generate,
	    _ref$save = _ref.save,
	    save = _ref$save === undefined ? {
		active: false,
		name: undefined
	} : _ref$save,
	    _ref$on = _ref.on,
	    on = _ref$on === undefined ? {
		active: false,
		param: false,
		type: undefined,
		callback: undefined
	} : _ref$on,
	    elements = _ref.elements;

	if (generate) {
		var elem = document.createElement(type);

		if (class_element) elem.className = class_element;
		if (id_element) elem.id = id_element;
		if (text) elem.innerText = text;
		if (html_text) elem.innerHTML = html_text;

		if (save.active) {
			if (!this._elements) this._elements = {};
			this._elements[save.name] = elem;
		}

		if (on.active) {
			if (on.param) {
				elem.addEventListener(on.type, function (e) {
					return on.callback(e, _this);
				});
			} else {
				elem.addEventListener(on.type, function () {
					return on.callback(_this);
				});
			}
		}

		if (elements) {
			if (elements instanceof Array) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var elems = _step.value;

						this.createElement(elem, elems);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			} else {
				this.createElement(elem, elements);
			}
		}

		body.appendChild(elem);
	}
}