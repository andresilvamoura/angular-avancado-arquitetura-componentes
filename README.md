#  Curso Avançado de Angular - Arquitetura de Componentes.

##  Módulos 

Aplicativos Angular são modulares, seguindo um sistema chamado _Angular Modules_ ou _NgModules_. <br>

Cada aplicativo Angular tem pelo menos um módulo, o _módulo raiz_. Esse módulo deve conter as dependências mais básicas para não sobrecarrega-lo.  Independentemente de ser o módulo raiz, cada módulo é definido em uma classe marcada com **_@NgModule_** (uma decorator function). <br> <br>

**_@NgModule_** recebe um objeto (chamado metadados) com os seguintes atributos: <br><br>

*  **declarations:** um array contendo a lista de view classes que pertencem ao módulo
*  **exports:** um subconjunto de declarations que estará visível e utilizável nos componentes templates de outros módulos
*  **imports:** dependências requeridas por templates do módulo em questão
*  **providers:** array com uma lista de serviços disponibilizados pelo módulo atual que se tornam disponíveis globalmente para todos os módulos do aplicativo
*  **bootstrap:** array contendo apenas o módulo raiz. <br><br>

~~~~typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
    imports: [BrowserModule],
    providers: [Logger],
    declarations: [AppComponent],
    exports: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
~~~~
<br>

##  Módulos Compartilhados

A criação de módulos compartilhados permite organizar e otimizar seu código separando suas responsabilidades. <br> 

Você pode colocar diretivas, pipes e componentes comumente usados em um módulo e, em seguida, importar apenas esse módulo sempre que precisar em outras partes de seu aplicativo. <br>

No seguinte exemplo, os componentes de navegação de um aplicativo hipotético foram agrupados em uma classe e compartilhados: <br>

~~~~typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        MenuComponent,
        HomeComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [       
        MenuComponent,
        HomeComponent,
        FooterComponent,
    ]
})

export class SharedModule { }
~~~~
<br>

##  Módulos de Roteamento

Em um aplicativo de página única, você altera o que o usuário vê mostrando ou ocultando partes da exibição que correspondem a componentes específicos, em vez de ir ao servidor para obter uma nova página. <br>

Para criar um módulo de roteamento vamos colocar o decorator function **_@NgModule_** para indicar que se trata de um módulo.

Precisamos importar o Módulo de Roteamento(**RouterModule**), e configurar nossas rotas usando o **_Routes_**, Routes é a configuração de rota para o serviço de roteador, uma matriz de objetos usada para configurações de rotas. Segue exemplo: <br><br>

~~~~typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'sobre', component: SobreComponent },
    { path: 'cadastro', component: CadastroComponent },
];
@NgModule({
    imports: [
        RouterModule.forRoot(rootRouterConfig)
    ],
    exports: [
        RouterModule,
    ]
});
export class AppRountingModule { }
~~~~
<br>

##  Lazy Loading de Módulos

Por padrão, os Módulos são carregados assim que o aplicativo é iniciado.

Para aplicativos grandes com muitas rotas, usamos o carregamento tardio(**lazy loading**), um padrão de design que carrega os módulos conforme o necessário. <br>

O carregamento tardio ajuda a manter os tamanhos dos pacotes iniciais menores, o que, por sua vez, ajuda a diminuir os tempos de carregamento, ajudando também com a organização e manutenção do código. <br>

Para criar módulos com lazy loading no seu **_AppRoutingModule_**, usamos **loadChildren:**(em vez de **component:**) e depois usamos **.then()** atribuindo em seus parâmetros:  **m => m.SeuMódulo.**  **(then(m => m.SeuModule))**. Como no exemplo a seguir: <br>

~~~~typescript
const rootRouterConfig: Routes = [
    { 
	  path: 'produtos',
       loadChildren: () => import('./demos/arquitetura-componentes/produto.module')
       .then(m => m.ProdutoModule)
    },
];
~~~~

E no seu arquivo de módulo iremos usar a propriedade **forChild**(em vez de **forRoot**). <br>

~~~~typescript
const produtoRouterConfig: Routes = [
    { path: '', component: ProdutoDashboardComponent }
]
@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [
        RouterModule
    ],
});
~~~~
