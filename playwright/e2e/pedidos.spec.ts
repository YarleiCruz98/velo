import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { SearchOrderPage } from '../support/pages/SearchOrderPage'

/// AAA - Arrange, Act, Assert

test.describe('Search Order', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('should search an approved order', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-G26SII',
      status: 'APROVADO' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'nome teste 1 sobrenome teste 1',
        email: 'teste1@dev.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const searchOrderPage = new SearchOrderPage(page)   
    await searchOrderPage.searchOrder(order.number)

    // Assert
    await searchOrderPage.validateOrderResult(order)

    // Validation of status badge encapsulated in the Page Object
    await searchOrderPage.validateStatusBadge(order.status)

  })

  test('should search a rejected order', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-RQY8GO',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'teste 2 sobrenome teste 2',
        email: 'teste2@dev.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const searchOrderPage = new SearchOrderPage(page)
    await searchOrderPage.searchOrder(order.number)

    // Assert
    await searchOrderPage.validateOrderResult(order)

    // Validation of status badge encapsulated in the Page Object
    await searchOrderPage.validateStatusBadge(order.status)
  })

  test('should search an order in analysis', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-ACOIOU',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'teste 3 teste 3 sobrenome',
        email: 'teste3@dev.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const searchOrderPage = new SearchOrderPage(page)
    await searchOrderPage.searchOrder(order.number)

    // Assert
    await searchOrderPage.validateOrderResult(order)

    // Validation of status badge encapsulated in the Page Object
    await searchOrderPage.validateStatusBadge(order.status)
  })

  test('should display an error message when the order is not found', async ({ page }) => {

    // Test Data
    const order = generateOrderCode()

    // Act
    const searchOrderPage = new SearchOrderPage(page)
    await searchOrderPage.searchOrder(order)

    // Assert
    await searchOrderPage.validateErrorMessage()
  })

  test('should display an error message when the order number format is invalid', async ({ page }) => {

    // Test Data
    const order = 'ABC123'

    // Act
    const searchOrderPage = new SearchOrderPage(page)
    await searchOrderPage.searchOrder(order)

    // Assert
    await searchOrderPage.validateErrorMessage()
  })
})