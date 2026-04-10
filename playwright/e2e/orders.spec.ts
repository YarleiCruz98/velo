import { test } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'

test.describe('Search Order', () => {
  test.beforeEach(async ({ app }) => {
    await app.searchOrder.open()
  })

  test('should search an approved order', async ({ app }) => {
    const order: any = {
      number: 'VLO-G26SII',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'nome teste 1 sobrenome teste 1',
        email: 'teste1@dev.com',
      },
      payment: 'À Vista',
    }

    await app.searchOrder.searchOrder(order.number)

    await app.searchOrder.validateOrderResult(order)
    await app.searchOrder.validateStatusBadge(order.status)
  })

  test('should search a rejected order', async ({ app }) => {
    const order: any = {
      number: 'VLO-RQY8GO',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'teste 2 sobrenome teste 2',
        email: 'teste2@dev.com',
      },
      payment: 'À Vista',
    }

    await app.searchOrder.searchOrder(order.number)

    await app.searchOrder.validateOrderResult(order)
    await app.searchOrder.validateStatusBadge(order.status)
  })

  test('should search an order in analysis', async ({ app }) => {
    const order: any = {
      number: 'VLO-ACOIOU',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'teste 3 teste 3 sobrenome',
        email: 'teste3@dev.com',
      },
      payment: 'À Vista',
    }

    await app.searchOrder.searchOrder(order.number)

    await app.searchOrder.validateOrderResult(order)
    await app.searchOrder.validateStatusBadge(order.status)
  })

  test('should display an error message when the order is not found', async ({ app }) => {
    const order = generateOrderCode()

    await app.searchOrder.searchOrder(order)
    await app.searchOrder.validateErrorMessage()
  })

  test('should display an error message when the order number format is invalid', async ({ app }) => {
    const orderCode = 'ABC123'

    await app.searchOrder.searchOrder(orderCode)
    await app.searchOrder.validateErrorMessage()
  })
})
