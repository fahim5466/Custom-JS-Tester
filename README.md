# tme
This is a hand-written minimalist JS testing framework.

How to run:
- Navigate to your JS project directory and run 'tme' command from cmd. The tester will recursively search your entire project and run all test files ending with '.test.js'.
- The test results will be shown in the command line. 'chalk' is used to format the output and display a good-looking test report.

How to write tests:
- You can use 'beforeEach' and 'it'. The behavior is the same as in other testing frameworks.
- You can pass a html file to the 'render' method. The project will use 'jsdom' to generate a dom object which you can use to test anything dom related. For example: testing that a button click shows/hides a div element, etc.

![tme](https://github.com/fahim5466/Custom-JS-Tester/assets/41055243/6d8e6b73-107c-4c99-97c6-6a21a1966653)


