goog.provide('fph.BoardLayer');

goog.require('lib.GameLayer');

goog.require('fph.CardLayer');

/**
 * BoardLayer Object
 * @constructor fph.BoardLayer
 * @extends lib.GameLayer
 */
fph.BoardLayer = function() {

	lib.GameLayer.call(this);

	this.setPosition(fph.BOARD_POS_X, fph.BOARD_POS_Y);

	this.boardSprite = new lime.Sprite()
		.setAnchorPoint(0, 0)
		.setSize(fph.BOARD_WIDTH, fph.BOARD_HEIGHT)
		.setStroke(fph.BOARD_BORDER, fph.BOARD_BORDER_COLOR);
	this.appendChild(this.boardSprite);

	this.rows = 0;
	this.cols = 0;
	this.cards = [];
};
goog.inherits(fph.BoardLayer, lib.GameLayer);

/**
 * Initialize BoardLayer
 * @return
 */
fph.BoardLayer.prototype.init = function () {
	this.setOpacity(1);

	this.rows = 6;
	this.cols = 9;
	this.cards = new Array(this.rows * this.cols);
};

/**
 * Fill the boardSprite so that all columns have max amount of cards.
 * @return
 */
fph.BoardLayer.prototype.fillCards = function () {
	if (this.boardSprite.getNumberOfChildren() > 0) {
		this.boardSprite.removeAllChildren();
	}

	var index = 0;
	for (var col = 0; col < this.cols; col++) {
		if (!this.cards[col]) this.cards[col] = [];
		for (var row = 0; row < this.rows; row++) {
			var card = new fph.CardLayer(index);
			card.init();
			card.setPosition(fph.CARD_GAP + fph.CARD_WIDTH/2 + (fph.CARD_WIDTH + fph.CARD_GAP) * col, fph.CARD_GAP + fph.CARD_HEIGHT/2 + (fph.CARD_HEIGHT + fph.CARD_GAP) * row);
			this.cards[index] = card;
			this.boardSprite.appendChild(card);

			goog.events.listen(card, fph.CardLayer.Events.FLIPPED, fph.Controller.Game.Play.OnFlipCard);
			goog.events.listen(card, fph.CardLayer.Events.UNFLIPPED, fph.Controller.Game.Play.OnUnflipCard);

			index++;
		}
	}
};

/**
 * Remove all card events.
 * @return
 */
fph.BoardLayer.prototype.removeCardEvents = function () {
	for (var i = 0; i < this.cards.length; i++) {
		this.cards[i].removePressEvent();
	}
};