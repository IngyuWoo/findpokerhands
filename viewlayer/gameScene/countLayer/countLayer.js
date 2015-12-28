goog.provide('fph.CountLayer');

goog.require('lib.GameLayer');
goog.require('lime.Label');

/**
 * CountLayer object
 * @constructor fph.CountLayer
 * @extends lib.GameLayer
 */
fph.CountLayer = function () {

	lib.GameLayer.call(this);

	this.setPosition(fph.COUNT_POS_X, fph.COUNT_POS_Y);

	this.countLabel = new lime.Label()
		.setAnchorPoint(0.5, 0.5)
		.setPosition(fph.COUNT_LABEL_POS_X, fph.COUNT_LABEL_POS_Y)
		.setFontSize(fph.COUNT_LABEL_FONTSIZE)
		.setFontColor('#000000')
		.setShadow('#636363', 5, 3, 3);
	this.appendChild(this.countLabel);

	this.countTotal = 0;
};
goog.inherits(fph.CountLayer, lib.GameLayer);

/**
 * Initialize CountLayer for new game
 */
fph.CountLayer.prototype.init = function () {
	this.countTotal = fph.RULE_SELECTED.minCardCnt;

	this.setCount(0);
};

/**
 * set flipped card count
 * @param {number} count
 * @return
 */
fph.CountLayer.prototype.setCount = function(count) {
	var text = count + '/' + this.countTotal;
	this.countLabel.setText(text);
};

/**
 * Show CountLayer
 * @return
 */
fph.CountLayer.prototype.show = function() {
	this.setHidden(false);
};

/**
 * Hide CountLayer
 * @return
 */
fph.CountLayer.prototype.hide = function() {
	this.setHidden(true);
};