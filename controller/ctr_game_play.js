goog.provide('fph.Controller.Game.Play');


fph.Controller.Game.Play.isClickable = function () {
	return fph.gameScene.gameLayer.isClickable;
};


fph.Controller.Game.Play.setClickable = function (bool) {
	return fph.gameScene.gameLayer.isClickable = bool;
};


fph.Controller.Game.Play.addCardIntoSlot = function (index) {
	fph.gameScene.gameLayer.slotLayer.addCard(index);
};


fph.Controller.Game.Play.OnFlipCard = function (e) {
	fph.gameScene.gameLayer.countLayer.setCount(fph.gameScene.gameLayer.slotLayer.flippedCardCnt);

	// last card index check is necessary
	if (fph.Controller.Game.Play.isLastCardClicked() && this.cardIndex == fph.gameScene.gameLayer.slotLayer.slots[fph.gameScene.gameLayer.slotLayer.slots.length-1]) {
		if (fph.Controller.Game.Play.isMine(this.cardIndex)) {
			fph.Controller.Game.OnGameLose();
			return;
		}

		if (fph.Controller.Game.Play.isRuleCorrect()) {//--common, board
			fph.Controller.Game.OnGameWin();
		}
		else {
			// unflip cards selected.
			fph.Controller.Game.Play.unflipCards();
		}
	}
	else {
		if (fph.Controller.Game.Play.isMine(this.cardIndex)) {
			fph.Controller.Game.OnGameLose();
		}
		else {
			fph.Controller.Game.Play.setClickable(true);
		}
	}
};


fph.Controller.Game.Play.OnUnflipCard = function (e) {
	fph.gameScene.gameLayer.countLayer.setCount(fph.gameScene.gameLayer.slotLayer.flippedCardCnt);
	fph.Controller.Game.Play.setClickable(true);
};


fph.Controller.Game.Play.isLastCardClicked = function () {
	if (fph.gameScene.gameLayer.slotLayer.flippedCardCnt == fph.RULE_SELECTED.minCardCnt) return true;

	return false;
};


fph.Controller.Game.Play.isMine = function (index) {
	if (fph.CARDS_SHUFFLED[index].kind == fph.CARD_MINE) return true;
	return false;
};


fph.Controller.Game.Play.isRuleCorrect = function () {
	var isCorrect = false;
	switch (fph.RULE_SELECTED.name) {
		case fph.RuleNameEnum.ONE_PAIR:
			isCorrect = fph.Controller.Game.Play.isOnePair();
			break;
		case fph.RuleNameEnum.TWO_PAIR:
			isCorrect = fph.Controller.Game.Play.isTwoPair();
			break;
		case fph.RuleNameEnum.THREE_OF_A_KIND:
			isCorrect = fph.Controller.Game.Play.isThreeOfAKind();
			break;
		case fph.RuleNameEnum.STRAIGHT:
			isCorrect = fph.Controller.Game.Play.isStraight();
			break;
		case fph.RuleNameEnum.FLUSH:
			isCorrect = fph.Controller.Game.Play.isFlush();
			break;
		case fph.RuleNameEnum.FULL_HOUSE:
			isCorrect = fph.Controller.Game.Play.isFullHouse();
			break;
		case fph.RuleNameEnum.FOUR_OF_A_KIND:
			isCorrect = fph.Controller.Game.Play.isFourOfAKind();
			break;
		case fph.RuleNameEnum.STRAIGHT_FLUSH:
			isCorrect = fph.Controller.Game.Play.isStraightFlush();
			break;
		case fph.RuleNameEnum.ROYAL_FLUSH:
			isCorrect = fph.Controller.Game.Play.isRoyalFlush();
			break;
	}

	if (isCorrect) {
		console.log(fph.RULE_SELECTED.name + ' correct');
	} else {
		console.log(fph.RULE_SELECTED.name + ' incorrect');
	}

	return isCorrect;
};


fph.Controller.Game.Play.isOnePair = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 2) {
		if (fph.CARDS_SHUFFLED[slots[0]].number == fph.CARDS_SHUFFLED[slots[1]].number) {
			console.log('One pair satisfied !!');
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
		return false;
	}
};


fph.Controller.Game.Play.isTwoPair = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 4) {
		var numbers = fph.Controller.Game.Play.getCardNumbersAcd(slots);

		if (numbers[0] == numbers[1] &&
			numbers[2] == numbers[3]) {
			console.log('Two pair satisfied !!');
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
		return false;
	}
};


fph.Controller.Game.Play.isThreeOfAKind = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 3) {
		if (fph.CARDS_SHUFFLED[slots[0]].number == fph.CARDS_SHUFFLED[slots[1]].number &&
			fph.CARDS_SHUFFLED[slots[1]].number == fph.CARDS_SHUFFLED[slots[2]].number) {
			console.log('Three of a kind satisfied !!');
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
	}
};


fph.Controller.Game.Play.isStraight = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 5) {
		var numbers = fph.Controller.Game.Play.getCardNumbersAcd(slots);

		if (numbers[0] == 1) {
			if (numbers[1] == 2 &&
				numbers[2] == 3 &&
				numbers[3] == 4 &&
				numbers[4] == 5) {
				console.log('Straight satisfied !!');
				return true;
			}
			else if (numbers[1] == 2 &&//-- remove
				numbers[2] == 3 &&
				numbers[3] == 4 &&
				numbers[4] == 13) {
				console.log('Straight satisfied !!');
				return true;
			}
			else if (numbers[1] == 2 &&
				numbers[2] == 3 &&
				numbers[3] == 12 &&
				numbers[4] == 13) {
				console.log('Straight satisfied !!');
				return true;
			}
			else if (numbers[1] == 2 &&
				numbers[2] == 11 &&
				numbers[3] == 12 &&
				numbers[4] == 13) {
				console.log('Straight satisfied !!');
				return true;
			}
			else if (numbers[1] == 10 &&
				numbers[2] == 11 &&
				numbers[3] == 12 &&
				numbers[4] == 13) {
				console.log('Straight satisfied !!');
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if (numbers[2] == (numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4]) / 5) {
				console.log('Straight satisfied !!');
				return true;
			}
			else {
				return false;
			}
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
		return false;
	}
};


fph.Controller.Game.Play.isFlush = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 5) {
		if (fph.CARDS_SHUFFLED[slots[0]].kind == fph.CARDS_SHUFFLED[slots[1]].kind &&
			fph.CARDS_SHUFFLED[slots[1]].kind == fph.CARDS_SHUFFLED[slots[2]].kind &&
			fph.CARDS_SHUFFLED[slots[2]].kind == fph.CARDS_SHUFFLED[slots[3]].kind &&
			fph.CARDS_SHUFFLED[slots[3]].kind == fph.CARDS_SHUFFLED[slots[4]].kind) {
			console.log('Flush satisfied !!');
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
	}
};


fph.Controller.Game.Play.isFullHouse = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 5) {
		var numbers = fph.Controller.Game.Play.getCardNumbersAcd(slots);

		if (numbers[0] == numbers[1] &&
			numbers[1] == numbers[2] &&
			numbers[3] == numbers[4]) {
			console.log('Full house satisfied !!');
			return true;
		}
		else if (numbers[0] == numbers[1] &&
			numbers[2] == numbers[3] &&
			numbers[3] == numbers[4]) {
			console.log('Full house satisfied !!');
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
		return false;
	}
};


fph.Controller.Game.Play.isFourOfAKind = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 4) {
		if (fph.CARDS_SHUFFLED[slots[0]].number == fph.CARDS_SHUFFLED[slots[1]].number &&
			fph.CARDS_SHUFFLED[slots[1]].number == fph.CARDS_SHUFFLED[slots[2]].number &&
			fph.CARDS_SHUFFLED[slots[2]].number == fph.CARDS_SHUFFLED[slots[3]].number) {
			console.log('Four of a kind satisfied !!');
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
	}
};


fph.Controller.Game.Play.isStraightFlush = function () {
	if (fph.Controller.Game.Play.isFlush() && fph.Controller.Game.Play.isStraight()) {
		console.log('Straight Flush satisfied !!');
		return true;
	}
	else {
		return false;
	}
};


fph.Controller.Game.Play.isRoyalFlush = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	if (slots.length == 5) {
		if (fph.Controller.Game.Play.isFlush()) {
			var numbers = fph.Controller.Game.Play.getCardNumbersAcd(slots);

			if (numbers[0] == 1 &&
				numbers[1] == 10 &&
				numbers[2] == 11 &&
				numbers[3] == 12 &&
				numbers[4] == 13) {
				console.log('Royal Flush satisfied !!');
				return true;
			}
			else {
				return false;
			}
		}
		else {
				return false;
		}
	}
	else {
		console.log('slots.length error [' + slots.length + ']');
	}
};


fph.Controller.Game.Play.getCardNumbersAcd = function (slots) {
	var numbersAcd = new Array(slots.length);
	for (var index = 0; index < slots.length; index++) {
		numbersAcd[index] = fph.CARDS_SHUFFLED[slots[index]].number;
	}
	numbersAcd.sort(function (lowest, highest) {return lowest - highest}); // accending

	return numbersAcd;
};


fph.Controller.Game.Play.unflipCards = function () {
	var slots = fph.gameScene.gameLayer.slotLayer.slots;

	for (var index = 0; index < slots.length; index++) {
		var cardIndex = slots[index];
		if (cardIndex >= 0 && cardIndex < fph.CARDS_ORDERED.length) {
			var card = fph.gameScene.gameLayer.boardLayer.cards[cardIndex];
			card.unflip();
		}
	}

	if (fph.gameScene.gameLayer.slotLayer.flippedCardCnt == fph.RULE_SELECTED.minCardCnt) fph.gameScene.gameLayer.slotLayer.flippedCardCnt = 0;
};

