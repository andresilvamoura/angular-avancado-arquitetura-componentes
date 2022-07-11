import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProdutoDashboardComponent } from "./produto-dashboard/produto-dashboard.component";
import { ProdutoRountingModule } from "./produto.route";

@NgModule({
    declarations: [
        ProdutoDashboardComponent
    ],
    imports: [
        CommonModule,
        ProdutoRountingModule
    ],
    exports: [],
})

export class ProdutoModule { }