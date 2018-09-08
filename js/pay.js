"use strict";

/**
* Amount display object
* @constructor
* @param
* {Object} controller - controlling element
* id - element's id
* @return this Object
*/

function Pay(controller, id) {
	this.controller = undefined;
	this.id = undefined;
	this.prise = 0;

	this._body = undefined;

	this.init(controller, id);

	return this;
}

Pay.prototype = {
	get Body() {
		return this._body;
	},
	set Body(body) {
		this._body = body;
	},

	/**
 * init this Object
 * @param
 * {Object} controller - controlling element
 * id - element's id
 * @return this Object
 */

	init: function init(controller, id) {
		this.controller = controller ? controller : this.controller;
		this.id = id ? id : this.id;

		this._create = {
			header: {
				setting: {
					type: 'header',
					className: 'to-pay__header',
					elements: [{
						type: 'h2',
						className: 'to-pay__title-header',
						text: '\u0421\u0442\u043E\u043B \u2116 ' + this.id,
						save: {
							active: true,
							name: '_title'
						}
					}, {
						type: 'span',
						className: 'to-pay__close',
						save: {
							active: true,
							name: '_close'
						},
						on: {
							active: true,
							type: 'click',
							callback: this.closePopup
						}
					}]
				}
			},
			body: {
				setting: {
					className: 'to-pay__body',
					elements: [{
						type: 'p',
						className: 'to-pay__title',
						text: 'К оплате:'
					}, {
						className: 'to-pay__value',
						save: {
							active: true,
							name: '_value'
						}
					}]
				}
			}
		};

		return this;
	},


	/**
 * create this Object and displaying it on the page
 */

	createPopup: function createPopup() {
		this.Body = document.createElement('div');
		this.Body.className = 'to-pay';
		this.Body.id = this.id;

		if (this._create) {
			for (var elem in this._create) {
				this.createElement(this.Body, this._create[elem].setting);
			}
		}

		document.querySelector('body').appendChild(this.Body);
	},


	/**
 * close this Object
 * @param this Object
 */

	closePopup: function closePopup(than) {
		than.controller.closePay(than.id);
		than.removePopup(than);
	},


	/**
 * remove this popup
 * @param {Object} than - this Object
 */

	removePopup: function removePopup(than) {
		document.querySelector('body').removeChild(than.Body);
	},


	/**
 * show price
 * @param
 * {Number} price - tabel's price
 * {Number} hours - how many hours the table will be ordered
 */

	addPrise: function addPrise(prise, hours) {
		this.prise = prise * hours || this.prise;

		this._elements._value.innerText = this.prise;
	},


	/**
 * @param
 * {Object} body - block to which this element is generated
 * {String} type - element's type
 * {String} className - list of the element's classes
 * id - element's id
 * {String} text - text in element
 * {String} html_text - html markup inside the element
 * {Boolean} generate - generated under certain condition
 * {Object} elements - child elements
 * {Object} save - saving element
 ** @param
 ** {Boolean} active - presence of event listeners
 ** {String} name - name to save
 * {Object} on - event listeners
 ** @param
 ** {Boolean} active - presence of event listeners
 ** {String} type - type of event listener
 ** {Boolean} param - whether the function takes arguments
 ** {Function} callback - callback function
 */

	createElement: function createElement() {
		var _this = this;

		var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('body');
		var _ref = arguments[1];
		var _ref$type = _ref.type,
		    type = _ref$type === undefined ? 'div' : _ref$type,
		    className = _ref.className,
		    id = _ref.id,
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

			if (className) elem.className = className;
			if (id) elem.id = id;
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
};