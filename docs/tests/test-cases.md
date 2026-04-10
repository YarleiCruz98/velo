# Velô Sprint Test Cases Document

This document contains the functional test cases for the Velô Sprint system, covering the Landing Page, Vehicle Configurator, Checkout/Order, Credit Analysis, Confirmation, and Order Lookup modules, for the Customer profile.

---

### CT01 - Access and Navigation on the Landing Page

#### Objective
Ensure the Customer can access the home page, view Velô Sprint information, and be redirected to the Configurator.

#### Preconditions
- The system must be reachable at the base URL.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Open the system’s base URL | The Landing Page loads successfully, showing the Hero, Specifications, FAQ, and CTA. |
| 2  | Click the button to configure or reserve the vehicle | The system redirects the Customer to the Configurator page (`/configure`). |

#### Expected Outcomes
- The system displays the information correctly and navigates to the configuration page when the CTA is triggered.

#### Acceptance Criteria
- The page loads without visible errors.
- Redirection to the configurator (`/configure`) works.

---

### CT02 - Vehicle Configuration (Colors and Wheels) and Base Price Calculation

#### Objective
Validate that color and wheel choices (“Sport”) are reflected correctly in the displayed final price.

#### Preconditions
- On the Configurator page (`/configure`).
- Initial base price must be R$ 40,000.00 (default color + “Aero” wheels).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Check the initial sale price | The sale price must be R$ 40,000.00. |
| 2  | Select a different exterior color (“Midnight Black” or “Lunar White”) | The vehicle color in the preview changes, but the price remains R$ 40,000.00. |
| 3  | Select the “Sport Wheels” wheel option | The wheels in the preview change and the total price updates with an increase of R$ 2,000.00 (Total: R$ 42,000.00). |
| 4  | Select “Aero Wheels” again | The total price decreases by R$ 2,000.00, returning to R$ 40,000.00. |

#### Expected Outcomes
- The vehicle’s dynamic price updates immediately only when the wheel is changed to “Sport”.

#### Acceptance Criteria
- “Sport” wheels must cost exactly +R$ 2,000.
- Changing only the exterior/interior color does not change the base price.

---

### CT03 - Vehicle Configuration (Optional Add-ons) and Price Calculation

#### Objective
Validate that selecting optional features (“Precision Park” and “Flux Capacitor”) updates the vehicle price dynamically.

#### Preconditions
- On the Configurator page.
- Vehicle with no optional features selected (Price R$ 40,000.00).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Check the “Precision Park” optional checkbox | The sale price increases by R$ 5,500.00 (temporary total: R$ 45,500.00). |
| 2  | Check the “Flux Capacitor” optional checkbox | The sale price increases by R$ 5,000.00 (temporary total: R$ 50,500.00). |
| 3  | Uncheck the optional checkboxes | The total price subtracts the respective amounts and returns to R$ 40,000.00. |
| 4  | Click the “Monte o Seu” (Checkout) button | The user is redirected to the checkout page (`/order`) with values persisted. |

#### Expected Outcomes
- The total price tracks exactly the checking and unchecking of optional features.
- Redirection carries the correct configuration and price to Checkout.

#### Acceptance Criteria
- The “Precision Park” optional costs +R$ 5,500 and “Flux Capacitor” costs +R$ 5,000.

---

### CT04 - Checkout - Required Field Validation and Invalid Data

#### Objective
Validate required-field rules for personal data on Checkout.

#### Preconditions
- The customer has configured the car and is on the Checkout page (`/order`).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Leave all form fields empty and click “Confirmar Pedido” | The system does not proceed and shows error messages under the fields (Name, Surname, Email, Phone, CPF, Store, Terms). |
| 2  | Enter only 1 letter in “Nome” and “Sobrenome” and confirm | The system shows error: “Nome deve ter pelo menos 2 caracteres”. |
| 3  | Enter an email without valid format (e.g. `cliente@.com`) and confirm | The system shows error: “Email inválido”. |
| 4  | Enter an incomplete or invalid CPF and confirm | The system shows “CPF inválido” error. |
| 5  | Fill all fields correctly but do not check “Li e aceito os Termos” | The system shows error: “Aceite os termos”. |

#### Expected Outcomes
- No real submission occurs if the form has validation errors on the data provided by the customer.

#### Acceptance Criteria
- Name and Surname require a minimum of 2 characters.
- Phone and CPF require format and minimum completed length (mask filled).
- The terms checkbox must be checked.

---

### CT05 - Checkout and Confirmation - Cash Payment (Happy Path)

#### Objective
Validate successful order creation with cash (à vista) payment.

#### Preconditions
- On the Checkout route with a basic car configuration (R$ 40,000.00).
- Personal data filled in and valid.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Fill the form with valid data and select the store | Fields show no errors. |
| 2  | Select the “À Vista” tab under Payment Method | The “Resumo” and “À Vista” totals show R$ 40,000.00. |
| 3  | Accept the terms of use and click “Confirmar Pedido” | The button shows a loading state and the order is sent to the Confirmation page (`/success`). |
| 4  | Check the Confirmation page | The page shows “Pedido Aprovado!”, an order number, customer information, and summary. |

#### Expected Outcomes
- Cash orders are created immediately with `APROVADO` status.

#### Acceptance Criteria
- Order is `APROVADO` for cash payments (no credit analysis required).

---

### CT06 - Checkout and Credit Analysis - Financing with High Score (Approved)

#### Objective
Validate automatic credit approval when the CPF score is greater than 700 for financing.

#### Preconditions
- On Checkout with a base car (R$ 40,000.00).
- Use a test CPF that returns `Score > 700` from the analysis API.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Fill the form with valid data using a high-score CPF | No fill errors. |
| 2  | Select “Financiamento” and set “Valor da Entrada” to `0` | The 12-installment value reflects the 2% p.m. calculation: `(40000 / 12) * 1.02`. |
| 3  | Accept the terms and click “Confirmar Pedido” | The system sends the CPF for credit analysis and processes the request. |
| 4  | Observe navigation after submit | The system goes to the success page showing “Pedido Aprovado!”. |

#### Expected Outcomes
- The order is recorded with `APROVADO` status automatically, validating the high-score rule.

#### Acceptance Criteria
- If payment method is Financing and the returned score is > 700, status is Approved.

---

### CT07 - Checkout and Credit Analysis - Financing with Medium Score (Under review)

#### Objective
Validate the moderate credit score rule that sends the order to manual verification.

#### Preconditions
- On checkout with a vehicle and down payment configured.
- Use a test CPF that returns a score between `501 and 700` from the API.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Fill valid data with a CPF whose score is between 501 and 700 | Fields valid. |
| 2  | Select “Financiamento”, down payment `0`, accept terms, and confirm | The system processes the credit request. |
| 3  | Observe order creation confirmation | The route redirects; the visual feedback should show the order was created with “EM ANÁLISE” status (clock icon on order lookup or equivalent text). |

#### Expected Outcomes
- The order is recorded with `EM_ANALISE` status.

#### Acceptance Criteria
- Orders with scores from 501 to 700 receive `EM_ANALISE` status.

---

### CT08 - Checkout and Credit Analysis - Financing with Low Score (Rejected)

#### Objective
Validate credit rejection when the score is less than or equal to 500 for financing.

#### Preconditions
- On checkout with a configured vehicle and no down payment (or down payment less than 50%).
- Use a test CPF that returns `Score <= 500`.

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Fill the form with valid data and a low-score CPF | Fields remain valid. |
| 2  | On the Financing tab, enter a down payment below 50% of the total | Form filled and installments calculated on the remaining amount. |
| 3  | Accept terms and click “Confirmar Pedido” | The system processes and evaluates credit via the API. |
| 4  | Observe the resulting page (`/success`) | Redirection occurs, but the page shows “Crédito Reprovado” or failure visuals (X icon) with the appropriate message. |

#### Expected Outcomes
- The financing order with low score is saved as `REPROVADO` and the user does not continue the happy path.

#### Acceptance Criteria
- Score <= 500 and down payment < 50% result in absolute rejection of the order.

---

### CT09 - Checkout and Credit Exception - Financing with Down Payment >= 50% and Low Score (Approved)

#### Objective
Validate the credit approval exception: any score is ignored and status is `APROVADO` when the down payment reaches 50% of the total.

#### Preconditions
- Base vehicle R$ 40,000.00 on Checkout.
- Use a test CPF that returns `Score <= 500` (which would normally reject).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Fill required fields using a low-score CPF | Everything filled correctly. |
| 2  | Choose “Financiamento” and set “Valor da Entrada” to `20000` (50% of total) or `25000` | Summary updates and the installment shows the diluted value: `((Total - Entrada) / 12) * 1.02`. |
| 3  | Accept terms and click “Confirmar Pedido” | The system performs the request in the background. |
| 4  | Check the confirmation route | Navigation completes with “Pedido Aprovado!”, proving the down-payment exception overrode low-score rejection. |

#### Expected Outcomes
- The down-payment rule prevails and the order is created with `APROVADO` status.

#### Acceptance Criteria
- When `(Down payment / Total value) >= 0.5`, the result is invariably Approved regardless of score < 700.

---

### CT10 - Order Lookup - Successfully Look Up an Existing Order

#### Objective
Ensure an end user can review their purchase status by entering a valid order number.

#### Preconditions
- The customer has a valid order number from a previous purchase (e.g. `VLO-ABCD10`).
- Open the Order Lookup page (`/lookup`).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Enter the valid order number in the “Número do Pedido” field | The field accepts input and allows proceeding. |
| 2  | Click “Buscar Pedido” | The system enters a `loading` state briefly. |
| 3  | Wait for data to display | A card shows: current status (Approved / Under review / Rejected), vehicle information (color, optionals), customer data, and financial values. |

#### Expected Outcomes
- The displayed order matches the data of the order stored in the database.

#### Acceptance Criteria
- Only with a real `order_number` does the system return order data securely.

---

### CT11 - Order Lookup - Order Number Not Found (Invalid)

#### Objective
Validate that non-registered orders or random strings do not leak data or freeze lookup, showing a not-found error.

#### Preconditions
- Open the Order Lookup page (`/lookup`).

#### Steps

| Id | Action | Expected Result |
|----|--------|-----------------|
| 1  | Enter an order number that does not exist or an incorrect format (e.g. `VLO-INEXISTENTE`) | Form filled with a fake order. |
| 2  | Click “Buscar Pedido” | The system queries the API and finds no match. |
| 3  | Observe UI feedback | The system clearly shows “Pedido não encontrado” and an X icon on a red panel. Sensitive data remains hidden. |
| 4  | Attempt search with the order field empty | The button must stay disabled until at least one character is entered. |

#### Expected Outcomes
- Security and UI stability for invalid lookups. No raw exceptions exposed.

#### Acceptance Criteria
- If `orderId` returns no exact data from the API, the friendly “Pedido não encontrado” failure feedback is shown to the customer.
