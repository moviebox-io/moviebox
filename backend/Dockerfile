FROM node:slim
MAINTAINER David Picarra <daviddcp@gmail.com>

# Slim start up
# Download and install yarn
RUN mkdir -p /opt/yarn/ && \
  wget https://yarnpkg.com/latest.tar.gz && \
  tar -zxf latest.tar.gz -C /opt/yarn/ && \
  rm latest.tar.gz

ENV PATH "$PATH:/opt/yarn/dist/bin"

# Install packages using Yarn
ADD package.json yarn.lock /opt/server/
RUN cd /opt/server/ && yarn
WORKDIR /opt/server/

COPY . /opt/server

CMD ["npm", "run", "dev"]
