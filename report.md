
# SwiftTransit Quality Assurance Status

**Note:** Static reporting has been replaced by the **Interactive Testing Dashboard**.

## New Testing Infrastructure
We have moved from hardcoded simulations to a real testing folder structure:
*   `tests/unit.test.ts`: Directly tests `utils/calculations.ts`.
*   `tests/integration.test.ts`: Performs real operations against `services/api.ts` and `services/auth.ts`.
*   `tests/suite.ts`: Aggregates all test cases for the UI runner.

## How to Run Tests
1. Navigate to the **Tests** tab in the application's bottom navigation.
2. Click **"EXECUTE REAL TEST SUITE"**.
3. The dashboard will import the test functions and run them in real-time within the browser context, reporting performance durations and detailed error logs for failures.
