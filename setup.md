# root directory

pnpm init
pnpm add -D typescript typescript-node

# ./tsconfig.base.json

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "jsx": "react-jsx",
    "moduleResolution": "node"
  }
}
```

# ./tsconfig.json

```json
{
  "extends": "./tsconfig.base.json"
}
```

# ./pnpm-workspace.yaml

```yaml
packages:
  - "./packages/**"
```

# ./packages

mkdir shared
pnpm init

# ./packages/shared/package.json

```json
{
  "name": "@pnpm-monorepo/shared"
}
```

# in ./packages, create application project

pnpm create vite

# ./packages/main/package.json

```json
{
  "name": "@pnpm-monorepo/main"
}
```

pnpm add @pnpm-monorepo/shared

# ./packages/main/App.tsx

```ts
import { sayHi } from "@pnpm-monorepo/shared";
```

# create eslint configuration

pnpm create @eslint/config

# set root as true

```js
module.exports = {
  root: true,
  ...
}
```

touch .eslintignore
echo -e "coverage\npublic\ndist\npnpm-lock.yaml\npnpm-workspace.yaml" > .eslintignore

# prettier

pnpm add -D eslint-config-prettier eslint-plugin-prettier

# eslintrc.js

```json
module.exports = {
  extends: [..., 'plugin:prettier/recommended'],
}
```
