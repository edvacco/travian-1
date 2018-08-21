import { roundP } from '../../utils';

const round = roundP(1000);

export default function culture(n: number) {
    return round(2000 * n ** 2);
}
