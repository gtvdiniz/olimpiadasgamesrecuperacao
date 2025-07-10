import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { VerComponent } from './componentes/ver/ver.component';
import { CriarComponent } from './componentes/criar/criar.component';
import { EditarComponent } from './componentes/editar/editar.component';

export const routes: Routes = [
  {
   path: '' ,
   component: PrincipalComponent
  },
  {
    path: 'ver/:Id',
    component: VerComponent
  },
  {
    path: 'criar',
    component: CriarComponent
  },
  {
    path: 'editar/:Id',
    component: EditarComponent
  }
];
