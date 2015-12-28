goog.provide('fph.ProgressLayer');

goog.require('lib.GameLayer');
goog.require('lime.RoundedRect');
goog.require('lime.Label');
goog.require('lime.animation.ColorTo');
goog.require('lime.animation.Resize');
goog.require('lime.fill.LinearGradient');

/**
 * ProgressLayer object
 * @constructor fph.ProgressLayer
 * @extends lib.GameLayer
 */
fph.ProgressLayer = function() {

	lib.GameLayer.call(this);

	this.progressOutterRRect = new lime.RoundedRect()
		.setAnchorPoint(0, 0)
		.setSize(fph.PROGRESS_WIDTH, fph.PROGRESS_HEIGHT)
		.setRadius(fph.PROGRESS_RADIUS)
		.setFill(new lime.fill.LinearGradient().addColorStop(0, '#4D4D4D').addColorStop(.49, '#6E6E6E').addColorStop(.5, '#878787').addColorStop(1, '#A3A3A3'))
		.setStroke(fph.PROGRESS_BORDER, fph.PROGRESS_BORDER_COLOR);
	this.appendChild(this.progressOutterRRect);

	this.curTime = 0;
	this.maxTime = 0;
	this.progressBarWidth = 0;

	this.progressBarRRect = new lime.RoundedRect()
		.setAnchorPoint(0, 0)
		.setSize(this.progressBarWidth, fph.PROGRESS_HEIGHT - fph.PROGRESS_BORDER * 2)
		.setPosition(fph.PROGRESS_BORDER, fph.PROGRESS_BORDER)
		.setFill(new lime.fill.LinearGradient().addColorStop(0, '#84FF00').addColorStop(.49, '#78E800').addColorStop(.5, '#70D900').addColorStop(1, '#62be00'));
	this.appendChild(this.progressBarRRect);

	this.remainTimeLabel = new lime.Label()
		.setAnchorPoint(0,.5)
		.setPosition(this.progressBarWidth / 2, fph.PROGRESS_HEIGHT / 2 - fph.PROGRESS_BORDER)
		.setText(this.curTime)
		.setFontSize(fph.PROGRESS_REMAINTIME_FONTSIZE)
		.setFontColor(fph.PROGRESS_REMAINTIME_FONTCOLOR)
		.setShadow('#363636',5,2,2);
	this.progressBarRRect.appendChild(this.remainTimeLabel);
};
goog.inherits(fph.ProgressLayer, lib.GameLayer);

/**
 * Initialize ProgressLayer
 * @reutrn
 */
fph.ProgressLayer.prototype.init = function () {
	this.setPosition(fph.PROGRESS_POS_X, fph.PROGRESS_POS_Y)
		.setOpacity(1);

	var gameTime = 200 * fph.RULE_SELECTED.level;
	this.curTime = gameTime;
	this.maxTime = gameTime;
	this.progressBarWidth = fph.PROGRESS_WIDTH - fph.PROGRESS_BORDER * 2;

	this.progressBarRRect.setSize(this.progressBarWidth, fph.PROGRESS_HEIGHT - fph.PROGRESS_BORDER * 2)
		.setFill(new lime.fill.LinearGradient().addColorStop(0, '#84FF00').addColorStop(.49, '#78E800').addColorStop(.5, '#70D900').addColorStop(1, '#62be00'));

	this.remainTimeLabel.setPosition(this.progressBarWidth / 2, fph.PROGRESS_HEIGHT / 2 - fph.PROGRESS_BORDER)
		.setText(this.curTime);

	lime.scheduleManager.scheduleWithDelay(this.decreaseTime, this, 100);
};

/**
 * ProgressLayer Events
 * @type {{TIME_OVER: string}}
 */
fph.ProgressLayer.Events = {
	TIME_OVER: 'time_over'
};

/**
 * Decrease game time and change progress.
 * @return
 */
fph.ProgressLayer.prototype.decreaseTime = function () {
	this.curTime --;
	this.remainTimeLabel.setText((parseInt(this.curTime/10) + 1).toString());

	if (this.curTime == this.maxTime / 2) {
		this.progressBarRRect.setFill(new lime.fill.LinearGradient().addColorStop(0, '#FBFF00').addColorStop(.49, '#E2E600').
			addColorStop(.5, '#D3D600').addColorStop(1, '#BCBF00'));
	}

	if (this.curTime == this.maxTime / 4) {
		this.progressBarRRect.setFill(new lime.fill.LinearGradient().addColorStop(0, '#FF2200').addColorStop(.49, '#E81F00').
			addColorStop(.5, '#D41C00').addColorStop(1, '#BA1900'));
	}

	if (this.curTime < 0) {
		this.remainTimeLabel.setText('');
		this.dispatchEvent(fph.ProgressLayer.Events.TIME_OVER);
	}

	var curWidth = this.progressBarWidth * this.curTime / this.maxTime;
	this.setProgress(curWidth);
};

/**
 * Set progress width.
 * @param {number} width progress width to be set
 * @return
 */
fph.ProgressLayer.prototype.setProgress = function(width) {
	this.progressBarRRect.runAction(new lime.animation.Resize(width, this.progressBarRRect.getSize().height).setDuration(.1));
};