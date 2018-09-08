"use strict";

/**
* Timer for table
* @constructor
* @param
* {Object} controller - controlling element
* id - element's id
* {Number} minutes - how many minutes the table will be ordered
* @return this Object
*/

function Clock(controller, id, minutes) {
	this.minutes = 0;
	this.hours = 0;
	this.id = undefined;
	this.controller = undefined;
	this.timer = undefined;

	this.init(controller, id, minutes);

	return this;
}

Clock.prototype = {
	/**
 * init this Object
 * @param
 * {Object} controller - controlling element
 * id - element's id
 * {Number} minutes - how many minutes the table will be ordered
 * @return this Object
 */

	init: function init(controller, id) {
		var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

		this.addMinutes(minutes);

		this.controller = controller ? controller : this.controller;
		this.id = id ? id : this.id;

		return this;
	},


	/**
 * get how many minutes the table will be ordered
 * @param {Number} minutes - how many minutes the table will be ordered
 */

	addMinutes: function addMinutes() {
		var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		this.hours = Math.floor(minutes / 60);
		this.minutes = minutes % 60;
	},
	getHours: function getHours(hours) {
		this.hours += hours;
	},


	/**
 * start this timer
 */

	start: function start() {
		var _this = this;

		this.changeTime();
		this.timer = setInterval(function () {
			return _this.changeTime();
		}, 60000);
	},


	/**
 * stop this timer
 */

	stop: function stop() {
		clearInterval(this.timer);
	},


	/**
 * clear this timer
 */

	clear: function clear() {
		this.stop();

		this.minutes = 0;
		this.hours = 0;
	},


	/**
 * change object's value and sends messages to the controller
 */

	changeTime: function changeTime() {
		this.hours = +this.hours;
		this.minutes = +this.minutes;

		if (this.hours && this.minutes == 0) {
			this.minutes = 59;
			this.hours--;
		} else {
			this.minutes--;
		}

		if (this.hours || this.minutes) {
			this.hours = this.formatTime(this.hours);
			this.minutes = this.formatTime(this.minutes);

			this.controller.changeTime(this.id, this.hours + ":" + this.minutes);
		} else {
			this.controller.finishTimer(this.id);
		}
	},
	getTime: function getTime() {
		this.hours = this.formatTime(+this.hours);
		this.minutes = this.formatTime(+this.minutes);

		return this.hours + ":" + this.minutes;
	},


	/**
 * check number's  format
 * @param {Number} n - number
 * @return two-digit number
 */

	formatTime: function formatTime(n) {
		return n > 9 ? n : "0" + n;
	}
};