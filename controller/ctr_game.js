goog.provide('fph.Controller.Game');

goog.require('lime.SpriteSheet');
goog.require('lime.ASSETS.Poker_Card_Clover_Pc.json');
goog.require('lime.ASSETS.Poker_Card_Diamond_Pc.json');
goog.require('lime.ASSETS.Poker_Card_Heart_Pc.json');
goog.require('lime.ASSETS.Poker_Card_Spade_Pc.json');
goog.require('lime.parser.JSON');
goog.require('lime.animation.FadeTo');


goog.require('fph.inc_card');
goog.require('fph.inc_rule');

goog.require('fph.Controller.Game.Play');
goog.require('fph.PopupLayer');

/**
 * Load card images
 * @return
 */
fph.Controller.Game.loadImages = function () {
	fph.Poker_Card_Clover_Pc = new lime.SpriteSheet('assets/Poker_Card_Clover_Pc.png', lime.ASSETS.Poker_Card_Clover_Pc.json, lime.parser.JSON);
	fph.Poker_Card_Diamond_Pc = new lime.SpriteSheet('assets/Poker_Card_Diamond_Pc.png', lime.ASSETS.Poker_Card_Diamond_Pc.json, lime.parser.JSON);
	fph.Poker_Card_Heart_Pc = new lime.SpriteSheet('assets/Poker_Card_Heart_Pc.png', lime.ASSETS.Poker_Card_Heart_Pc.json, lime.parser.JSON);
	fph.Poker_Card_Spade_Pc = new lime.SpriteSheet('assets/Poker_Card_Spade_Pc.png', lime.ASSETS.Poker_Card_Spade_Pc.json, lime.parser.JSON);
};

/**
 * Get card front image
 * @param {number} cardIndex
 * @returns {string}
 */
fph.Controller.Game.getFrontImage = function (cardIndex) {
	var frontImage = '';
	var card = fph.CARDS_SHUFFLED[cardIndex];
	switch (card.kind) {
		case fph.CARD_CLOVER :
			frontImage = fph.Poker_Card_Clover_Pc.getFrame(card.number);
			break;
		case fph.CARD_DIAMOND :
			frontImage = fph.Poker_Card_Diamond_Pc.getFrame(card.number);
			break;
		case fph.CARD_HEART :
			frontImage = fph.Poker_Card_Heart_Pc.getFrame(card.number);
			break;
		case fph.CARD_SPADE :
			frontImage = fph.Poker_Card_Spade_Pc.getFrame(card.number);
			break;
		case fph.CARD_MINE :
			frontImage = fph.CARD_IMAGE_MINE;
			break;
	}
	return frontImage;
};


/**
 * Initialize game data, shuffled card array and selected rule
 * @return
 */
fph.Controller.Game.initGameData = function () {
	// shuffle cards
	fph.CARDS_SHUFFLED = fph.Controller.Game.shuffleArray(fph.CARDS_ORDERED);
	//fph.CARDS_SHUFFLED = fph.CARDS_ORDERED.slice(0);//-- for test

	// select a card rule
	fph.RULE_SELECTED = fph.RULES_ORDERED[Math.floor(Math.random() * fph.RULES_ORDERED.length)];
};


/**
 * Shuffle an array.
 * @param orgArray
 * @returns {Array}
 */
fph.Controller.Game.shuffleArray = function (orgArray) {
	// clone original array.
	var orgArrayCloned = orgArray.slice(0);

	var orArrayLength = orgArrayCloned.length;
	var returnArray = new Array(orArrayLength);

	for(var i = 0; i < orArrayLength; i++) {
		var curLength = orgArrayCloned.length;
		var idxSelected = Math.floor(Math.random() * curLength);
		returnArray[i] = orgArrayCloned[idxSelected];

		orgArrayCloned.splice(idxSelected, 1);
	}

	return returnArray;
};

/**
 * Set selected rule name
 * @return
 */
fph.Controller.Game.setRuleName = function () {
	fph.gameScene.gameLayer.ruleLayer.setRuleName(fph.RULE_SELECTED.name);
};

/**
 * Release card events and progress schedule
 * @return
 */
fph.Controller.Game.releaseEventsNSchd = function () {
	// unschedule timer
	lime.scheduleManager.unschedule(fph.gameScene.gameLayer.progressLayer.decreaseTime, fph.gameScene.gameLayer.progressLayer);

	// unlisten card press event
	fph.gameScene.gameLayer.boardLayer.removeCardEvents();
}

/**
 * Process 'game lose'
 * @return
 */
fph.Controller.Game.OnGameLose = function () {
	fph.Controller.Game.releaseEventsNSchd();

	// show lose animation
	fph.Controller.Game.hideNDimLayers();

	// show lose dialog
	fph.Controller.Game.showLosePopup();
};

/**
 * Hide RuleLayer and CountLayer and Dim ProgressLayer, BoardLayer, and SlotLayer
 * @return
 */
fph.Controller.Game.hideNDimLayers = function () {
	fph.gameScene.gameLayer.ruleLayer.hide();
	fph.gameScene.gameLayer.countLayer.hide();

	fph.gameScene.gameLayer.fadeToAnim = new lime.animation.FadeTo(0.1).setDuration(10).setEasing(lime.animation.Easing.EASEINOUT);
	fph.gameScene.gameLayer.progressLayer.runAction(fph.gameScene.gameLayer.fadeToAnim);
	fph.gameScene.gameLayer.boardLayer.runAction(fph.gameScene.gameLayer.fadeToAnim);
	fph.gameScene.gameLayer.slotLayer.runAction(fph.gameScene.gameLayer.fadeToAnim);
};

/**
 * Show 'Lose' PopupLayer
 */
fph.Controller.Game.showLosePopup = function () {
	fph.gameScene.gameLayer.popupLayer = new fph.PopupLayer();
	fph.gameScene.gameLayer.appendChild(fph.gameScene.gameLayer.popupLayer);
	fph.gameScene.gameLayer.popupLayer.init('You Lose');
};

/**
 * Process 'Game Win'
 * @return
 */
fph.Controller.Game.OnGameWin = function () {
	fph.Controller.Game.releaseEventsNSchd();

	// show win animation
	fph.gameScene.gameLayer.slotLayer.show();
	var slots = fph.gameScene.gameLayer.slotLayer.slots;
	for (var slotIndex = 0; slotIndex < slots.length; slotIndex ++) {
		var card = fph.gameScene.gameLayer.boardLayer.cards[slots[slotIndex]];
		fph.gameScene.gameLayer.slotLayer.moveCard(card);
	}
	fph.Controller.Game.hideNDimLayers();//--and

	// show lose dialog
	fph.Controller.Game.showWinPopup();
};

/**
 * Show 'Win' PopupLayer
 * @return
 */
fph.Controller.Game.showWinPopup = function () {
	fph.gameScene.gameLayer.popupLayer = new fph.PopupLayer();
	fph.gameScene.gameLayer.appendChild(fph.gameScene.gameLayer.popupLayer);
	fph.gameScene.gameLayer.popupLayer.init("You Win !");
};

/**
 * This is called when 'Retry' button is called
 * @return
 */
fph.Controller.Game.newGame = function () {
	fph.gameScene.gameLayer.fadeToAnim.stop();
	fph.newGame();
};