goog.provide('fph.GameScene');

goog.require('lime.Scene');
goog.require('lime.animation.FadeTo');

goog.require('fph.GameLayer');

/**
 * GameScene object
 * @constructor fph.GameScene
 * @extends lime.Scene
 */
fph.GameScene = function() {

	lime.Scene.call(this);

	this.gameLayer = new fph.GameLayer();
	this.appendChild(this.gameLayer);
};
goog.inherits(fph.GameScene, lime.Scene);

/**
 * Initialize GameScene
 * @return
 */
fph.GameScene.prototype.init = function () {
	this.setOpacity(.1);
	this.runAction(new lime.animation.FadeTo(1).setDuration(.5));

	this.gameLayer.init();
};
