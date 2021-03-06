import * as tape from 'tape';

import factory from './factory';
import TRIBES from '../../t3/tribes';
import { almostEqual } from '../../../utils/test';

import combat from './combat';
import units from '../units';
import buildings from '../buildings';

const f = factory({ units, buildings });

tape('combat (new upgrade formula)', (t) => {
    const { upgrade } = combat.Army.prototype;
    almostEqual.call(t, upgrade(units[0][0], 40, 0), 40.0021);
    almostEqual.call(t, upgrade(units[0][0], 40, 20), 52.3623);
    t.end();
});

tape('combat (e2e)', (t) => {
    t.test('minor change in upgrades', t => {
        const { offLosses, defLosses } = combat.combat(f.place({}), [
            f.def({ tribe: TRIBES.TEUTONS, numbers: [999999] }),
            f.off({ tribe: TRIBES.ROMANS, numbers: [499999] }),
        ])[0];
        t.equal(offLosses, 1, 'off');
        t.equal(Math.round(defLosses * 999999), 999931, 'def');
        t.end();
    });
    /**
     * off = 670175 * 65.0021 + 20 * 70.0125
     * def = 999999 * 65.0021 + 10
     * pop_ratio = 2
     * morale = round(pop_ratio ^ (-0.2 * off / def); 3)
     * percent = (off * morale / def) ^ 1.5 / 2
     * cata_morale = 2 ^ -0.3
     */
    t.test('catapults with remorale', t => {
        t.equal(combat.combat(
            f.place({ pop: 1000 }),
            [ f.def({ tribe: TRIBES.ROMANS, numbers: [0,999999] }),
              f.off({ tribe: TRIBES.GAULS, numbers: [0,670175,0, 0,0,0, 0,20], pop: 2000, targets: [5] }),
            ])[0].buildings[0], 0);
        t.equal(combat.combat(
            f.place({ pop: 1000 }),
            [ f.def({ tribe: TRIBES.ROMANS, numbers: [0,999999] }),
              f.off({ tribe: TRIBES.GAULS, numbers: [0,670174,0, 0,0,0, 0,20], pop: 2000, targets: [5] }),
            ])[0].buildings[0], 1);
        t.end();
    });

    t.test('hero is attacking', t => {
        const result = combat.combat(
            f.place({ }),
            [ f.def({ tribe: TRIBES.GAULS, numbers: [100] }),
              f.off({ tribe: TRIBES.ROMANS,
                    hero: { self: 20, items: [{ str: 1000 }] } }),
            ]);
        t.equal(result[0].offLosses, 1, 'off');
        almostEqual.call(t, result[0].defLosses, (3100 / 4010.21) ** 1.5, 'def');
        t.end();
    });

    t.end();
});
