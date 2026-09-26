"""
Selenium WebDriver automation for the Employee Management System (employee-mern).

Covers the core CRUD flows via the UI, using the app's real locators.
NOTE: The app has no id/name/data-testid attributes on its inputs, so these
tests locate elements by placeholder text and tag/class — this is itself a
maintainability finding worth raising with the dev team (see bug_reports.md
recommendation section).

Prerequisites to run:
    1. Backend running:  cd backend && npm install && node server.js   (port 5000)
    2. Frontend running: cd frontend && npm install && npm start       (port 3000)
    3. pip install -r requirements.txt

Run with:
    pytest test_employee_crud.py -v
"""

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert

BASE_URL = "http://localhost:3000"
WAIT_TIMEOUT = 10


class EmployeeCRUDTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = webdriver.ChromeOptions()
        options.add_argument("--headless=new")
        options.add_argument("--window-size=1280,900")
        cls.driver = webdriver.Chrome(options=options)
        cls.wait = WebDriverWait(cls.driver, WAIT_TIMEOUT)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def _fill_add_employee_form(self, name, email, role, salary):
        """Helper: fills the Add Employee form fields by placeholder text."""
        driver = self.driver
        driver.get(f"{BASE_URL}/add")
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "form.form")))

        name_input = driver.find_element(By.XPATH, "//input[@placeholder='Name']")
        email_input = driver.find_element(By.XPATH, "//input[@placeholder='Email']")
        role_input = driver.find_element(By.XPATH, "//input[@placeholder='Role']")
        salary_input = driver.find_element(By.XPATH, "//input[@placeholder='Salary']")

        for field, value in [(name_input, name), (email_input, email),
                              (role_input, role), (salary_input, salary)]:
            field.clear()
            field.send_keys(value)

        driver.find_element(By.XPATH, "//button[text()='Add Employee']").click()

    # ---------------------------------------------------------------
    # TC-01: Add employee with valid data
    # ---------------------------------------------------------------
    def test_01_add_employee_with_valid_data(self):
        unique_email = f"qa.test.{int(time.time())}@example.com"
        self._fill_add_employee_form("QA Automation Test", unique_email, "QA Engineer", "45000")

        alert = self.wait.until(EC.alert_is_present())
        self.assertIn("Employee Added", alert.text)
        alert.accept()

        # Verify it now appears in the View Employees list
        self.driver.get(f"{BASE_URL}/view")
        self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "employee-item")))
        page_text = self.driver.find_element(By.TAG_NAME, "body").text
        self.assertIn("QA Automation Test", page_text)

    # ---------------------------------------------------------------
    # TC-06 / BUG-01 & BUG-04: non-numeric salary still shows "success"
    # This test documents the defect rather than asserting ideal behavior,
    # since the current app has no validation — it will PASS today because
    # it confirms the bug exists, and should be updated to assert an error
    # message once BUG-01/BUG-04 are fixed.
    # ---------------------------------------------------------------
    def test_02_add_employee_non_numeric_salary_shows_misleading_success(self):
        unique_email = f"qa.badsalary.{int(time.time())}@example.com"
        self._fill_add_employee_form("Bad Salary Case", unique_email, "Tester", "not-a-number")

        alert = self.wait.until(EC.alert_is_present())
        # Documents BUG-01: alert fires even though the backend will reject
        # a non-numeric salary (schema type: Number).
        self.assertIn("Employee Added", alert.text)
        alert.accept()

    # ---------------------------------------------------------------
    # TC-11: View Employees list loads and displays records
    # ---------------------------------------------------------------
    def test_03_view_employees_list_loads(self):
        self.driver.get(f"{BASE_URL}/view")
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h2")))
        heading = self.driver.find_element(By.TAG_NAME, "h2").text
        self.assertEqual(heading, "Employee List")

    # ---------------------------------------------------------------
    # TC-14: Edit an employee and verify the update persists
    # ---------------------------------------------------------------
    def test_04_edit_employee_updates_record(self):
        # First, create a record to edit
        unique_email = f"qa.editme.{int(time.time())}@example.com"
        self._fill_add_employee_form("Edit Me Original", unique_email, "Tester", "30000")
        self.wait.until(EC.alert_is_present()).accept()

        self.driver.get(f"{BASE_URL}/view")
        self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "employee-item")))

        # Find the row containing our record and click its Edit button
        rows = self.driver.find_elements(By.CLASS_NAME, "employee-item")
        target_row = next(r for r in rows if "Edit Me Original" in r.text)
        target_row.find_element(By.XPATH, ".//button[text()='Edit']").click()

        edit_box = self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "edit-box")))
        name_field = edit_box.find_element(By.TAG_NAME, "input")
        name_field.clear()
        name_field.send_keys("Edit Me Updated")
        edit_box.find_element(By.XPATH, ".//button[text()='Save']").click()

        self.wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "edit-box")))
        page_text = self.driver.find_element(By.TAG_NAME, "body").text
        self.assertIn("Edit Me Updated", page_text)

    # ---------------------------------------------------------------
    # TC-18/19: Delete an employee, and document the missing confirmation (BUG-05)
    # ---------------------------------------------------------------
    def test_05_delete_employee_removes_record_without_confirmation(self):
        unique_email = f"qa.deleteme.{int(time.time())}@example.com"
        self._fill_add_employee_form("Delete Me", unique_email, "Tester", "25000")
        self.wait.until(EC.alert_is_present()).accept()

        self.driver.get(f"{BASE_URL}/view")
        self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "employee-item")))

        rows = self.driver.find_elements(By.CLASS_NAME, "employee-item")
        target_row = next(r for r in rows if "Delete Me" in r.text)
        target_row.find_element(By.XPATH, ".//button[text()='Delete']").click()

        # BUG-05: no confirmation dialog appears — deletion is immediate.
        # A robust app would show a window.confirm() alert here; this app does not.
        time.sleep(1)
        page_text = self.driver.find_element(By.TAG_NAME, "body").text
        self.assertNotIn("Delete Me", page_text)


if __name__ == "__main__":
    unittest.main()
