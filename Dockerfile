FROM node:22-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

RUN mkdir /tretenreisen
WORKDIR /tretenreisen

ADD . .

RUN yarn workspaces focus @treten-reisen/strapi --production
RUN yarn workspace @treten-reisen/strapi build

ENTRYPOINT [ "yarn", "workspace", "@treten-reisen/strapi", "start" ]


