# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [5.1.4] - 2022-08-09
Fix sign in button xpath

## [5.1.3] - 2022-08-09
Disable Edge browser

## [5.1.2] - 2022-08-08
Implemented QAREGR-T48 - Search: Sold out item; Fixed Regression related ESLint errors;

## [5.1.1] - 2022-08-08
Bugfix - sign in

## [5.1.0] - 2022-08-05
Add ForeSee opt out test

## [5.0.27] - 2022-08-04
Implemented QAREGR-T46 - Search: Sorting of available stores in change location screen;

## [5.0.26] - 2022-08-04
Implemented QAREGR-T113 - Search: Pagination;

## [5.0.25] - 2022-08-02
Implemented QAREGR-T99 - SEO content block;

## [5.0.24] - 2022-08-02
Implemented QAREGR-T43 - Search: BOPUS Non-LME Toggle ON/OFF

## [5.0.23] - 2022-07-29
Use Firefox latest version

## [5.0.22] - 2022-07-29
Update andriod device to `Samsung Galaxy S22`

## [5.0.21] - 2022-07-26
Upgrade Firefox version

## [5.0.20] - 2022-07-22
Disable retries for logging purposes

## [5.0.19] - 2022-07-20
Enable logging for monitoring tests

## [5.0.18] - 2022-07-20
Implemented QAREGR-T104 - Sorting query in URL;

## [5.0.17] - 2022-07-20
Implemented QAREGR-T38 - Search: Recent searches list;

## [5.0.16] - 2022-07-19
Implemented QAREGR-T17 - Search: E-gift card;

## [5.0.15] - 2022-07-13
npm update

## [5.0.14] - 2022-07-12
Implemented QAREGR-T14 - Search: UI validation;

## [5.0.13] - 2022-07-12
Implemented QAREGR-T12 - Search: Searching 11th item;

## [5.0.12] - 2022-07-05
Implemented QAREGR-T2 - Search: Content header;

## [5.0.11] - 2022-06-29
Make test hooks async

## [5.0.10] - 2022-06-27
Implemented QAREGR-T103 - "Search: Product count should persist" scenario;

## [5.0.9] - 2022-06-23
Fix Sign-In test

## [5.0.8] - 2022-06-20
Implemented QAREGR-T133 - "Selecting Breadcrumb Node" scenario;

## [5.0.7] - 2022-06-10
Increase parallels to 20
Fix reporting

## [5.0.6] - 2022-06-10
Remove add-to-wishlist-authenticated from L2

## [5.0.5] - 2022-06-09
Remove my-account from L2

## [5.0.4] - 2022-06-06
Implemented QAREGR-T116 - "Search: Null Results" scenario;

## [5.0.3] - 2022-05-31
Implemented QAREGR-T1(When searching for 'boots') scenario on iPhone and Android;

## [5.0.2] - 2022-05-08
Fix test reporting file names for retry

## [5.0.1] - 2022-05-06
Fix test reporting

## [5.0.0] - 2022-05-05
RFX-6453 Refactor WDIO test framework and CI

## [4.0.5] - 2022-04-15
Fix post results

## [4.0.4] - 2022-04-15
Ignore scripts in npm ci

## [4.0.3] - 2022-04-15
Register to artifactory in jobs

## [4.0.2] - 2022-04-15
Fix pipeline jobs

## [4.0.1] - 2022-03-18
- Implemented "I do my search and get some results" scenario;
- Implemented "I sort my result by newest"; 
- Added Timeline reporter

## [4.0.0] - 2022-3-10
- Install npm modules to docker image

## [3.0.5] - 2022-2-15
- Roll Firefox back to older version

## [3.0.4] - 2022-02-10
- Project name desktop

## [3.0.3] - 2022-02-10
- Project name mobile

## [3.0.2] - 2022-02-10
- Fix wishlist authenticated test Foresee banner
- Enable video debugger

## [3.0.1] - 2022-02-09
- Update docker job with artifcatory image

## [3.0.0] - 2022-02-07
- Add basic mobile tests

## [2.9.3] - 2022-01-26
- Fix results file names

## [2.9.2] - 2022-01-26
- Update npm packages
- Fix capabilities object merge

## [2.9.1] - 2022-01-25
- RFX-6457: W3C Protocol

## [2.9.0] - 2022-01-24
- RFX-6482: scroll to page fold on guest checkout

## [2.8.9] - 2022-01-20
- RFX-6458: add spec file retries 

## [2.8.8] - 2022-01-19
- remove click action from recommendations 

## [2.8.7] - 2022-01-12
### Fixed
- nord-client-id

## [2.8.6] - 2022-01-11
### Fixed
- fix test name

## [2.8.5] - 2022-01-11
### Fixed
- nord client id cookie used for Shape bypass

## [2.8.4] - 2022-01-11
### Updated
- error results in Browserstack

## [2.8.3] - 2022-01-11
### Updated
- browserlist

## [2.8.1] - 2021-09-16
### Added
- RFX-6157: Add Wish List PDP test to gitlab pipelines

## [2.8.0] - 2021-09-16
### Added
- RFX-6157: Create Wish List PDP test scenarios

## [2.7.1] - 2021-09-09
### Fixed
- Missing information in README

## [2.7.0] - 2021-09-01
### Added
- RFX-6156: Create Checkout Flow Test Scenarios

## [2.6.1] - 2021-08-31
### Fixed
- Browser.url not evaluating string properly
- Clean up element references to reduce the number of browserstack errors
- Improved test reliability

## [2.6.0] - 2021-08-27
### Added
- RFX-6159: Create PDP Test Page Scenarios
## Fixed
- Linting warnings

## [2.5.1] - 2021-08-24
### Fixed
- Linting errors
### Updated
- README to clarify how to add tests to the pipelines

## [2.5.0] - 2021-08-23
### Added
- Docker image for the WebdriverIO tests

## [2.4.0] - 2021-08-16
### Added
- RFX-6175: Create My Account Test Scenarios
### Removed
- Unused dev dependencies

## [2.3.0] - 2021-08-13
### Removed
- Redundant scripts in package json and replaced them with generic scripts
- Duplicate test files and replaced them with flexible test suites
###
- Updated README to reflect new way of runnning tests

## [2.2.0] - 2021-08-13
### Added
- Support for configuring what environment the tests should run against.

## [2.1.0] - 2021-08-13
### Updated
- RFX-6170: Create Recommendations Test Scenarios

## [2.0.0] - 2021-08-12
### Updated
- Refactored the architecture

## [1.0.1] - 2021-08-04
### Fixed
- Linting errors
