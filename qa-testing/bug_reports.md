# Bug Reports — Employee Management System (MERN)

Found via manual functional testing and source code review against `employee-mern`.
Format: ID | Title | Severity | Steps to Reproduce | Expected vs Actual | Affected File

---

## BUG-01: False "success" alert shown even when Add Employee fails
**Severity:** High | **Priority:** High
**Steps to Reproduce:**
1. Go to `/add`
2. Submit an employee with an email that already exists, OR a non-numeric Salary
**Expected:** An error message should display, since the backend rejects the request (duplicate email / invalid type).
**Actual:** The frontend shows `"Employee Added ✅"` regardless of the API response, because `AddEmployee.js` never checks `res.ok` or the response body before alerting success.
**Affected file:** `frontend/src/pages/AddEmployee.js`, lines 15–23
**Impact:** Users believe data was saved when it silently was not — leads to missing records with no error trail.

---

## BUG-02: No client-side validation on required fields
**Severity:** Medium | **Priority:** High
**Steps to Reproduce:**
1. Go to `/add`
2. Leave Name and/or Email blank
3. Submit
**Expected:** Form should block submission and highlight the missing required field(s).
**Actual:** The form submits with empty strings; the request only fails at the backend (schema `required: true`), and because of BUG-01 the user still sees a success alert.
**Affected file:** `frontend/src/pages/AddEmployee.js` — no `required` attributes or pre-submit checks on inputs.

---

## BUG-03: No email format validation
**Severity:** Medium | **Priority:** Medium
**Steps to Reproduce:**
1. Go to `/add`
2. Enter a malformed value in Email (e.g. `notanemail`)
3. Fill remaining fields, submit
**Expected:** Should reject with a format error (no `@`/domain).
**Actual:
