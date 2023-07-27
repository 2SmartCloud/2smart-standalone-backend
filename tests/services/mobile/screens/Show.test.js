const ScreensShow                              = require('../../../../lib/services/mobile/screens/Show');
const ValidationException                      = require('../../../../lib/utils/errors/ValidationException');
const ForbiddenException                       = require('../../../../lib/utils/errors/ForbiddenException');
const { sequelize }                            = require('../../../../lib/sequelize');
const TestFactory                              = require('../../../utils');
const { fillScreens, fillWidgets, fillTopics } = require('../../../utils/fillDatabase');
const screens                                  = require('../../../fixtures/screens');
const widgets                                  = require('../../../fixtures/widgets');
const topics                                   = require('../../../fixtures/topics');
const {
    validation : { NOT_FOUND },
    forbidden  : { PERMISSION_DENIED }
} = require('../../../../lib/utils/errors/codes');

const Screens = sequelize.model('Screens');

const factory = new TestFactory();
const user = { id: 1 };

const TEST_TIMEOUT = 10000;

jest.setTimeout(TEST_TIMEOUT);

describe('mobile: screens/Show service', () => {
    beforeAll(async () => {
        await factory.cleanup();

        await fillScreens();
        await fillWidgets();
        await fillTopics();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully return info for a screen without parent control', async () => {
        const [ screen ] = screens;

        const screenWidgets = widgets.filter(widget => widget.screenId === screen.id);
        const layoutSortedByCoordinates = screen.layout.lg ?
            Screens.sortLayoutByCoordinates(screen.layout.lg) :
            [];
        const widgetsFromLayout = layoutSortedByCoordinates.reduce((acc, { i }) => {
            const widget = screenWidgets.find(screenWidget => screenWidget.id === +i);

            return widget ? [ ...acc, widget ] : acc;
        }, []);
        const restWidgets = screenWidgets.filter(widget => !widgetsFromLayout.includes(widget));
        const allWidgets = [ ...widgetsFromLayout, ...restWidgets ];

        const expectedScreen = {
            id      : screen.id,
            title   : screen.name,
            widgets : allWidgets
                .map(widget => ({
                    id     : `${widget.id}`,
                    topics : topics
                        .filter(topic => topic.widgetId === widget.id)
                        .map(({ topic }) => topic),
                    type     : widget.type,
                    name     : widget.name,
                    advanced : widget.advanced
                })),
            parentControl : screen.parentControl
        };
        const result = await new ScreensShow({ context: { userId: user.id } }).run({ id: screen.id });

        expect(result.status).toBe(1);
        expect(result.data).toMatchObject(expectedScreen);
    });

    test('NEGATIVE: should throw an error on non-existent screen', async () => {
        try {
            const nonExistentId = 9999;

            await new ScreensShow({ context: { userId: user.id } }).run({ id: nonExistentId });
        } catch (err) {
            expect(err).toBeInstanceOf(ValidationException);
            expect(err.code).toEqual(NOT_FOUND);
        }
    });

    test('NEGATIVE: should throw an error when secure mode is enabled,' +
         'screen has enabled parent control and there is no pin provided', async () => {
        try {
            const screenWithEnabledParentControl = screens.find(screen => screen.parentControl);

            await new ScreensShow({ context: { userId: user.id } })
                .run({ id: screenWithEnabledParentControl.id });
        } catch (err) {
            console.log({ err });
            expect(err).toBeInstanceOf(ForbiddenException);
            expect(err.code).toEqual(PERMISSION_DENIED);
        }
    });
});
