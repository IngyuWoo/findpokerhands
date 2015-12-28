goog.provide('fph');

goog.require('lime.Director');

goog.require('fph.Controller.Game');
goog.require('fph.inc_size');
goog.require('fph.GameScene');

/**
 * Findcards start
 */
fph.start = function () {

	console.log('[' + Date() + '] START');

	fph.Controller.Game.loadImages();

	fph.director = new lime.Director(document.body, fph.DIRECTOR_WIDTH, fph.DIRECTOR_HEIGHT);
	fph.director.makeMobileWebAppCapable();

	fph.gameScene = new fph.GameScene();
	fph.gameScene.init();

	fph.director.replaceScene(fph.gameScene);
};
goog.exportSymbol('fph.start', fph.start);

/**
 * new game setup
 * @return
 */
fph.newGame = function () {
	if (fph.gameScene) {
		fph.gameScene.init();
	}
};