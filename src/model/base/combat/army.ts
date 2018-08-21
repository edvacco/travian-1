import { roundP, zipWith, zipWith3 } from '../../../utils';

import { Unit, isSpy, isRam, isCatapult } from '../../types';
import { Side } from './types';
import CombatPoints from './points';

const roundStat = roundP(1e-4);
const add = (a: number, b: number): number => a + b;

export default class Army<S extends Side> {
    protected units: Unit[];
    protected numbers: number[];
    protected upgrades: number[];
    constructor(side: S) {
        this.units = side.units;
        this.numbers = side.numbers;
        this.upgrades = side.upgrades;
    }
    applyLosses(percent: number) {
        this.numbers = this.numbers.map(n => Math.round(n * (1 - percent)));
    }
    upgrade(unit: Unit, stat: number, level: number): number {
        return roundStat(stat * 1.015 ** level);
    }
    foldMap<P=number>(
        f: (unit: Unit, stat: number, level: number) => P,
        a: (a: P, b: P) => P,
        initial: P
    ) {
        return zipWith3(
            f,
            this.units,
            this.numbers,
            this.upgrades
        ).reduce(a, initial);
    }
    getTotal(): number {
        return this.foldMap((_, number) => number, add, 0);
    }
    getOff(): CombatPoints {
        return this.foldMap(
            (unit, number, upgrade) => {
                const points = number * this.upgrade(unit, unit.a, upgrade);
                return unit.i
                    ? new CombatPoints(points, 0)
                    : new CombatPoints(0, points);
            }, CombatPoints.add, CombatPoints.zero());
    }
    getDef(): CombatPoints {
        return this.foldMap(
            (unit, number, upgrade) => new CombatPoints(
                this.upgrade(unit, unit.di, upgrade),
                this.upgrade(unit, unit.dc, upgrade)
            ).mul(number),
            CombatPoints.add, CombatPoints.zero());
    }
    isScan(): boolean {
        return zipWith(
            (spy, zero) => zero || spy,
            this.units.map(isSpy),
            this.numbers.map(u => u === 0)
        ).every(Boolean);
    }
    get scan(): number {
        return this.foldMap(
            (unit, number, upgrade) => isSpy(unit)
                ? number * this.upgrade(unit, unit.s, upgrade)
                : 0,
            add, 0
        );
    }
    get scanDef(): number {
        return this.foldMap(
            (unit, number, upgrade) => isSpy(unit)
                ? number * this.upgrade(unit, unit.ds, upgrade)
                : 0,
            add, 0
        );
    }
    get rams(): [number, number] {
        for (let i = 0; i < 10; i++) {
            if (isRam(this.units[i])) {
                return [this.numbers[i], this.upgrades[i]];
            }
        }
        return [0, 0];
    }
    get cats(): [number, number] {
        for (let i = 0; i < 10; i++) {
            if (isCatapult(this.units[i])) {
                return [this.numbers[i], this.upgrades[i]];
            }
        }
        return [0, 0];
    }
}