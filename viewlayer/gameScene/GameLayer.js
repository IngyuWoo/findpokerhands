goog.provide('fph.GameLayer');

goog.require('lib.GameLayer');
goog.require('lime.Sprite');

goog.require('fph.ProgressLayer');
goog.require('fph.BoardLayer');
goog.require('fph.SlotLayer');
goog.require('fph.RuleLayer');
goog.require('fph.CountLayer');

/**
 * GameLayer object
 * @constructor fph.GameLayer
 * @extends lib.GameLayer
 */
fph.GameLayer = function() {

	lib.GameLayer.call(this);

	this.progressLayer = new fph.ProgressLayer();
	this.appendChild(this.progressLayer);

	this.boardLayer = new fph.BoardLayer();
	this.appendChild(this.boardLayer);

	this.slotLayer = new fph.SlotLayer();
	this.appendChild(this.slotLayer);

	this.ruleLayer = new fph.RuleLayer();
	this.appendChild(this.ruleLayer);

	this.countLayer = new fph.CountLayer();
	this.appendChild(this.countLayer);

	this.isClickable = false;
};
goog.inherits(fph.GameLayer, lib.GameLayer);

/**
 * Initialize GameLayer
 * @return
 */
fph.GameLayer.prototype.init = function () {
	fph.Controller.Game.initGameData();

	this.progressLayer.init();

	this.boardLayer.init();
	this.boardLayer.fillCards();

	this.slotLayer.init();
	this.slotLayer.hide();

	this.ruleLayer.init();
	this.ruleLayer.show();

	this.countLayer.init();
	this.countLayer.show();

	this.isClickable = true;

	if (goog.isDef(this.popupLayer)) { this.removeChild(this.popupLayer)}

	goog.events.listenOnce(this.progressLayer, fph.ProgressLayer.Events.TIME_OVER, fph.Controller.Game.OnGameLose);
};