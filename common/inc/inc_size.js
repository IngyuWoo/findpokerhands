goog.provide('fph.inc_size');

// for Director Object
fph.DIRECTOR_WIDTH = 1110;
fph.DIRECTOR_HEIGHT = 1200;

// for ProgressLayer
fph.PROGRESS_POS_X = 100;
fph.PROGRESS_POS_Y = 50;
fph.PROGRESS_WIDTH = 910;
fph.PROGRESS_HEIGHT = 70;
fph.PROGRESS_RADIUS = 8;
fph.PROGRESS_BORDER = 3;
fph.PROGRESS_BORDER_COLOR = '#EFEFEF';

fph.PROGRESS_REMAINTIME_FONTSIZE = 40;
fph.PROGRESS_REMAINTIME_FONTCOLOR = '#FFFFFF';

// for BoardLayer
fph.BOARD_POS_X = 100;
fph.BOARD_POS_Y = fph.PROGRESS_POS_Y + fph.PROGRESS_HEIGHT + 50;
fph.BOARD_WIDTH = 910;
fph.BOARD_HEIGHT = 790;
fph.BOARD_COLOR = '#FFFFFF';
fph.BOARD_BORDER = 2;
fph.BOARD_BORDER_COLOR = '#DDDDDD';

// for CardLayer
fph.CARD_GAP = 10;
fph.CARD_WIDTH = 90;
fph.CARD_HEIGHT = 120;

// for SlotLayer
fph.SLOT_WIDTH = fph.CARD_GAP + (fph.CARD_WIDTH + fph.CARD_GAP) * 5;
fph.SLOT_HEIGHT = fph.CARD_HEIGHT + fph.CARD_GAP * 2;
fph.SLOT_POS_X = 100 + fph.BOARD_WIDTH / 2 - fph.SLOT_WIDTH / 2;
fph.SLOT_POS_Y = fph.BOARD_POS_Y + fph.BOARD_HEIGHT + 50;
fph.SLOT_COLOR = '#FFFFFF';
fph.SLOT_BORDER = 5;
fph.SLOT_BORDER_COLOR = '#000000';

// for RuleLayer
fph.RULE_WIDTH = fph.SLOT_WIDTH;
fph.RULE_HEIGHT = fph.SLOT_HEIGHT;
fph.RULE_POS_X = fph.SLOT_POS_X;
fph.RULE_POS_Y = fph.SLOT_POS_Y;

fph.RULE_LABEL_POS_X = fph.RULE_WIDTH / 2;
fph.RULE_LABEL_POS_Y = fph.RULE_HEIGHT / 2;
fph.RULE_LABEL_FONTSIZE = 55;

// for PopupLayer
fph.POPUP_POS_X = fph.DIRECTOR_WIDTH / 2;
fph.POPUP_POS_Y = fph.DIRECTOR_HEIGHT / 2;
fph.POPUP_WIDTH = 580;
fph.POPUP_HEIGHT = 450;
fph.POPUP_RADIUS = 40;
fph.POPUP_COLOR = '#000000';
fph.POPUP_OPACITY = 0.7;

fph.POPUP_RRECT_POS_X = 0;
fph.POPUP_RRECT_POS_Y = -100;
fph.POPUP_RRECT_FONTSIZE = 100;
fph.POPUP_RRECT_FONTCOLOR = '#FFFFFF';

fph.POPUP_GBUTTON_POS_X = fph.POPUP_RRECT_POS_X;
fph.POPUP_GBUTTON_POS_Y = 100;
fph.POPUP_GBUTTON_WIDTH = 170;
fph.POPUP_GBUTTON_HEIGHT = 100;
fph.POPUP_GBUTTON_TEXT = 'Retry';
fph.POPUP_GBUTTON_FONTSIZE = 30;


// for CountLayer
fph.COUNT_POS_X = fph.RULE_POS_X;
fph.COUNT_POS_Y = fph.RULE_POS_Y;
fph.COUNT_LABEL_POS_X = fph.RULE_LABEL_POS_X + 370;
fph.COUNT_LABEL_POS_Y = fph.RULE_LABEL_POS_Y;
fph.COUNT_LABEL_FONTSIZE = 80;
