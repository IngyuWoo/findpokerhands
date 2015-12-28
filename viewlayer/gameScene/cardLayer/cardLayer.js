goog.provide('fph.CardLayer');

goog.require('lib.GameLayer');
goog.require('lime.animation.ScaleTo');

/**
 * CardLayer Object
 * @constructor fph.CardLayer
 * @extends lib.GameLayer
 * @param {number} index card index
 */
fph.CardLayer = function(index) {

	lib.GameLayer.call(this);

	this.setPosition(fph.CARD_GAP, fph.CARD_GAP);

	this.cardIndex = index;

	this.cardSprite = new lime.Sprite()
		.setSize(fph.CARD_WIDTH, fph.CARD_HEIGHT);
	this.appendChild(this.cardSprite);

	this.flipped = null;

	this.backImage = '';
	this.frontImage = null;
};
goog.inherits(fph.CardLayer, lib.GameLayer);

/**
 * CardLayer Events
 * @type {{FLIPPED: string, UNFLIPPED: string}}
 */
fph.CardLayer.Events = {
	FLIPPED: 'flipped',
	UNFLIPPED: 'unflipped'
};

/**
 * Initialize CardLayer object
 * @return
 */
fph.CardLayer.prototype.init = function () {
	this.flipped = false;

	this.backImage = fph.CARD_IMAGE_BACK;
	this.cardSprite.setFill(this.backImage);

	this.setFrontImage(fph.Controller.Game.getFrontImage(this.cardIndex));

	goog.events.listen(this.cardSprite, goog.events.EventType.MOUSEDOWN, this.OnPressCard, false, this);
};

/**
 * Set front Image
 * @return
 */
fph.CardLayer.prototype.setFrontImage = function (frontImage) {
	this.frontImage = frontImage;
};

/**
 * Event function called when the cardSprite is clicked.
 * @param {event}
 * @constructor
 */
fph.CardLayer.prototype.OnPressCard = function(e) {
	// this == e.targetObject
	e.swallow(goog.events.EventType.MOUSEUP, function (e) {
		if (this.hitTest(e)) {
			if (fph.Controller.Game.Play.isClickable() && !e.targetObject.getParent().flipped) {
				fph.Controller.Game.Play.setClickable(false);

				fph.Controller.Game.Play.addCardIntoSlot(e.targetObject.getParent().cardIndex);

				e.targetObject.getParent().flip();
			}
		}
	});
};

/**
 * Flip this card
 * @return
 */
fph.CardLayer.prototype.flip = function() {
	if (this.flipped) return;

	this.flipHalfAnim = new lime.animation.ScaleTo(0, 1).setDuration(0.2);
	this.runAction(this.flipHalfAnim);

	goog.events.listenOnce(this.flipHalfAnim, lime.animation.Event.STOP, function(){
		this.cardSprite.setFill(this.frontImage);
		this.flipTotalAnim = new lime.animation.ScaleTo(1, 1).setDuration(0.2);
		this.runAction(this.flipTotalAnim);

		goog.events.listenOnce(this.flipTotalAnim, lime.animation.Event.STOP, function(){
			this.flipped = true;
			goog.events.dispatchEvent(this, fph.CardLayer.Events.FLIPPED);
		}, false, this);
	}, false, this);
};

/**
 * Unflip this card
 * @return
 */
fph.CardLayer.prototype.unflip = function() {
	if (! this.flipped) return;

	this.unflipHalfAnim = new lime.animation.ScaleTo(0, 1).setDuration(0.2);
	this.runAction(this.unflipHalfAnim);

	goog.events.listenOnce(this.unflipHalfAnim, lime.animation.Event.STOP, function(e){
		if (this == e.target.targets[0]) {
			this.cardSprite.setFill('');// must initialize null here.
			this.dummyAni = new lime.animation.ScaleTo(0, 1).setDuration(0.001);
			this.runAction(this.dummyAni);
		}

		goog.events.listenOnce(this.dummyAni, lime.animation.Event.STOP, function(e){
			this.cardSprite.setFill(this.backImage);
			this.unflipTotalAnim = new lime.animation.ScaleTo(1, 1).setDuration(0.2);
			this.runAction(this.unflipTotalAnim);

			goog.events.listenOnce(this.unflipTotalAnim, lime.animation.Event.STOP, function(e){
				this.flipped = false;
				goog.events.dispatchEvent(this, fph.CardLayer.Events.UNFLIPPED);
			}, false, this);
		}, false, this);
	}, false, this);
};

/**
 * Remove card press event
 * @return
 */
fph.CardLayer.prototype.removePressEvent = function() {
	goog.events.unlisten(this.cardSprite , goog.events.EventType.MOUSEDOWN, this.OnPressCard);
};