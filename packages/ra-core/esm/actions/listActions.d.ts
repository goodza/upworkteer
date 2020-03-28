/// <reference types="react" />
import { Identifier } from '../types';
export declare const CRUD_CHANGE_LIST_PARAMS = "RA/CRUD_CHANGE_LIST_PARAMS";
export interface ListParams {
    sort: string;
    order: string;
    page: number;
    perPage: number;
    filter: any;
    displayedFilters: any;
}
export interface ChangeListParamsAction {
    readonly type: typeof CRUD_CHANGE_LIST_PARAMS;
    readonly payload: ListParams;
    readonly meta: {
        resource: string;
    };
}
export declare const changeListParams: (resource: string, params: ListParams) => ChangeListParamsAction;
export declare const SET_LIST_SELECTED_IDS = "RA/SET_LIST_SELECTED_IDS";
export interface SetListSelectedIdsAction {
    readonly type: typeof SET_LIST_SELECTED_IDS;
    readonly payload: Identifier[];
    readonly meta: {
        resource: string;
    };
}
export declare const setListSelectedIds: (resource: string, ids: import("react").ReactText[]) => SetListSelectedIdsAction;
export declare const TOGGLE_LIST_ITEM = "RA/TOGGLE_LIST_ITEM";
export interface ToggleListItemAction {
    readonly type: typeof TOGGLE_LIST_ITEM;
    readonly payload: any;
    readonly meta: {
        resource: string;
    };
}
export declare const toggleListItem: (resource: string, id: any) => ToggleListItemAction;
