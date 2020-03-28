(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/ra-language-french/index.js":
/*!**************************************************!*\
  !*** ./node_modules/ra-language-french/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    ra: {
        action: {
            add_filter: 'Ajouter un filtre',
            add: 'Ajouter',
            back: 'Retour',
            bulk_actions:
                '%{smart_count} selectionné |||| %{smart_count} selectionnés',
            cancel: 'Annuler',
            clear_input_value: 'Vider le champ',
            clone: 'Dupliquer',
            confirm: 'Confirmer',
            create: 'Créer',
            delete: 'Supprimer',
            edit: 'Éditer',
            export: 'Exporter',
            list: 'Liste',
            refresh: 'Actualiser',
            remove_filter: 'Supprimer ce filtre',
            remove: 'Supprimer',
            save: 'Enregistrer',
            search: 'Rechercher',
            show: 'Afficher',
            sort: 'Trier',
            undo: 'Annuler',
            expand: 'Étendre',
            close: 'Fermer',
        },
        boolean: {
            true: 'Oui',
            false: 'Non',
            null: '',
        },
        page: {
            create: 'Créer %{name}',
            dashboard: 'Tableau de bord',
            edit: '%{name} #%{id}',
            error: 'Un problème est survenu',
            list: '%{name}',
            loading: 'Chargement',
            not_found: 'Page manquante',
            show: '%{name} #%{id}',
            empty: 'Pas encore de %{name}.',
            invite: 'Voulez-vous en créer un ?',
        },
        input: {
            file: {
                upload_several:
                    'Déposez les fichiers à uploader, ou cliquez pour en sélectionner.',
                upload_single:
                    'Déposez le fichier à uploader, ou cliquez pour le sélectionner.',
            },
            image: {
                upload_several:
                    'Déposez les images à uploader, ou cliquez pour en sélectionner.',
                upload_single:
                    "Déposez l'image à uploader, ou cliquez pour la sélectionner.",
            },
            references: {
                all_missing: 'Impossible de trouver des données de références.',
                many_missing:
                    'Au moins une des références associées semble ne plus être disponible.',
                single_missing:
                    'La référence associée ne semble plus disponible.',
            },
            password: {
                toggle_visible: 'Cacher le mot de passe',
                toggle_hidden: 'Montrer le mot de passe',
            },
        },
        message: {
            about: 'Au sujet de',
            are_you_sure: 'Êtes-vous sûr ?',
            bulk_delete_content:
                'Êtes-vous sûr(e) de vouloir supprimer cet élément ? |||| Êtes-vous sûr(e) de vouloir supprimer ces %{smart_count} éléments ?',
            bulk_delete_title:
                'Supprimer %{name} |||| Supprimer %{smart_count} %{name}',
            delete_content:
                'Êtes-vous sûr(e) de vouloir supprimer cet élément ?',
            delete_title: 'Supprimer %{name} #%{id}',
            details: 'Détails',
            error:
                "En raison d'une erreur côté navigateur, votre requête n'a pas pu aboutir.",
            invalid_form: "Le formulaire n'est pas valide.",
            loading:
                'La page est en cours de chargement, merci de bien vouloir patienter.',
            no: 'Non',
            not_found:
                "L'URL saisie est incorrecte, ou vous avez suivi un mauvais lien.",
            yes: 'Oui',
        },
        navigation: {
            no_results: 'Aucun résultat',
            no_more_results:
                'La page numéro %{page} est en dehors des limites. Essayez la page précédente.',
            page_out_of_boundaries: 'La page %{page} est en dehors des limites',
            page_out_from_end: 'Fin de la pagination',
            page_out_from_begin: 'La page doit être supérieure à 1',
            page_range_info: '%{offsetBegin}-%{offsetEnd} sur %{total}',
            page_rows_per_page: 'Lignes par page :',
            next: 'Suivant',
            prev: 'Précédent',
        },
        auth: {
            auth_check_error: 'Merci de vous connecter pour continuer',
            user_menu: 'Profil',
            username: 'Identifiant',
            password: 'Mot de passe',
            sign_in: 'Connexion',
            sign_in_error: "Échec de l'authentification, merci de réessayer",
            logout: 'Déconnexion',
        },
        notification: {
            updated:
                'Élément mis à jour |||| %{smart_count} élements mis à jour',
            created: 'Élément créé',
            deleted: 'Élément supprimé |||| %{smart_count} élements supprimés',
            bad_item: 'Élément inconnu',
            item_doesnt_exist: "L'élément n'existe pas",
            http_error: 'Erreur de communication avec le serveur',
            data_provider_error:
                'Erreur dans le dataProvider. Plus de détails dans la console.',
            i18n_error:
                'Erreur de chargement des traductions pour la langue sélectionnée',
            canceled: 'Action annulée',
            logged_out: 'Votre session a pris fin, veuillez vous reconnecter.',
        },
        validation: {
            required: 'Ce champ est requis',
            minLength: 'Minimum %{min} caractères',
            maxLength: 'Maximum %{max} caractères',
            minValue: 'Minimum %{min}',
            maxValue: 'Maximum %{max}',
            number: 'Doit être un nombre',
            email: 'Doit être un email',
            oneOf: 'Doit être au choix: %{options}',
            regex: 'Doit respecter un format spécifique (regexp): %{pattern}',
        },
    },
};


/***/ }),

/***/ "./src/i18n/fr.js":
/*!************************!*\
  !*** ./src/i18n/fr.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ra_language_french__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ra-language-french */ "./node_modules/ra-language-french/index.js");
/* harmony import */ var ra_language_french__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ra_language_french__WEBPACK_IMPORTED_MODULE_2__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({
  simple: {
    action: {
      close: 'Fermer',
      resetViews: 'Réinitialiser des vues'
    },
    'create-post': 'Nouveau post'
  }
}, ra_language_french__WEBPACK_IMPORTED_MODULE_2___default.a, {
  resources: {
    posts: {
      name: 'Article |||| Articles',
      fields: {
        average_note: 'Note moyenne',
        body: 'Contenu',
        comments: 'Commentaires',
        commentable: 'Commentable',
        commentable_short: 'Com.',
        created_at: 'Créé le',
        notifications: 'Destinataires de notifications',
        nb_view: 'Nb de vues',
        password: 'Mot de passe (si protégé)',
        pictures: 'Photos associées',
        published_at: 'Publié le',
        teaser: 'Description',
        tags: 'Catégories',
        title: 'Titre',
        views: 'Vues',
        authors: 'Auteurs'
      }
    },
    comments: {
      name: 'Commentaire |||| Commentaires',
      fields: {
        body: 'Contenu',
        created_at: 'Créé le',
        post_id: 'Article',
        author: {
          name: 'Auteur'
        }
      }
    },
    users: {
      name: 'User |||| Users',
      fields: {
        name: 'Name',
        role: 'Role'
      }
    }
  },
  post: {
    list: {
      search: 'Recherche'
    },
    form: {
      summary: 'Résumé',
      body: 'Contenu',
      miscellaneous: 'Extra',
      comments: 'Commentaires'
    },
    edit: {
      title: 'Article "%{title}"'
    }
  },
  comment: {
    list: {
      about: 'Au sujet de'
    }
  },
  user: {
    list: {
      search: 'Recherche'
    },
    form: {
      summary: 'Résumé',
      security: 'Sécurité'
    },
    edit: {
      title: 'Utilisateur "%{title}"'
    }
  }
}));

/***/ })

}]);
//# sourceMappingURL=0.js.map