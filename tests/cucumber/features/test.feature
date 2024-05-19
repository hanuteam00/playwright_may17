Feature: DuckDuckGo Search

  Scenario: Searching in DuckDuckGo
    Given Open DuckDuckGo Website
    When I search for "Playwright"
    Then I should see results related to "Playwright"