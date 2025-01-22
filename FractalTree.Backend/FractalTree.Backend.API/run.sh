docker volume create ftdata
docker run -it --rm -p 32772:8080 -v ftdata:/ftdata/ --name fractaltree_dev00 fractaltree