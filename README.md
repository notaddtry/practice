need to install postgres and node in your device

1. npm i
2. cd ../back npm i
3. cd ../front npm i
4. cd ..

create .env file in back directory and pass data likely from .env.example

then in main directory run "npm run db:build" then you must write your db password in terminal.
password in terminal must be in your .env file

after run "npm run dev"

front is actualy in "http://localhost:5173"
back is actualy in "http://localhost:3000"

there are 3 users you can access app
[
  {
    username: 'dmitry',
    password: '12345',
    role: 'user',
  },
  {
    username: 'kate',
    password: '12345',
    role: 'specialist',
  },
  {
    username: 'valeria',
    password: '12345',
    role: 'specialist',
  }
]
