/*
import type {
  FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default MyReporter;
*/

//write similar code but using export default
// Path: playwright_may17/my-awesome-reporter.js
export default class MyReporter {
  onBegin(config, suite) {
    console.log(`====================================================== `);
    console.log(`Starting the run with: ${suite.allTests().length} tests`);
    console.log(`======================================================`);
  }

  onTestBegin(test) {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test: ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    console.log(`======================================================`);
    console.log(`Finished the run: ${result.status}`);
    console.log(`======================================================`);
  }
}

/*
class MyReporter {
  onBegin(config, suite) {
    console.log(`====================================================== `);
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    console.log(`======================================================`);
  }

  onTestBegin(test) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    console.log(`======================================================`);
    console.log(`Finished the run: ${result.status}`);
    console.log(`======================================================`);
  }
}

module.exports = MyReporter;
*/
