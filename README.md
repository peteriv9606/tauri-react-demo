Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


# Issue
![image](https://github.com/user-attachments/assets/4eb00ee3-8c9e-4251-bb6a-8a9f322dd69e)

The following issue arises - the react state resets after deep-link & single-instance plugins detect an invoke.

This is tested under `Windows` OS using the following setup:

- init Tauri app using the quick-start guide;
- add single-instance plugin and setup according guidelines;
- add deep-linking plugin and setup according guidelines;
- add `listener` hook to receive events from BE (Rust side), in order to capture the deep-link args;
- execute calculation according received data (example explained below)


in this case, we are sending `start "demo-react-state://?action=sub&number=5"` and then `"demo-react-state://?action=add&number=5"` through the terminal - what SHOULD happen is that initially, we have the number 0 as a result. After the first action `sub` with `number=5`, we should get a result of `-5`. This happens, but it is not from the expected behaviour, but by pure coincidence. Now triggering the next action `add` with `number=5` we SHOULD see that the total is equal to `0` but instead, the total is now `5`.

We can see that the console log placed inside the callback function prints out initial (maybe, not sure) state changes after execution. What's not logged, is the event itself - it has an `id` of `0` both times it was triggered.
