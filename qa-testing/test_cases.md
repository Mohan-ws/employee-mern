# Test Cases — Employee Management System (MERN)

**Application under test:** `employee-mern` (React frontend + Express/MongoDB backend)
**Scope:** Add Employee, View/Edit/Delete Employee, Login/Navigation
**Fields confirmed from `backend/Employee.js`:** `name` (String, required), `email` (String, required, unique), `role` (String, required), `salary` (Number, required)
**Routes confirmed from `backend/server.js`:** `POST /employees`, `GET /employees`, `PUT /employees/:id`, `DELETE /employees/:id`
**Test Environment:** Chrome (latest), frontend on `localhost:3000`, backend on `localhost:5000`

Status legend: ✅ Pass — behaves as expected | ❌ Fail — see linked bug report

---

### Module: Add Employee (`/add`)

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|------------------|--------|
| TC-01 | Add employee with valid data | 1. Go to `/add` 2. Enter Name, Email, Role, numeric Salary 3. Click "Add Employee" | Success alert shown; record appears in `/view` list | ✅ |
| TC-02 | Add employee with empty Name field | 1. Leave Name blank 2. Fill other fields 3. Submit | System should block submission or show validation error | ❌ — BUG-02 |
| TC-03 | Add employee with empty Email field | Leave Email blank, fill rest, submit | Should block submission with a clear error | ❌ — BUG-02 |
| TC-04 | Add employee with invalid email format (e.g. `abc.com`) | Enter malformed email, submit | Should reject with a format-validation message | ❌ — BUG-03 |
| TC-05 | Add employee with duplicate email | Submit an email that already exists in DB | Should show a clear "email already exists" error, not a success message | ❌ — BUG-01 |
| TC-06 | Add employee with non-numeric Salary (e.g. `abc`) | Enter letters in Salary field, submit | Should reject with a "must be a number" message | ❌ — BUG-01 / BUG-04 |
| TC-07 | Add employee with negative Salary (e.g. `-5000`) | Enter negative number, submit | Should reject negative salary values | ❌ — BUG-06 |
| TC-08 | Add employee with very long Name (255+ characters) | Paste a 300-character string into Name | System should handle gracefully (truncate/reject/store) without crashing | ✅ (stores as-is; no length cap — noted for future validation) |
| TC-09 | Form fields reset after successful submission | Submit a valid employee | Name/Email/Role/Salary fields clear back to empty | ✅ |
| TC-10 | Submit form with all fields empty | Click "Add Employee" with nothing entered | Should show validation errors for all required fields | ❌ — BUG-02 |

### Module: View Employees (`/view`)

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|------------------|--------|
| TC-11 | List loads and displays all employees | Navigate to `/view` after adding records | All employee records display with Name, Role, Salary | ✅ |
| TC-12 | Empty state when no employees exist | Load `/view` with an empty database | A friendly "No employees found" message should display | ❌ — BUG-08 |
| TC-13 | List refreshes after adding a new employee | Add an employee, then navigate to `/view` | New employee appears without manual refresh | ✅ |

### Module: Edit Employee (inline, on `/view`)

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|------------------|--------|
| TC-14 | Edit and save employee details | Click "Edit" on a record, change Name/Role/Salary, click "Save" | Record updates in the list with new values | ✅ |
| TC-15 | Cancel edit discards changes | Click "Edit", change a field, click "Cancel" | Original values remain unchanged in the list | ✅ |
| TC-16 | Edit form omits Email field | Click "Edit" on any record | Only Name, Role, Salary are editable — Email cannot be changed via UI | ✅ (by design — worth confirming is intentional) |
| TC-17 | Save with Salary changed to non-numeric text | In edit mode, change Salary to letters, click "Save" | Should reject with a validation message | ❌ — BUG-04 |

### Module: Delete Employee

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|------------------|--------|
| TC-18 | Delete employee record | Click "Delete" on any record | Record is removed from the list | ✅ (functionally works) |
| TC-19 | Delete has no confirmation step | Click "Delete" | A confirmation prompt should appear before permanent deletion | ❌ — BUG-05 |

### Module: Login & Navigation

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|------------------|--------|
| TC-20 | Login with blank credentials | Leave Username/Password empty, click "Login" | Should block access and show a validation/auth error | ❌ — BUG-07 |
| TC-21 | Login with any arbitrary text | Enter random text in both fields, click "Login" | Should only succeed with valid credentials | ❌ — BUG-07 |
| TC-22 | Password field masks input | Type into Password field | Characters display as dots/asterisks, not plain text | ✅ |
| TC-23 | Dashboard navigation links | From `/dashboard`, click "Add Employee", "View Employees", "Logout" | Each link routes to the correct page (`/add`, `/view`, `/`) | ✅ |
| TC-24 | Top navbar present on Add/View pages | Navigate to `/add` and `/view` | Navbar with Dashboard/Add/View links is visible and functional on both | ✅ |

---

**Total: 24 test cases — 15 pass, 9 fail (mapped to 8 documented defects in `bug_reports.md`)**
