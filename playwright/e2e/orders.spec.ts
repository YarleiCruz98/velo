import { test } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { Navbar } from '../support/components/Navbar'

import { LandingPage } from '../support/pages/LandingPage'
import { SearchOrderPage } from '../support/pages/SearchOrderPage'

test.describe('Consulta de Pedido', () => {

  let searchOrderPage: SearchOrderPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).gotoLandingPage()
    await new Navbar(page).searchOrderLink()

    searchOrderPage = new SearchOrderPage(page)
  })

  test('should search an approved order', async ({ page }) => {
    const order: any = {
      number: 'VLO-G26SII',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'nome teste 1 sobrenome teste 1',
        email: 'teste1@dev.com'
      },
      payment: 'À Vista'
    }

    await searchOrderPage.searchOrder(order.number)

    await searchOrderPage.validateOrderResult(order)
    await searchOrderPage.validateStatusBadge(order.status)
  })

  test('should search a rejected order', async ({ page }) => {
    const order: any = {
      number: 'VLO-RQY8GO',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'teste 2 sobrenome teste 2',
        email: 'teste2@dev.com'
      },
      payment: 'À Vista'
    }

    await searchOrderPage.searchOrder(order.number)

    await searchOrderPage.validateOrderResult(order)
    await searchOrderPage.validateStatusBadge(order.status)
  })

  test('should search an order in analysis', async ({ page }) => {
    const order: any = {
      number: 'VLO-ACOIOU',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'teste 3 teste 3 sobrenome',
        email: 'teste3@dev.com'
      },
      payment: 'À Vista'
    }

    await searchOrderPage.searchOrder(order.number)

    await searchOrderPage.validateOrderResult(order)
    await searchOrderPage.validateStatusBadge(order.status)
  })

  test('should display an error message when the order is not found', async ({ page }) => {
    const order = generateOrderCode()

    await searchOrderPage.searchOrder(order)
    await searchOrderPage.validateErrorMessage()
  })

  test('should display an error message when the order number format is invalid', async ({ page }) => {
    const orderCode = 'ABC123'

    await searchOrderPage.searchOrder(orderCode)
    await searchOrderPage.validateErrorMessage()
  })
})