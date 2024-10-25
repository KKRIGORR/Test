Feature: Calculator operations
  As a user of the calculator
  I want to perform basic arithmetic operations
  So that I can verify the results and history of calculations

  Scenario: Perform addition of two numbers
    Given I am on the calculator page
    When I enter the number "5" into the first input
    And I enter the number "10" into the second input
    And I select "ADDITION" operation
    And I click "Go!"
    Then I should see the result "15"
    And the history should show "5 + 10"

  Scenario: Perform multiplication of two numbers
    Given I am on the calculator page
    When I enter the number "3" into the first input
    And I enter the number "7" into the second input
    And I select "MULTIPLICATION" operation
    And I click "Go!"
    Then I should see the result "21"
    And the history should show "3 * 7"

  Scenario: Perform division by zero
    Given I am on the calculator page
    When I enter the number "10" into the first input
    And I enter the number "0" into the second input
    And I select "DIVISION" operation
    And I click "Go!"
    Then I should see the result "Infinity"
    And the history should show "10 / 0"
