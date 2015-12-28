goog.provide('fph.PopupLayer');

goog.require('lib.GameLayer');
goog.require('lime.RoundedRect');
goog.require('lime.Label');
goog.require('lime.GlossyButton');

/**
 * PopupLayer object
 * @constructor fph.PopupLayer
 * @extends lib.GameLayer
 */
fph.PopupLayer = function () {

	lib.GameLayer.call(this);

	this.popupRRect = new lime.RoundedRect()
		.setAnchorPoint(0.5, 0.5)
		.setPosition(fph.POPUP_POS_X, fph.POPUP_POS_Y)
		.setSize(fph.POPUP_WIDTH, fph.POPUP_HEIGHT)
		.setRadius(fph.POPUP_RADIUS)
		.setFill(0, 0, 0, fph.POPUP_OPACITY);
	this.appendChild(this.popupRRect);

	this.textLabel = new lime.Label()
		.setAnchorPoint(0.5, 0.5)
		.setPosition(fph.POPUP_RRECT_POS_X, fph.POPUP_RRECT_POS_Y)
		.setFontSize(fph.POPUP_RRECT_FONTSIZE)
		.setFontColor(fph.POPUP_RRECT_FONTCOLOR)
		.setShadow('#000000', 10, 7, 7);
	this.popupRRect.appendChild(this.textLabel);

	this.retryGButton = new lime.GlossyButton()
		.setAnchorPoint(0.5, 0.5)
		.setPosition(fph.POPUP_GBUTTON_POS_X, fph.POPUP_GBUTTON_POS_Y)
		.setSize(fph.POPUP_GBUTTON_WIDTH, fph.POPUP_GBUTTON_HEIGHT)
		.setText(fph.POPUP_GBUTTON_TEXT)
		.setFontSize(fph.POPUP_GBUTTON_FONTSIZE);
	this.popupRRect.appendChild(this.retryGButton);
};
goog.inherits(fph.PopupLayer, lib.GameLayer);

/**
 * Initialize PopupLayer for new game
 * @param {string} text This is
 */
fph.PopupLayer.prototype.init = function (text) {
	this.textLabel.setText(text);

	goog.events.listen(this.retryGButton, goog.events.EventType.MOUSEDOWN, this.OnPressRetry);
};

/**
 * Event function called when the retry button is clicked
 * @param e
 * @return
 */
fph.PopupLayer.prototype.OnPressRetry = function (e) {
	e.stopPropagation();
	e.swallow(goog.events.EventType.MOUSEUP, function () {
		if (this.hitTest(e)) {
			fph.Controller.Game.newGame();
		}
	});
};