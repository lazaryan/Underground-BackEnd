'use strict';

/**
* Table Object
* @constructor
* @param
* {Object} controller - controlling element
* {Object} obj - table's setting
* id - element's id
* @return this Object
*/

function Tabel(id, obj, controller) {
	this.number = 0;
	this.id = undefined;
	this.name = '';
	this.order = '';
	this.prise = 0;
	this.hours = 0;

	this.controller = undefined;

	this._active = false;
	this._active_add_hours = false;
	this._body = undefined;
	this._elements = {};
	this._create = undefined;

	this.init(id, obj, controller);

	return this;
}

Tabel.prototype = {
	/**
 * init this Object
 * @param
 * {Object} controller - controlling element
 * {Object} obj - table's setting
 * id - element's id
 * @return this Object
 */

	init: function init(id, _ref, controller) {
		var _ref$prise = _ref.prise,
		    prise = _ref$prise === undefined ? 0 : _ref$prise,
		    name = _ref.name,
		    _ref$hours = _ref.hours,
		    hours = _ref$hours === undefined ? 0 : _ref$hours,
		    order = _ref.order;

		this.number = id != undefined ? id : this.id;
		this.id = id != undefined ? 'table_' + id : this.id;
		this.prise = prise != undefined ? prise : this.prise;
		this.name = name != undefined ? name : this.name;
		this.hours = hours != undefined ? hours : this.hours;
		this.order = order != undefined ? order : this.order;

		this.controller = controller != undefined ? controller : this.controller;

		if (this.name) {
			this._active = true;
		}

		this._create = {
			cap: {
				setting: {
					type: 'button',
					save_name: '_cap',
					text: '\u0421\u0442\u043E\u043B \u2116 ' + this.Number,
					generate: !this._active,
					attr: { class: 'table__cap' },
					on: { 'click': this.showPopup.bind(this) }
				}
			},
			title: {
				setting: {
					text: '\u0421\u0442\u043E\u043B \u2116 ' + this.number,
					attr: { class: 'table__title' }
				}
			},
			information: {
				setting: {
					attr: { class: 'table__information' },
					elements: [{
						attr: { class: 'information__field' },
						elements: [{
							text: 'Клиент',
							attr: { class: 'information__title' }
						}, {
							type: 'span',
							save_name: '_name',
							text: this.Name,
							attr: {
								class: 'information__value',
								id: this.Number + '_name'
							}
						}]
					}, {
						attr: { class: 'information__field' },
						elements: [{
							text: 'Таймер',
							attr: { class: 'information__title' }
						}, {
							type: 'span',
							text: '00:00:00',
							save_name: '_timer',
							attr: {
								class: 'information__value',
								id: this.Number + '_timer'
							}
						}]
					}]
				}
			},
			change: {
				setting: {
					attr: { class: 'table__change' },
					elements: [{
						type: 'div',
						save_name: '_add_hours_block',
						attr: { class: 'information__checked', id: 'hours_block' },
						elements: [{
							type: 'button',
							text: 'Изменить',
							save_name: '_add_hours',
							attr: { class: 'information__button information__button_absolute' },
							on: { 'click': this.showAddHours.bind(this) }
						}, {
							save_name: '_add_hours_input',
							attr: { class: 'information__button information__button_col_transp information__button_flex' },
							elements: [{
								type: 'input',
								save_name: '_add_hours_value',
								attr: {
									class: 'information__input-hours',
									type: 'number',
									min: this.controller.setting.hours.min,
									max: this.controller.setting.hours.max,
									value: this.Hours
								},
								on: {
									'input': this.inputHours.bind(this),
									'keyup': this.checkEnter.bind(this)
								}
							}, {
								type: 'button',
								text: 'Изменить',
								attr: { class: 'information__button-hours' },
								on: { 'click': this.changeHours.bind(this) }
							}]
						}]
					}, {
						type: 'button',
						text: 'Убрать',
						save_name: '_add_remove',
						attr: { class: 'information__button' },
						on: { 'click': this.showPay.bind(this) }
					}]
				}
			}
		};

		this.createTable();

		return this;
	},


	get Body() {
		return this._body;
	},
	set Body(element) {
		this._body = element;
	},

	get Number() {
		return this.number;
	},
	set Number(number) {
		this.number = number;
	},

	get Name() {
		return this.name;
	},
	set Name(name) {
		this.name = name;
	},

	get Hours() {
		return this.hours;
	},
	set Hours(hours) {
		this.hours = hours;
	},

	get Prise() {
		return this.prise;
	},
	set Prise(prise) {
		this.prise = prise;
	},

	/**
 * create this Object
 */

	createTable: function createTable() {
		var _this = this;

		this.Body = document.createElement('div');
		this.Body.className = 'table';
		this.Body.id = this.id;

		if (this._create) {
			Object.keys(this._create).map(function (el) {
				return _this._create[el];
			}).forEach(function (el) {
				createElement(_this.Body, el.setting, _this._elements);
			});
		}
	},


	/**
 * Removes the table's lid and makes it active
 */

	closeCap: function closeCap() {
		this.Body.removeChild(this._elements._cap);

		this._active = true;
		this._elements._cap = undefined;
	},
	checkClient: function checkClient() {
		if (this.Name && this.Hours) {
			this.startTable();
		}
	},
	startTable: function startTable() {
		var time = new Date();
		var seconds_order = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
		var order = this.order.split(':').reduce(function (s, c) {
			return s * 60 + +c;
		}, 0);

		var seconds = this.Hours * 3600 + order - seconds_order;

		if (seconds > 0 && order < seconds_order) {
			this.controller.startTimer(this.Number, seconds);
		} else {
			this.showPay(this);
		}
	},


	/**
 * method of creating a window for adding visitor's data
 */

	showPopup: function showPopup() {
		this.controller.showAddClient(this.Number);
	},


	/**
 * method that adds the table's lid and makes it inactive
 */

	addCap: function addCap() {
		this._create.cap.setting.generate = true;
		this._active = false;

		createElement(this.Body, this._create.cap.setting, this._elements);
	},


	/**
 * method of modifying data
 * @param
 * {String} name - client's name
 * {Number} hours - how many hours the table will be ordered
 */

	changeData: function changeData(name, hours) {
		this.Hours = hours;

		if (this.Name != name) {
			this.Name = name;
			this._elements._name.innerText = this.Name;
		}
	},


	/**
 * clear the information about the client
 */

	clearData: function clearData() {
		this.Hours = 0;
		this.Name = '';

		this._elements._name.innerText = '';
	},


	/**
 * mmethod of modifying data and activate the table
 * @param
 * {String} name - client's name
 * {Number} hours - how many hours the table will be ordered
 */

	activeTable: function activeTable(name, hours) {
		this._active = true;
		this.changeData(name, hours);
	},


	/**
 * method to display the price on the screen
 */

	showPay: function showPay() {
		this.controller.showPay(this.Number, this.Hours, this.prise);

		if (!this._elements._add_hours) {
			this.addHoursCap();
		}
	},
	sendClient: function sendClient(prise) {
		var obj = 'number=' + this.Number + '&prise=' + prise.toFixed(1);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '../php/remove_client.php', true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(obj);

		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {
				throw new Error(xhr.statusText);
			}
		};
	},


	/**
 * method to change the remaining time of table reservation
 * @param {String} time - the remaining time
 */

	changeTimer: function changeTimer(time) {
		this._elements._timer.innerText = time;
	},
	showAddHours: function showAddHours() {
		this.removeHoursCap();

		this._elements._add_hours_value.value = this.Hours;

		this._elements._add_hours_value.focus();
	},
	removeHoursCap: function removeHoursCap() {
		this._elements._add_hours.style = 'display: none;';
	},
	addHoursCap: function addHoursCap() {
		this._elements._add_hours.style = '';
	},
	changeHours: function changeHours() {
		this.addHoursCap();

		var hours = this.format_time(this._elements._add_hours_value.value);

		if (hours == this.Hours) return;

		this.controller.changeHours(this.number, +hours - this.Hours);

		this.changeTime(hours);

		this.sendNewHours();
	},
	sendNewHours: function sendNewHours() {
		var obj = 'number=' + this.Number + '&value=' + this.Hours;

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '../php/add_hour.php', true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(obj);

		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {
				throw new Error(xhr.statusText);
			}
		};
	},
	inputHours: function inputHours(e) {
		this.format_time(e.target.value);
	},
	checkEnter: function checkEnter(e) {
		if (e.code == 'Enter' && this.Name) {
			this.changeHours();
		}
	},
	format_time: function format_time(time) {
		var text = time;

		if (!Number(text)) {
			text = text.toString().replace(/[^0-9 ]/g, '');
		}

		text = +text;

		if (text > this._elements._add_hours_value.max) {
			text = this._elements._add_hours_value.max;
		}

		if (text < this.Hours) {
			text = this.Hours;
		}

		if (text < this._elements._add_hours_value.min) {
			text = this._elements._add_hours_value.min;
		}

		this._elements._add_hours_value.value = text;

		return text;
	},
	changeTime: function changeTime(text) {
		this.Hours = text;
	}
};