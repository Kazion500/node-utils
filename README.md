# Node Utils

## Description

This is a collection of utilities when create Rest or Graphql apis. It is a work in progress and will be updated as I add more functionality.

## Installation

```bash
pnpm add @kazion/node-utils
yarn add @kazion/node-utils
```

## Usage

```typescript
import { hashPassword } from "@kazion/node-utils";

const hashedPassword = await hashPassword("password");
```

## Functions

### createGraphqlTestClient

Creates a test client for testing graphql resolvers.

```typescript
import { createGraphqlTestClient } from "@kazion/node-utils";

const { query, mutate } = createGraphqlTestClient(schema);
```

### formatZodError

Formats zod errors into a readable format.

```typescript
import { formatZodError } from "@kazion/node-utils";

const formattedError = formatZodError(error);
```

### logger

Creates a logger.

```typescript
import { logger } from "@kazion/node-utils";

const log = logger("my-logger");
```

### createToken

Creates a jwt token.

```typescript
import { createToken } from "@kazion/node-utils";

const token = createToken({ id: 1 });
```

### decodeToken

Decodes a jwt token.

```typescript
import { decodeToken } from "@kazion/node-utils";

const decodedToken = decodeToken(token);
```

### verifyToken

Verifies a jwt token.

```typescript
import { verifyToken } from "@kazion/node-utils";

const decodedToken = verifyToken(token);
```

### hashPassword

Hashes a password using bcrypt.

```typescript
import { hashPassword } from "@kazion/node-utils";

const hashedPassword = await hashPassword("password");
```

### comparePassword

Compares a password to a hashed password using bcrypt.

```typescript
import { comparePassword } from "@kazion/node-utils";

const isPasswordValid = await comparePassword("password", hashedPassword);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author

- Patrick Kabwe
- patrickckabwe@gmail.com
