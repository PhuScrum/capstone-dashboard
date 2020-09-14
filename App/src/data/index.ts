import * as nsw from './rfrNSW.json';
import * as qld from './rfrQLD.json';
import * as sa from './rfrSA.json';
import * as tas from './rfrTAS.json';
import * as vic from './rfrVIC.json';
import * as wa from './rfrWA.json';
// import { writeFileSync, readFileSync, readdir } from 'fs';

import { Data } from './dataType'

const data: Data[] = [
    nsw,
    qld,
    sa,
    tas,
    vic,
    wa
]

export default data