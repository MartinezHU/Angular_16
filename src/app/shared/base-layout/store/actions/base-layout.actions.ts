import { createAction, createActionGroup, props } from "@ngrx/store";


export const OpenSidebar = createAction('OpenSidebar', props<{ payload: boolean }>());