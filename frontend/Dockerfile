FROM node:slim
MAINTAINER David Picarra <daviddcp@gmail.com>

# Slim start up
# Download and install yarn
# bzip2 and libfontconfig are needed for phantomjs
RUN apt-get update && \
  apt-get install -y --no-install-recommends bzip2 libfontconfig && \
  mkdir -p /opt/yarn/ && \
  wget https://yarnpkg.com/latest.tar.gz && \
  tar -zxf latest.tar.gz -C /opt/yarn/ && \
  rm latest.tar.gz && \
  apt-get autoremove -y && \
  rm -rf /var/lib/apt/lists/*

ENV PATH "$PATH:/opt/yarn/dist/bin"

# Install packages using Yarn
ADD package.json yarn.lock /opt/app/
RUN cd /opt/app/ && yarn
WORKDIR /opt/app/

COPY . /opt/app

CMD ["npm", "run", "dev"]
