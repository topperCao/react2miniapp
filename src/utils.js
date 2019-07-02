// noop
export function noop() {}

// getWindow
const fakeWindow = {};
export function getWindow() {
    try {
        if (window){
            return window;
        }
    /* istanbul ignore next  */
    } catch (e) {/*kill*/}
    try {
        if (global){
            return global;
        }
    /* istanbul ignore next  */
    } catch (e) {/*kill*/}
    return fakeWindow;
}


