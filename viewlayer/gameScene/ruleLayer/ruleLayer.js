goog.provide('fph.RuleLayer');

goog.require('lib.GameLayer');
goog.require('lime.Sprite');

/**
 * RuleLayer object
 * @constructor fph.RuleLayer
 * @extends lib.GameLayer
 */
fph.RuleLayer = function() {

	lib.GameLayer.call(this);

	this.setPosition(fph.RULE_POS_X, fph.RULE_POS_Y);

	this.ruleSprite = new lime.Sprite()
		.setAnchorPoint(0, 0)
		.setSize(fph.RULE_WIDTH, fph.RULE_HEIGHT)
		.setFill(new lime.fill.LinearGradient().addColorStop(0, '#424242').addColorStop(.49, '#292929').addColorStop(.5, '#171717').addColorStop(1, '#050505'));;
	this.appendChild(this.ruleSprite);

	this.ruleLabel = new lime.Label()
		.setAnchorPoint(0.5, 0.5)
		.setPosition(fph.RULE_LABEL_POS_X, fph.RULE_LABEL_POS_Y)
		.setFontSize(fph.RULE_LABEL_FONTSIZE)
		.setFontColor('#FFFFFF')
		.setShadow('#131313', 0, 3, 3);
	this.appendChild(this.ruleLabel);
	//this.ruleName = '';
};
goog.inherits(fph.RuleLayer, lib.GameLayer);

/**
 * Initialize RuleLayer for new game
 */
fph.RuleLayer.prototype.init = function () {
	fph.Controller.Game.setRuleName();
};

/**
 * Set ruleName and ruleLabel
 * @param {string} name rule name to set into its ruleLabel
 * @return
 */
fph.RuleLayer.prototype.setRuleName = function(name) {
	//this.ruleName = name;
	this.ruleLabel.setText(name);
};

/**
 * Show RuleLayer
 * @return
 */
fph.RuleLayer.prototype.show = function() {
	this.setHidden(false);
};

/**
 * Hide RuleLayer
 * @return
 */
fph.RuleLayer.prototype.hide = function() {
	this.setHidden(true);
};