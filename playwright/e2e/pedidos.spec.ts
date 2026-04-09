import { test, expect } from '@playwright/test';
import { generateOrderNumber} from '../support/helpers';
import { SearchOrderPage } from '../support/pages/SearchOrderPage';

test.describe('Order Lookup', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Velô Sprint', level: 1 })).toBeVisible({ timeout: 15_000 });
        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();

    });

    test('should be able to search for an approved order', async ({ page }) => {
        //Test Data
        const order = {
            number: 'VLO-G26SII',
            status: 'APROVADO',
            color: 'Glacier Blue',
            interior: 'cream',
            wheels: 'aero Wheels',
            customer: {
                name: 'nome teste 1 sobrenome teste 1',
                email: 'teste1@dev.com',
            },
            store: 'Loja de Retirada',
            payment: 'À Vista',
        };
        const searchOrderPage = new SearchOrderPage(page);
        await searchOrderPage.searchOrder(order.number);   

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: ${order.interior}
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: ${order.store}
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status });
        await expect(statusBadge).toHaveClass(/bg-green-100 text-green-700/);

        const statusIcon = statusBadge.locator('svg');
        await expect(statusIcon).toHaveClass(/lucide-circle-check-big/);
    });

    test('should be able to search for a reproved order', async ({ page }) => {
        //Test Data
        const order = {
            number: 'VLO-RQY8GO',
            status: 'REPROVADO',
            color: 'Midnight Black',
            interior: 'cream',
            wheels: 'sport Wheels',
            customer: {
                name: 'teste 2 sobrenome teste 2',
                email: 'teste2@dev.com',
            },
            store: 'Loja de Retirada',
            payment: 'À Vista',
        };

        const searchOrderPage = new SearchOrderPage(page);
        await searchOrderPage.searchOrder(order.number);

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: ${order.interior}
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: ${order.store}
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status });
        await expect(statusBadge).toHaveClass(/bg-red-100 text-red-700/);

        const statusIcon = statusBadge.locator('svg');
        await expect(statusIcon).toHaveClass(/lucide-circle-x/);
    });

    test('should be able to search for an order in analysis', async ({ page }) => {
        //Test Data
        const order = {
            number: 'VLO-ACOIOU',
            status: 'EM_ANALISE',
            color: 'Lunar White',
            interior: 'cream',
            wheels: 'aero Wheels',
            customer: {
                name: 'teste 3 teste 3 sobrenome',
                email: 'teste3@dev.com',
            },
            store: 'Loja de Retirada',
            payment: 'À Vista',
        };

        const searchOrderPage = new SearchOrderPage(page);
        await searchOrderPage.searchOrder(order.number);

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: ${order.interior}
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status });
        await expect(statusBadge).toHaveClass(/bg-amber-100 text-amber-700/);

        const statusIcon = statusBadge.locator('svg');
        await expect(statusIcon).toHaveClass(/lucide-clock-icon/);

    });

    test('should display an error message when the order is not found', async ({ page }) => {
        //Test Data
        const orderNumber = generateOrderNumber();

        const searchOrderPage = new SearchOrderPage(page);
        await searchOrderPage.searchOrder(orderNumber);

        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);
    });
});