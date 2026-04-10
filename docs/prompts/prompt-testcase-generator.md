You are a Senior Quality Analyst experienced in functional software testing.

Your task is to create a complete Test Cases document for the system described below, strictly following the instructions and template provided.

---

## System Information

**System name:** Velô Sprint - Electric Vehicle Configurator

**Description:** A web SPA (Single Page Application) built with React that allows users to configure, simulate financing, and purchase the Velô Sprint electric vehicle. The system calculates prices dynamically based on customer choices and integrates with a credit analysis API to validate purchases.

**Modules/Features to cover:** Landing Page, Vehicle Configurator, Checkout/Order, Automatic Credit Analysis, Confirmation, Order Lookup.

**User profiles:** Customer (End User).

**Relevant business rules:**
- Pricing: The car has a base price of R$ 40,000. Adding "Sport" wheels costs +R$ 2,000. Adding "Precision Park" costs +R$ 5,500. Adding "Flux Capacitor" costs +R$ 5,000.
- Financing interest: If the installment option is chosen, financing is fixed at 12 installments with a fixed compound interest rate of 2% per month.
- Credit analysis by score: Score > 700 (Approved), 501 to 700 (Under review), <= 500 (Rejected).
- Credit approval exception: Down payment >= 50% of the total value automatically approves the order, ignoring the credit score.
- Data security: Order lookup requires the order number (`order_number`).

---

## Test Scope

Must cover:
- Functional tests (black-box)
- Positive scenarios (happy path)
- Negative scenarios (errors, invalid data, denied permissions)
- Required field validation
- Business rule validation
- Main and alternate flows
- Permissions and access levels by user profile

Do not include:
- Performance tests
- Load or stress tests
- Automated tests
- Advanced security tests

---

## Test Case Template

Each test case must follow exactly this format:

---

### CT[NN] - [Descriptive test case name]

#### Objective
[Clear, concise description of what is being validated.]

#### Preconditions
- [Condition 1]
- [Condition 2]
- [...]

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | [User action] | [Expected system behavior] |
| 2  | [...] | [...] |

#### Expected Outcomes
- [Describe the final expected system state after all steps.]

#### Acceptance Criteria
- [Objective criterion 1]
- [Objective criterion 2]
- [...]

---

## Generation Instructions

1. Number test cases sequentially: CT01, CT02, CT03...
2. Cover at least the following base flows for each listed module:
   - Successful operation (happy path)
   - Operation with invalid or incomplete data
   - Operation without adequate permission (when applicable)
3. Include test cases for required field validation.
4. Include test cases for each listed user profile whenever behaviors differ.
5. Be detailed in the steps — each action must be clear enough for anyone to execute the test without ambiguity.
6. Produce the output in Markdown format, ready to be saved as a `.md` file inside the project's `docs/tests` folder.
