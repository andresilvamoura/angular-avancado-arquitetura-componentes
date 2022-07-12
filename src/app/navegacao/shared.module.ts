import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';


// 01 - metadado que indica se tratar de um módulo
@NgModule({
    // 03 - descrever as capacidades do meta-dado
    declarations: [
        MenuComponent,
        HomeComponent,
        FooterComponent,
    ], // declarar os componentes dessse módulo
    imports: [
        CommonModule, // importe obrigatorio para indicar que se trata de um modulo
        RouterModule, // importa pois usamos links
    ], // declarar as dependencias desse módulo
    exports: [
        // indicar o que o módulo irá exportar
        MenuComponent,
        HomeComponent,
        FooterComponent,
    ]
})

// 02 - exportar a classe
export class SharedModule {

}