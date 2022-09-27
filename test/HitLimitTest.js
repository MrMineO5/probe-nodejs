const assert = require('assert');
const TestUtils = require("./TestUtils.js");

module.exports = function () {
    function hitLimit() {
        TestUtils.addLineLabel("done", () => TestUtils.getLineNumber())
    }

    it('add live breakpoint', async function () {
        hitLimit() //setup labels

        await TestUtils.addLiveBreakpoint({
            "source": TestUtils.getFilename()(),
            "line": TestUtils.getLineLabelNumber("done")
        }, null, 1).then(function (res) {
            assert.equal(res.status, 200);
            hitLimit(); //trigger breakpoint
        }).catch(function (err) {
            assert.fail(err)
        });
    });

    it('verify breakpoint removed', async function () {
        this.timeout(4000)
        let event = await TestUtils.awaitMarkerEvent("BREAKPOINT_REMOVED");
        assert.notEqual(event, null);
    });
};