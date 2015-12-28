goog.provide('fph.SlotLayer');

goog.require('lib.GameLayer');

/**
 * SlotLayer object
 * @constructor fph.SlotLayer
 * @extends lib.GameLayer
 */
fph.SlotLayer = function() {

	lib.GameLayer.call(this);

	this.slotSprite = new lime.Sprite()
		.setAnchorPoint(0, 0)
		.setSize(fph.SLOT_WIDTH, fph.SLOT_HEIGHT)
		.setStroke(fph.SLOT_BORDER, fph.SLOT_BORDER_COLOR);
	this.appendChild(this.slotSprite);

	// store flipped card index.
	this.slots = [];
	this.flippedCardCnt = 0;

	this.moveIndex = 0;
};
goog.inherits(fph.SlotLayer, lib.GameLayer);

/**
 * Initialize SlotLayer for new game
 */
fph.SlotLayer.prototype.init = function () {
	this.setPosition(fph.SLOT_POS_X, fph.SLOT_POS_Y)
		.setOpacity(1);

	this.slots = new Array(fph.RULE_SELECTED.minCardCnt);
	this.flippedCardCnt = 0;

	this.moveIndex = 0;
};

/**
 * Add flipped card index into slots
 * @param {number} index card index
 */
fph.SlotLayer.prototype.addCard = function(index) {
	if (this.flippedCardCnt < this.slots.length) {
		this.slots[this.flippedCardCnt] = index;
		this.flippedCardCnt++;
	}
};

/**
 * Move flipped cards on the BoardLayer to SlotLayer
 * @param {fph.CardLayer} card flipped Cardlayer
 * @return
 */
fph.SlotLayer.prototype.moveCard = function (card) {
	var pos_x = this.getPosition().x - fph.CARD_WIDTH / 2 + (fph.CARD_WIDTH + fph.CARD_GAP) * this.moveIndex;
	var pos_y = fph.BOARD_HEIGHT+ 50 + fph.CARD_HEIGHT / 2 + fph.CARD_GAP;
	card.runAction(
		new lime.animation.MoveTo(pos_x, pos_y)
		.setDuration(0.7)
		.setEasing(lime.animation.Easing.EASEOUT)
	);

	this.moveIndex++;
};

/**
 * Show this
 * @return
 */
fph.SlotLayer.prototype.show = function() {
	this.setHidden(false);
};

/**
 * hide this
 * @return
 */
fph.SlotLayer.prototype.hide = function() {
	this.setHidden(true);
};