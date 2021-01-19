ssh-add -l &>/dev/null
if [ "$?" == 2 ]; then
  test -r ~/.gnome-keyring && \
    source ~/.gnome-keyring && \
    export DBUS_SESSION_BUS_ADDRESS GNOME_KEYRING_CONTROL SSH_AUTH_SOCK GPG_AGENT_INFO GNOME_KEYRING_PID

  ssh-add -l &>/dev/null
  if [ "$?" == 2 ]; then
    (umask 066; echo `dbus-launch --sh-syntax` > ~/.gnome-keyring; gnome-keyring-daemon >> ~/.gnome-keyring)
    source ~/.gnome-keyring && \
    export DBUS_SESSION_BUS_ADDRESS GNOME_KEYRING_CONTROL SSH_AUTH_SOCK GPG_AGENT_INFO GNOME_KEYRING_PID
  fi
fi