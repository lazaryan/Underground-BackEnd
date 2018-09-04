'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var cap = {
	class_element: 'table__cap',
	text: '\u0421\u0442\u043E\u043B \u2116 ' + undefined.Number,
	generate: !undefined._active,
	save: {
		active: true,
		name: '_cap'
	},
	on: {
		active: true,
		type: 'click',
		callback: undefined.closeCap
	}
};

var title_setting = {
	class_element: 'table__title',
	text: '\u0421\u0442\u043E\u043B \u2116 ' + undefined.number
};

var information_name = {
	type: 'span',
	class_element: 'information__value',
	id_element: undefined.Number + '_name',
	text: undefined.Name,
	save: {
		active: true,
		name: '_name'
	}
};

var information_timer = {
	type: 'span',
	class_element: 'information__value',
	id_element: undefined.Number + '_timer',
	text: undefined.Timer,
	save: {
		active: true,
		name: '_timer'
	}
};

var change_add = {
	type: 'button',
	class_element: 'information__button',
	text: 'Добавить',
	save: {
		active: true,
		name: '_add_hours'
	}
};

var change_remove = {
	type: 'button',
	class_element: 'information__button',
	text: 'Убрать',
	save: {
		active: true,
		name: '_add_remove'
	}
};

exports.default = create = {
	cap: { setting: cap_setting },
	title: { setting: title_setting },
	information: {
		setting: {
			class_element: 'table__information',
			elements: [{
				class_element: 'information__field',
				elements: [{
					class_element: 'information__title',
					text: 'Клиент'
				}, information_name]
			}, {
				class_element: 'information__field',
				elements: [{
					class_element: 'information__title',
					text: 'Таймер'
				}, information_timer]
			}]
		}
	},
	change: {
		setting: {
			class_element: 'table__change',
			elements: [change_add, change_remove]
		}
	}
};