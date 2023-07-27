WAIT_HOSTS_TIMEOUT="${WAIT_HOSTS_TIMEOUT:-1}" 
HOST=${WAIT_HOSTS%:*} # Remove the smallest suffix of the expansion matching the pattern.
PORT=${WAIT_HOSTS#*:} # Remove the smallest prefix of the expansion matching the pattern.

while ! nc -z $HOST $PORT;
    do
        echo "Host $HOST:$PORT not ready!";
        sleep $WAIT_HOSTS_TIMEOUT;
    done;
echo "Host $WAIT_HOSTS is ready!";