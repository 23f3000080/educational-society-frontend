/* Browser shim for packages that expect Node-style globals. */
if (typeof globalThis.global === 'undefined') {
  globalThis.global = globalThis
}