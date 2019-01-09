FROM nginx

LABEL maintainer="rodislav@gmail.com"

COPY LICENSE.lic /usr/share/nginx/html/license.lic

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
