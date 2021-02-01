import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      /*{
        state: 'basic',
        role:'ADMIN',
        short_label: 'B',
        name: 'Gestion des incients',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'ValidateIncidentAdmin',
            name: 'Valider les incidents'
          },
          {
            state: 'InterfaceMap',
            name: 'Afficher sur la map'
          },
          {
            state: 'IncidentTable',
            name: 'Afficher sur la table'
          }
        ]
      },
      {
        state: 'basic',
        role:'ADMIN',
        short_label: 'B',
        name: 'Gestion des Professionnels',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'addUsers',
            name: 'Ajouter un professionnel'
          },
          {
            state: 'listUses',
            name: 'Liste des Prossionnels'
          }
        ]
      },*/
      {
        state: 'ValidateIncidentAdmin',
        role:'ADMIN',
        short_label: 'D',
        name: 'Valider les incidents',
        type: 'link',
        icon: 'ti-layout-grid2-alt'
      },
      {
        state: 'IncidentTable',
        role:'ADMIN',
        short_label: 'D',
        name: 'Consulter les incidents',
        type: 'link',
        icon: 'ti-layout-grid2-alt'
      },
      {
        state: 'addUsers',
        role:'ADMIN',
        short_label: 'D',
        name: 'Ajouter un professionnel',
        type: 'link',
        icon: 'ti-layout-grid2-alt'
      },
      {
        state: 'listUses',
        role:'ADMIN',
        short_label: 'D',
        name: 'Liste des Prossionnels',
        type: 'link',
        icon: 'ti-layout-grid2-alt'
      },
      {
        state: 'InterfaceGraphe',
        role:'ADMIN',
        short_label: 'D',
        name: 'Tableau de bord',
        type: 'link',
        icon: 'ti-home'
      },



      {
        state: 'ValiderIncidentPro',
        role:'USER',
        short_label: 'D',
        name: 'Affecter un statut',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'IncidentTable',
        role:'USER',
        short_label: 'D',
        name: 'Consulter les incidents',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'InterfaceGraphe',
        role:'USER',
        short_label: 'D',
        name: 'Tableau de bord',
        type: 'link',
        icon: 'ti-home'
      },

      

      {
        state: 'PublicInterface',
        role:'GrandPublic',
        short_label: 'D',
        name: 'Accueil',
        type: 'link',
        icon: 'ti-home'
      },

      {
        state: 'IncidentTable',
        role:'GrandPublic',
        short_label: 'D',
        name: 'Consulter les incidents',
        type: 'link',
        icon: 'ti-home'
      },

      {
        state: 'InterfaceGraphe',
        role:'GrandPublic',
        short_label: 'D',
        name: 'Tableau de bord',
        type: 'link',
        icon: 'ti-home'
      },
      

    ],
  },

];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
