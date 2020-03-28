import { Location } from 'history';
import { match as Match } from 'react-router-dom';
import { RedirectionSideEffect } from '../sideEffect';
import { Record } from '../types';
export interface CreateControllerProps {
    loading: boolean;
    loaded: boolean;
    saving: boolean;
    defaultTitle: string;
    save: (record: Partial<Record>, redirect: RedirectionSideEffect, callbacks?: {
        onSuccess: () => void;
        onFailure: (error: string | {
            message?: string;
        }) => void;
    }) => void;
    resource: string;
    basePath: string;
    record?: Partial<Record>;
    redirect: RedirectionSideEffect;
    version: number;
}
export interface CreateProps {
    basePath: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    location?: Location;
    match?: Match;
    record?: Partial<Record>;
    resource: string;
    successMessage?: string;
}
/**
 * Prepare data for the Create view
 *
 * @param {Object} props The props passed to the Create component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Create view
 *
 * @example
 *
 * import { useCreateController } from 'react-admin';
 * import CreateView from './CreateView';
 *
 * const MyCreate = props => {
 *     const controllerProps = useCreateController(props);
 *     return <CreateView {...controllerProps} {...props} />;
 * }
 */
declare const useCreateController: (props: CreateProps) => CreateControllerProps;
export default useCreateController;
export declare const getRecord: ({ state, search }: {
    state: any;
    search: any;
}, record?: any) => any;
