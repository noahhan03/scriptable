// Thanks @Unlearn for fixing bug where too much 
// memory resources were being used by the widget

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
// Compare local calendar dates in UTC so daylight-saving changes cannot shift a day.
const START_OF_YEAR = Date.UTC(CURRENT_YEAR, 0, 1);
const TODAY = Date.UTC(CURRENT_YEAR, NOW.getMonth(), NOW.getDate());
const DAY_OF_YEAR = Math.floor((TODAY - START_OF_YEAR) / 86400000) + 1;
const IS_LEAP_YEAR = CURRENT_YEAR % 4 === 0 && (CURRENT_YEAR % 100 !== 0 || CURRENT_YEAR % 400 === 0);
const DAYS_IN_YEAR = IS_LEAP_YEAR ? 366 : 365;

const widget = new ListWidget();
widget.backgroundColor = new Color("#000000");

const PADDING_TOP_BOTTOM = 36;
const PADDING_LEFT_RIGHT = 26;
const CIRCLE_SIZE = 5;
const CIRCLE_SPACING = 9;
const TEXT_SPACING = 20;
const WIDGET_SIZE = 360;
const AVAILABLE_SPACE = WIDGET_SIZE - (2 * PADDING_LEFT_RIGHT);
const TOTAL_CIRCLE_SIZE = CIRCLE_SIZE + CIRCLE_SPACING;
const COLUMNS = Math.floor(AVAILABLE_SPACE / TOTAL_CIRCLE_SIZE);
const ROWS = Math.ceil(DAYS_IN_YEAR / COLUMNS);

const COLOR_FILLED = new Color("#ffffff");
const COLOR_UNFILLED = new Color("#ffffff", 0.4);

widget.setPadding(PADDING_TOP_BOTTOM, PADDING_LEFT_RIGHT, PADDING_TOP_BOTTOM, PADDING_LEFT_RIGHT);

const gridStack = widget.addStack();
gridStack.layoutVertically();
gridStack.spacing = CIRCLE_SPACING;

const circleFont = Font.systemFont(CIRCLE_SIZE);

for (let row = 0; row < ROWS; row++) {
  const rowStack = gridStack.addStack();
  rowStack.layoutHorizontally();
  rowStack.spacing = CIRCLE_SPACING;

  for (let col = 0; col < COLUMNS; col++) {
    const day = row * COLUMNS + col + 1;
    if (day > DAYS_IN_YEAR) break;

    const circleText = rowStack.addText("●");
    circleText.font = circleFont;
    circleText.lineLimit = 1;
    circleText.textColor = day <= DAY_OF_YEAR ? COLOR_FILLED : COLOR_UNFILLED;
  }
}

widget.addSpacer(TEXT_SPACING);

widget.addSpacer(20)
const font = new Font("Menlo", 14)
const textRow = widget.addStack();
textRow.spacing = 10;
textRow.layoutHorizontally();

const yearText = textRow.addText(CURRENT_YEAR.toString())
yearText.font = font
yearText.textColor = COLOR_FILLED;
textRow.addSpacer()

const daysLeftGroup = textRow.addStack()
daysLeftGroup.layoutHorizontally()

// Today is already filled in the grid; count only the days after today.
const nDaysLeft = daysLeftGroup.addText((DAYS_IN_YEAR - DAY_OF_YEAR).toString())
nDaysLeft.font = font
nDaysLeft.textColor = COLOR_FILLED;

const daysLeft = daysLeftGroup.addText(" days left")
daysLeft.font = font
daysLeft.textColor = new Color("#ffffff", 0.4)


if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentLarge();
}
Script.complete();
