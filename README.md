## RecWebNeo


## Release 1
Deadline 16.08
Released 18.08

### Backend
- Organization
    - Create, update and delete Organizations
    - Get organizations and spesific organization
    - Only super-users are allowed to create, update and delete organizations
    - All requests can get organizations
- Admision periode
    - Create, update and delete Admision periodes
    - Get admision periodes and spesific admision periode
    - The admision periode is linked to an organization
    - Only super-users are allowed to create, update and delete admision periodes
    - Al requests can get admision periodes
- Sections
    - Create, update and delte sections
    - Get section and sections
    - A section is connected to a organization
    - Only super-users are allowed to create, update and delete sections
    - All requests can get sections
- Team
    - Create, update and delete teams
    - Get teams and teams 
    - A team is connected to a section
    - Only super-users are allowed to create, update and delete teams
    - All requests can get teams
- Positions
    - Create, update and delete positions
    - Get position and positions
    - A position is conencted to an admision periode, section and team
    - Only super-users are allowed to create, update and delete positions
    - All requests can get positions
- Application
    - Create an application. All created user can register one application
    - The application is connected to an admision periode, applicant (user) and 1 or more teams
    - Update an application. A user can only update their own application
    - Delete an application. A user can only delete their own application
    - Get application. A user can only get their own application
    - Get applications. A superuser can get all applications created.
- User
    - A user has a email, first name, last name, birthday, groups and assosiated authentication user
    - A user can update their own information, login.
    - Anyone can register a new user
    - There is no way to get all users for superuser yet.
- Auth user
    - Created when a new user is created
    - Stores a hash of the password and a salt
    - Can't be accessed at the moment

### Frontend
- Landing page with positions
- Profile page
- Login and registration
- Possible to register application and view my application after the fact


## Release 2

### Backend
- Get all users
- Get the user linked to the application


### Frontend




## Future improvements

### Backend
- Restructure resolvers in backend
- Refresh token
- Edit password
- Clean error messages and error handeling
- Authorization groups with different priviledges0
- Authorization groups linked to sections and teams
- Section leaders should be able to add users as a member and thus se applications




### Frontend
- Edit profile information
- Edit application
- Edit password