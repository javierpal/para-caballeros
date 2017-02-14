import { trigger, state, style, transition, animate } from '@angular/core';

export const search =
    trigger('search', [
        state('hidden', style({
            width: '0px'
        })),
        state('active',   style({
            width: '100px'
        })),
        transition('hidden => active', animate('100ms ease-in')),
        transition('active => hidden', animate('100ms ease-out'))
    ])
;