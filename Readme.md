## Live site

https://task-exercise.vercel.app/

## Setup Instructions

### Clone repo

git clone https://github.com/victornkpubre/task-exercise.git

### Copy Environment variables

Unzip Environment Folder - env.zip

copy files from env/frontend folder to task-exercise/frontend

copy files from env/backend folder to task-exercise/backend

### Install dependencies
**open cmd @ task-exercise**

cd backend 

npm install

npm run test (Optional)

npm run dev 


**open cmd @ task-exercise**

cd frontend 

npm install

npm run dev 


### Visit local site

Go to: http://localhost:8080/


## Database 
User
| Column      | Type   | Attributes                    |
| ----------- | ------ | ----------------------------- |
| `id`        | UUID   | Primary key, auto-generated   |
| `email`     | STRING | Unique, required              |
| `password`  | STRING | Hashed, required              |
| `name`      | STRING | Required                      |
| `createdAt` | DATE   | Defaults to current timestamp |

Task
| Column        | Type   | Attributes                                         |
| ------------- | ------ | -------------------------------------------------- |
| `id`          | UUID   | Primary key, auto-generated                        |
| `title`       | STRING | Required                                           |
| `description` | STRING | Optional                                           |
| `status`      | ENUM   | One of: `pending`, `in-progress`, `done`; required |
| `extras`      | JSONB  | Optional metadata (e.g. tags, dueDate, priority)   |
| `createdAt`   | DATE   | Defaults to current timestamp                      |
| `updatedAt`   | DATE   | Defaults to current timestamp                      |
| `userId`      | UUID   | Foreign key referencing `users(id)`; required      |


## Routes
Auth
| Method | Path       | Description                           |
| ------ | ---------- | ------------------------------------- |
| POST   | `/signup`  | Create a new user (sign up)           |
| POST   | `/signin`  | Sign in with email & password         |
| POST   | `/signout` | Sign out the user (noop if using JWT) |

Task
| Method | Path         | Description                          |
| ------ | ------------ | ------------------------------------ |
| POST   | `/tasks`     | Create a new task                    |
| GET    | `/tasks`     | Get all tasks for the signed-in user |
| PUT    | `/tasks/:id` | Update a task by ID (must own it)    |
| DELETE | `/tasks/:id` | Delete a task by ID (must own it)    |

## “What I'd build next if I had more time”

I would make the frontend code cleaner, build a better ci/cd configuration, imporve security, 

optimize the features and write test for the frontend
