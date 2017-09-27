var testsContext = require.context("./test", true, /-test$/);
testsContext.keys().forEach(testsContext);