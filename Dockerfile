# Public website image: a pre-built static export (out/, produced by
# `npm run build` in CI -- see .github/workflows/build-and-push.yml)
# served by nginx. Deliberately NOT a Node.js build stage here: the
# CI workflow already checks out the sibling adg_prod/
# ai-decision-governance repos needed by scripts/sync-content.ts and
# runs the Next.js build on the runner, then hands this Dockerfile
# just the resulting out/ directory -- keeping this image tiny
# (nginx + static files only) and avoiding the need to vendor two
# sibling repos into the Docker build context.
#
# Published PUBLIC on GHCR (ghcr.io/iharijono/adg_web), same pattern
# as ai-decision-governance's docker/demo/Dockerfile -- the demo EC2
# instance pulls it with zero credentials.
FROM nginx:1.27-alpine

COPY out/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
