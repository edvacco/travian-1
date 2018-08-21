import { extend } from '../../utils';

import { Unit } from '../base';

import units from '../t4/units';

export default extend(units, [
    [   { c:[   75,   50, 100,  0] },
        { c:[   80,  100, 160,  0] },
        { c:[  100,  110, 140,  0] },
        { c:[  100,  140,  10,  0] },
        { c:[  350,  260, 180,  0] },
        { c:[  280,  340, 600,  0] },
        { c:[  700,  180, 400,  0] },
        { c:[  690, 1000, 400,  0] },
        { c:[30750,27200,45000, 0] },
        { c:[ 3500, 3000, 4500, 0] },
    ],
    [   { c:[   85,   65,   30, 0] },
        { c:[  125,   50,   65, 0] },
        { c:[   80,   65,  130, 0] },
        { c:[  140,   80,   30, 0] },
        { c:[  330,  170,  200, 0] },
        { c:[  280,  320,  260, 0] },
        { c:[  800,  150,  250, 0] },
        { c:[  660,  900,  370, 0] },
        { c:[35500,26600,25000, 0] },
        { c:[ 4000, 3500, 3200, 0] },
    ],
    [   { c:[   85,  100,   50, 0] },
        { c:[   95,   60,  140, 0] },
        { c:[  140,  110,   20, 0] },
        { c:[  200,  280,  130, 0] },
        { c:[  300,  270,  190, 0] },
        { c:[  300,  380,  440, 0] },
        { c:[  750,  370,  220, 0] },
        { c:[  590, 1200,  400, 0] },
        { c:[30750,45400,31000, 0] },
        { c:[ 3000, 4000, 3000, 0] },
    ],
]) as Unit[][];
