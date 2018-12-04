
interface NodeRequire {
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

import * as lodash from 'lodash'

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
declare global {
    const _: typeof lodash
}


interface Window {
    io?: any;
}