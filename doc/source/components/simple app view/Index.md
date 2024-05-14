# Simple app view

- [x] Show app information
- [x] App actions
    - [x] Start app
- [x] Update app output through web sockets
- [x] See output

# Filters / Sorting / View

Filter, sorting and view todo lists.

## Filters

- [ ] Filter apps that are running
- [ ] Filter apps with output
- [ ] Filter apps by keywords

## Sorting

- [x] Sort alphabetically
    - [x] It's the default
    - [ ] Inverted sorting

- [ ] [Bug] Apps with output are not on top for some reason
<!-- 2024/05/13 -->
<!-- I was trying to update state on the frontend without useEffect -->
<!-- Now I'm trying to move the socket connection to the backend -->

- [x] Apps with output are on top
    - [ ] Apps that are currently running are on top
    - [ ] Apps that have stopped / terminated are below
- [ ] Sort by recently run to latest run

    - Condition
        The app has process model support
        - [ ] Simply check last updated on the 'process' model / table.

## View

- [ ] View apps by folder name
- [ ] View apps by display name(packageJson.displayName)
- [ ] View apps by package name

