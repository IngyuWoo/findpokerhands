goog.provide('fph.inc_rule');


fph.RuleNameEnum = {
	ONE_PAIR:        'One pair',
	TWO_PAIR:        'Two pair',
	THREE_OF_A_KIND: 'Three of a kind',
	STRAIGHT:        'Straight',
	FLUSH:           'Flush',
	FULL_HOUSE:      'Full house',
	FOUR_OF_A_KIND:  'Four of a kind',
	STRAIGHT_FLUSH:  'Straight flush',
	ROYAL_FLUSH:     'Royal flush'
};


fph.RULES_ORDERED = [
	{name : fph.RuleNameEnum.ONE_PAIR,        minCardCnt : 2, level: 1},
	{name : fph.RuleNameEnum.TWO_PAIR,        minCardCnt : 4, level: 2},
	{name : fph.RuleNameEnum.THREE_OF_A_KIND, minCardCnt : 3, level: 3},
	{name : fph.RuleNameEnum.STRAIGHT,        minCardCnt : 5, level: 4},
	{name : fph.RuleNameEnum.FLUSH,           minCardCnt : 5, level: 5},
	{name : fph.RuleNameEnum.FULL_HOUSE,      minCardCnt : 5, level: 6},
	{name : fph.RuleNameEnum.FOUR_OF_A_KIND,  minCardCnt : 4, level: 7},
	{name : fph.RuleNameEnum.STRAIGHT_FLUSH,  minCardCnt : 5, level: 8},
	{name : fph.RuleNameEnum.ROYAL_FLUSH,     minCardCnt : 5, level: 9}
];


fph.RULE_SELECTED = null;