### Set OS settings

https://github.com/docker-library/elasticsearch/issues/111#issuecomment-268511769
```bash
# set OS settings
sudo sysctl -w vm.max_map_count=262144
```

### Create credentials file

https://httpd.apache.org/docs/2.4/programs/htpasswd.html
```bash
htpasswd -c -db .htpasswd $USER $PASS
```

elastic need same ammount of ram for Xms and Xmx
```yaml
elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:6.4.3
  environment:
    - bootstrap.memory_lock=true
    - "ES_JAVA_OPTS=-Xms1024m -Xmx1024m"
```

### Debug

for debugging purposes you can jump into any container like this
https://medium.com/the-code-review/run-bash-or-any-command-in-a-docker-container-9a1e7f0ec204
```bash
docker exec -i -t container_name /bin/bash
```

then use **yum** for **elastic** and **apt** for **nginx** to install **curl, less**, etc

### references

https://christianfei.com/posts/setup-nginx-as-a-reverse-proxy-with-basic-auth-for-an-upstream/
https://dev.to/domysee/setting-up-a-reverse-proxy-with-nginx-and-docker-compose-29jg
https://stackoverflow.com/questions/33639138/docker-networking-nginx-emerg-host-not-found-in-upstream

https://serverfault.com/questions/698559/disable-authentication-for-http-options-method-preflight-request-in-nginx


nginx prerender
https://gist.github.com/Stanback/6998085

ngingx cache
https://serversforhackers.com/c/nginx-caching