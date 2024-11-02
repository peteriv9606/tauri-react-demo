Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


# Issue
![image](https://github.com/user-attachments/assets/5893789d-055a-4d7a-83ba-ed2b540502de)


The following issue arises - the react state resets after deep-link & single-instance plugins detect an invoke.

This is tested under `Windows` OS using the following setup (steps to reproduce):

- init Tauri app using the quick-start guide;
- add `single-instance` plugin and setup according guidelines;
- add `deep-link` plugin and setup according guidelines;
- add `listener` hook to receive events from BE (Rust side), in order to capture the `deep-link` args;
- execute calculation according received data (example explained below):


in this case, we are sending:

`start "demo-react-state://?action=add&number=1"`;
`start "demo-react-state://?action=add&number=2"`;
`start "demo-react-state://?action=add&number=3"`;
`start "demo-react-state://?action=add&number=4"`;
`start "demo-react-state://?action=add&number=5"`;

through the terminal - what SHOULD happen is that initially, we have the number 0 as a result. 
After the first action `ad` with `number=1`, we should get a result of `1`. This happens, but it is not from the expected behaviour, but by pure coincidence. 

Now triggering the next actions `add` with numbers `2`, `3`, `4` and `5` we SHOULD see that the total increments accordingly (1+2=3; 3+3=6; 6+4=10; 10+5=15), but instead, we see that the last (and total) numbers are both `5`.

We can see that the console log placed inside the callback function prints out initial (maybe, not sure) state changes after execution. What's also logged, is the event itself - it has an `id` of `0` every time the listener was triggered.
