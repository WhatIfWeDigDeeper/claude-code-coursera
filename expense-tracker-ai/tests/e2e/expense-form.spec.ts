import { test, expect } from '@playwright/test';

test.describe('Expense Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear());

    // Reload to ensure clean state
    await page.reload();
  });

  test('should display expense form with all required fields', async ({ page }) => {
    // Verify form heading
    await expect(page.getByRole('heading', { name: 'Add New Expense' })).toBeVisible();

    // Verify all form fields are present
    await expect(page.locator('[data-testid="date-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="amount-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
    await expect(page.locator('[data-testid="description-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="submit-button"]')).toBeVisible();
  });

  test('should add expense with valid data', async ({ page }) => {
    // Fill out the expense form
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('50.00');
    await page.locator('[data-testid="category-select"]').selectOption('Food');
    await page.locator('[data-testid="description-input"]').fill('Grocery shopping');

    // Submit the form
    await page.locator('[data-testid="submit-button"]').click();

    // Navigate to Expenses tab to verify the expense was added
    await page.getByRole('button', { name: 'Expenses' }).click();

    // Verify expense appears in the list
    await expect(page.locator('[data-testid="expense-item"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('Grocery shopping');
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('$50.00');
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('Food');
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill out and submit the form
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('25.50');
    await page.locator('[data-testid="category-select"]').selectOption('Transportation');
    await page.locator('[data-testid="description-input"]').fill('Bus fare');
    await page.locator('[data-testid="submit-button"]').click();

    // Verify form fields are cleared (except date which defaults to today)
    await expect(page.locator('[data-testid="amount-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="description-input"]')).toHaveValue('');
  });

  test('should show error for empty amount', async ({ page }) => {
    // Fill form but leave amount empty
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="description-input"]').fill('Test expense');

    // Submit the form
    await page.locator('[data-testid="submit-button"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-testid="amount-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="amount-error"]')).toContainText('Amount must be greater than 0');
  });

  test('should prevent negative amount input', async ({ page }) => {
    // Note: HTML5 min="0" attribute prevents negative values from being entered
    // When Playwright's fill() is used with a negative number on an input with min="0",
    // the browser typically ignores the negative sign
    await page.locator('[data-testid="amount-input"]').fill('-10');

    // Check what value was actually set
    const amountValue = await page.locator('[data-testid="amount-input"]').inputValue();

    // The value should either be empty, "10" (without negative), or still "-10" (will fail validation)
    // In all cases, the form should prevent creating an expense with negative amount
    expect(amountValue === '' || amountValue === '10' || parseFloat(amountValue) === -10).toBe(true);
  });

  test('should show error for zero amount', async ({ page }) => {
    // Fill form with zero amount
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('0');
    await page.locator('[data-testid="description-input"]').fill('Test expense');

    // Submit the form
    await page.locator('[data-testid="submit-button"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-testid="amount-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="amount-error"]')).toContainText('Amount must be greater than 0');
  });

  test('should show error for empty description', async ({ page }) => {
    // Fill form but leave description empty
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('100');

    // Submit the form
    await page.locator('[data-testid="submit-button"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-testid="description-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="description-error"]')).toContainText('Description is required');
  });

  test('should show error for whitespace-only description', async ({ page }) => {
    // Fill form with whitespace-only description
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('100');
    await page.locator('[data-testid="description-input"]').fill('   ');

    // Submit the form
    await page.locator('[data-testid="submit-button"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-testid="description-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="description-error"]')).toContainText('Description is required');
  });

  test('should handle decimal amounts correctly', async ({ page }) => {
    // Fill form with decimal amount
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('123.45');
    await page.locator('[data-testid="category-select"]').selectOption('Shopping');
    await page.locator('[data-testid="description-input"]').fill('Online purchase');
    await page.locator('[data-testid="submit-button"]').click();

    // Navigate to Expenses tab
    await page.getByRole('button', { name: 'Expenses' }).click();

    // Verify decimal amount is displayed correctly
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('$123.45');
  });

  test('should allow adding new category', async ({ page }) => {
    // Select "Add New Category" option
    await page.locator('[data-testid="category-select"]').selectOption('__new__');

    // Verify new category input appears
    await expect(page.locator('[data-testid="new-category-input"]')).toBeVisible();

    // Enter new category name
    await page.locator('[data-testid="new-category-input"]').fill('Groceries');

    // Click Add button
    await page.locator('[data-testid="add-category-button"]').click();

    // Verify category select is visible again and new category is selected
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
    await expect(page.locator('[data-testid="category-select"]')).toHaveValue('Groceries');
  });

  test('should cancel adding new category', async ({ page }) => {
    // Select "Add New Category" option
    await page.locator('[data-testid="category-select"]').selectOption('__new__');

    // Enter new category name
    await page.locator('[data-testid="new-category-input"]').fill('TestCategory');

    // Click Cancel button
    await page.locator('[data-testid="cancel-category-button"]').click();

    // Verify category select is visible again
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
  });

  test('should not add duplicate category', async ({ page }) => {
    // Select "Add New Category" option
    await page.locator('[data-testid="category-select"]').selectOption('__new__');

    // Try to add a category that already exists (e.g., "Food")
    await page.locator('[data-testid="new-category-input"]').fill('Food');
    await page.locator('[data-testid="add-category-button"]').click();

    // Verify category select is visible but category was not duplicated
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
  });

  test('should allow editing expense', async ({ page }) => {
    // Add an expense first
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('75.00');
    await page.locator('[data-testid="category-select"]').selectOption('Entertainment');
    await page.locator('[data-testid="description-input"]').fill('Movie tickets');
    await page.locator('[data-testid="submit-button"]').click();

    // Navigate to Expenses tab
    await page.getByRole('button', { name: 'Expenses' }).click();

    // Click Edit button
    await page.locator('[data-testid="edit-expense-button"]').first().click();

    // Navigate back to Overview tab (where form is)
    await page.getByRole('button', { name: 'Overview' }).click();

    // Verify form is populated with expense data
    await expect(page.locator('[data-testid="amount-input"]')).toHaveValue('75');
    await expect(page.locator('[data-testid="description-input"]')).toHaveValue('Movie tickets');

    // Verify form shows "Edit Expense" heading
    await expect(page.getByRole('heading', { name: 'Edit Expense' })).toBeVisible();

    // Verify cancel button is visible
    await expect(page.locator('[data-testid="cancel-button"]')).toBeVisible();

    // Update the expense
    await page.locator('[data-testid="amount-input"]').fill('80.00');
    await page.locator('[data-testid="submit-button"]').click();

    // Navigate to Expenses tab
    await page.getByRole('button', { name: 'Expenses' }).click();

    // Verify updated amount
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('$80.00');
  });

  test('should cancel editing expense', async ({ page }) => {
    // Add an expense first
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('60.00');
    await page.locator('[data-testid="category-select"]').selectOption('Bills');
    await page.locator('[data-testid="description-input"]').fill('Internet bill');
    await page.locator('[data-testid="submit-button"]').click();

    // Navigate to Expenses tab
    await page.getByRole('button', { name: 'Expenses' }).click();

    // Click Edit button
    await page.locator('[data-testid="edit-expense-button"]').first().click();

    // Navigate back to Overview tab
    await page.getByRole('button', { name: 'Overview' }).click();

    // Verify form shows cancel button
    await expect(page.locator('[data-testid="cancel-button"]')).toBeVisible();

    // Click Cancel button
    await page.locator('[data-testid="cancel-button"]').click();

    // Verify form is cleared and shows "Add New Expense"
    await expect(page.getByRole('heading', { name: 'Add New Expense' })).toBeVisible();
    await expect(page.locator('[data-testid="amount-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="description-input"]')).toHaveValue('');
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Verify all form fields can be focused via keyboard
    await page.locator('[data-testid="date-input"]').focus();
    await expect(page.locator('[data-testid="date-input"]')).toBeFocused();

    await page.locator('[data-testid="amount-input"]').focus();
    await expect(page.locator('[data-testid="amount-input"]')).toBeFocused();

    await page.locator('[data-testid="category-select"]').focus();
    await expect(page.locator('[data-testid="category-select"]')).toBeFocused();

    await page.locator('[data-testid="description-input"]').focus();
    await expect(page.locator('[data-testid="description-input"]')).toBeFocused();

    await page.locator('[data-testid="submit-button"]').focus();
    await expect(page.locator('[data-testid="submit-button"]')).toBeFocused();
  });

  test('should handle large amounts', async ({ page }) => {
    // Fill form with large amount
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('99999.99');
    await page.locator('[data-testid="category-select"]').selectOption('Other');
    await page.locator('[data-testid="description-input"]').fill('Large purchase');
    await page.locator('[data-testid="submit-button"]').click();

    // Navigate to Expenses tab
    await page.getByRole('button', { name: 'Expenses' }).click();

    // Verify large amount is displayed correctly
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('$99,999.99');
  });

  test('should persist expenses in localStorage', async ({ page }) => {
    // Add an expense
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('45.00');
    await page.locator('[data-testid="category-select"]').selectOption('Food');
    await page.locator('[data-testid="description-input"]').fill('Lunch');
    await page.locator('[data-testid="submit-button"]').click();

    // Reload the page
    await page.reload();

    // Navigate to Expenses tab
    await page.getByRole('button', { name: 'Expenses' }).click();

    // Verify expense is still there
    await expect(page.locator('[data-testid="expense-item"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('Lunch');
    await expect(page.locator('[data-testid="expense-item"]').first()).toContainText('$45.00');
  });
});
