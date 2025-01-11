export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** https://www.npmjs.com/package/@cypress/skip-test
       * `cy.skipOn('localhost')` */
      maybeGetToken(sessionName: string): Chainable<string> //If token exists, reuse it, if not exists, get a new one
      skipOn(
        nameOrFlag: string | boolean | (() => boolean),
        cb?: () => void
      ): Chainable<Subject>

      /** https://www.npmjs.com/package/@cypress/skip-test
       * `cy.onlyOn('localhost')` */
      onlyOn(
        nameOrFlag: string | boolean | (() => boolean),
        cb?: () => void
      ): Chainable<Subject>
    }
  }
}
