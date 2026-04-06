import { test, expect } from '@playwright/test';

test('should be able to search for an order', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Velô Sprint', level: 1 })).toBeVisible({ timeout: 15_000 });
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();
    await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-G26SII');
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
    await expect(page.getByTestId('order-result-VLO-G26SII')).toMatchAriaSnapshot(`
        - img
        - paragraph: Pedido
        - paragraph: VLO-G26SII
        - img
        - text: APROVADO
        - img "Velô Sprint"
        - paragraph: Modelo
        - paragraph: Velô Sprint
        - paragraph: Cor
        - paragraph: Glacier Blue
        - paragraph: Interior
        - paragraph: cream
        - paragraph: Rodas
        - paragraph: aero Wheels
        - heading "Dados do Cliente" [level=4]
        - paragraph: Nome
        - paragraph: nome teste 1 sobrenome teste 1
        - paragraph: Email
        - paragraph: teste1@dev.com
        - paragraph: Loja de Retirada
        - paragraph
        - paragraph: Data do Pedido
        - paragraph: /\\d+\\/\\d+\\/\\d+/
        - heading "Pagamento" [level=4]
        - paragraph: À Vista
        - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `);
});