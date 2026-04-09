import { Page } from "@playwright/test";

export class SearchOrderPage {
    constructor(private page: Page) { }

    async searchOrder(orderNumber: string) {
        await this.page.locator('//label[text()="Número do Pedido"]/..//input').fill(orderNumber);
        await this.page.getByRole('button', { name: 'Buscar Pedido' }).click();
    }
}   