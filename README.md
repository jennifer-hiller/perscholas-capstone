[product-screenshot]: screenshot.jpg

# JIRA clone

## About The Project

![Product Name Screen Shot][product-screenshot]

### Installing

Be sure to put a .env file in the `backend` folder. This should contain two variables: `ATLAS_URI` and `PORT`. `ATLAS_URI` needs to point to your database on Mongo Atlas.

Run `cd backend` and run `npm install`
Then cd back to root and run `cd frontend` and run `npm install`

### Usage

Run `cd` back to root.

Run `cd backend` and run `npm run dev` to run the backend.

If you would like to seed the backend first, run `npm run seed`.

In another terminal, run `cd frontend` and run `npm run dev` to run the frontend.

This simplified taskmaster app will grant users the ability to:

- Sign up new users
- Sign in as an existing user
- Create and assign tasks to existing users
- Edit tasks, including reassigning
- Deleting tasks
- Commenting on tasks
- Chuck Norris joke generator

Future releases will include:

- Encrypted passwords
- Drag-and-drop for tasks into the column of the user's choice
- Better front end graphical design

## Roadmap

- Adding Tasks
- Viewing Tasks
- Editing Tasks
- Deleting Tasks
- Signing up new users
- Logging in as an existing user
- Viewing users' tasks and comments
- Adding Comments
