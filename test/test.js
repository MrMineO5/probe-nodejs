const TestUtils = require("./TestUtils");

before(TestUtils.setupProbe);
after(TestUtils.teardownProbe);

describe("test simple primitives", require("./SimplePrimitivesLiveInstrumentTest"));
describe("test simple collections", require("./SimpleCollectionsLiveInstrumentTest"));