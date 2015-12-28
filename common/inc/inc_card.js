goog.provide('fph.inc_card');


// Card image path
fph.CARD_IMAGE_BACK = 'assets/Back_Pc.png';
fph.CARD_IMAGE_MINE = 'assets/mine2.jpg';

// define card kind
fph.CARD_CLOVER = 'c';
fph.CARD_DIAMOND = 'd';
fph.CARD_HEART = 'h';
fph.CARD_SPADE = 's';
fph.CARD_MINE = 'm';

// define default cards array
fph.CARDS_ORDERED =  [
	{kind : fph.CARD_CLOVER, number : 1}, {kind : fph.CARD_CLOVER, number : 2}, {kind : fph.CARD_CLOVER, number : 3}, {kind : fph.CARD_CLOVER, number : 4}, {kind : fph.CARD_CLOVER, number : 5}, {kind : fph.CARD_CLOVER, number : 6}, {kind : fph.CARD_CLOVER, number : 7}, {kind : fph.CARD_CLOVER, number : 8}, {kind : fph.CARD_CLOVER, number : 9}, {kind : fph.CARD_CLOVER, number : 10}, {kind : fph.CARD_CLOVER, number : 11}, {kind : fph.CARD_CLOVER, number : 12}, {kind : fph.CARD_CLOVER, number : 13},
	{kind : fph.CARD_DIAMOND, number : 1}, {kind : fph.CARD_DIAMOND, number : 2}, {kind : fph.CARD_DIAMOND, number : 3}, {kind : fph.CARD_DIAMOND, number : 4}, {kind : fph.CARD_DIAMOND, number : 5}, {kind : fph.CARD_DIAMOND, number : 6}, {kind : fph.CARD_DIAMOND, number : 7}, {kind : fph.CARD_DIAMOND, number : 8}, {kind : fph.CARD_DIAMOND, number : 9}, {kind : fph.CARD_DIAMOND, number : 10}, {kind : fph.CARD_DIAMOND, number : 11}, {kind : fph.CARD_DIAMOND, number : 12}, {kind : fph.CARD_DIAMOND, number : 13},
	{kind : fph.CARD_HEART, number : 1}, {kind : fph.CARD_HEART, number : 2}, {kind : fph.CARD_HEART, number : 3}, {kind : fph.CARD_HEART, number : 4}, {kind : fph.CARD_HEART, number : 5}, {kind : fph.CARD_HEART, number : 6}, {kind : fph.CARD_HEART, number : 7}, {kind : fph.CARD_HEART, number : 8}, {kind : fph.CARD_HEART, number : 9}, {kind : fph.CARD_HEART, number : 10}, {kind : fph.CARD_HEART, number : 11}, {kind : fph.CARD_HEART, number : 12}, {kind : fph.CARD_HEART, number : 13},
	{kind : fph.CARD_SPADE, number : 1}, {kind : fph.CARD_SPADE, number : 2}, {kind : fph.CARD_SPADE, number : 3}, {kind : fph.CARD_SPADE, number : 4}, {kind : fph.CARD_SPADE, number : 5}, {kind : fph.CARD_SPADE, number : 6}, {kind : fph.CARD_SPADE, number : 7}, {kind : fph.CARD_SPADE, number : 8}, {kind : fph.CARD_SPADE, number : 9}, {kind : fph.CARD_SPADE, number : 10}, {kind : fph.CARD_SPADE, number : 11}, {kind : fph.CARD_SPADE, number : 12}, {kind : fph.CARD_SPADE, number : 13},
	{kind : fph.CARD_MINE, number : 0}, {kind : fph.CARD_MINE, number : 0}
];

// define cards array for the game play
fph.CARDS_SHUFFLED = [];