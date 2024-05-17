# Stop

- [ ] Stop apps
    
Note that some apps refuse to take signal 15(gentle stop, gives the app time to clean up) to stop, tested that it doesn't stops nextjs apps for example.

I'll have to use signal 9 for every app / shell.

Maybe it's because they run in a shell, but that can't be traded because a lot of apps have to do work on their scripts before starting.
