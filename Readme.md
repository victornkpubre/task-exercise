

Auth Routes (/api)
Method	Path	Description
POST	/signup	Create a new user (sign up)
POST	/signin	Sign in with email & password
POST	/signout	Sign out the user (noop if JWT)

Task Routes (/api/tasks)
Method	 Path	Description
POST /tasks	Create a new task
GET	/tasks	Ge all tasks for the signed-in user
PUT	/tasks/:id	Update a task by ID (must own it)
DELETE	/tasks/:id	Delete a task by ID (must own it)