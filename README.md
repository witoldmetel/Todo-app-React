# Fire Jira

## App Info

Fire Jira is an app that has essentially the core Jira's functionality. A project created to increase programming skills, implement new features, problem solving and manage the project.

## Demo Page

https://fire-jira.firebaseapp.com/

Login: joedoe@firejira.com  
Pass: firejira

## Main structure and principles

1. Names for newly created modules should follow pattern `[resource]-[?operation]` example `user-list`

2. For modules which will be inside other module use nested `modules` pattern `modules/user/modules/user-list/user-list.component.tsx`. (ONLY IF ITS NEEDED, LET'S TRY TO KEEP STRUCTURE AS FLAT AS POSSIBLE)

3. Store types of top-level entities in separate types module to avoid circular dependencies.

4. Module names for resources received from API should be unified and follow names from API. Example: Module for `/users` endpoints should include name `users`.

5. All styles should follow pattern `[resource].styles.ts` example `user.styles.ts` for each module.

6. Every const-like variable (consts, enums etc) should have name with CAPITAL_LETTERS.

7. Name convention:

- components: `[resource]-[?method].[?functionality].component.tsx` Example: `user.page.component.tsx` or `user-create.dialog.component.tsx`
- pages: `[module].page.component.tsx` => main component uses for route.
- styles: should be inside component where it's used.
- types: `[module].types.ts`, should not be created for nested modules.
- constants: `constants.ts`, all constants variables reusable in scope of module.
- reusable hooks: `use-[functionality].ts` ==> should be stored in `src/hooks`
- local hooks: `use-[functionality].hook.ts` ==> should be stored in local module directory
- resusable components: like button, label etc ==> insert in `src/shared/components/[componentGroupName]/*.ts(x)` example `src/shared/components/errors/errors.component.tsx`
- resusable validators/utils: insert directly in `src/shared` example `src/shared/utils.ts`
- tests: `[module].test.ts(x)` ==> insert in `_tests_` for each module

## Firestore (Firebase) configuration

In `services` folder you need to add file `firebaseConfig.ts` with your firebase configuration:

```ts
export const FIREBASE_CONFIG = {
  apiKey: 'your API key',
  authDomain: 'your auth domain',
  databaseURL: 'your database url',
  projectId: 'your project id'
};
```

You can take this configuration from `https://firebase.google.com/`

### Why I use firebase?

Firebase is back-end as service which mean that it allows us to do serveless computing. We don't have to set up our own server to build apps or websites.

- Cloud Functions for Firebase (It allows us to write and run server-side on firebase and that code can interact with other firebase services like database or authentication etc. Code wrote by us is packaged into function and deployed to firebase. Each function can do something different. In my app, I use it to set notifications. Firebase cloud functions are run on node.js environment (Node 8.0 - free version but depracated))

## Deployment

For deployment application, I used `firebase hosting` along with `github actions`. I prepared simple workflow YAML script for Node.js. For trigger that script, user have to push some changes to master branch.

**IMPORTANT NOTE**

Script worked only for WSL/ Ubuntu system

Reference: https://stackoverflow.com/questions/58362374/github-actions-how-to-run-services-on-windows-or-macos

## Storybook

I've started to write interactive documentation in `Storybook`. It isn't hosted yet so if you want to check it, you have to type the command:

```
yarn storybook
```

## Legacy code

If you wanna check legacy code, it's available on `legacy-branch`
