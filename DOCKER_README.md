# Build and Run CPAS Docker Container

## Install Dependencies:
For [Mac](https://docs.docker.com/desktop/setup/install/mac-install/)
For [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
For [Linux](https://docs.docker.com/desktop/setup/install/linux/)

## Run Docker:

### Clone the repository:
`` add git clone command once we have the repo ``

### Build Container:
`` make build ``

### Run Container (In backgroud):
`` make up ``

### Stop and Remove Running Container:
`` make down ``

### Pause and Resume Running Container:
`` make pause ``
`` make start ``

### Run Django Migrations:
`` make migrate ``

### Miscellaneous Help:
`` make help ``

### When updating packages
When updating the installed packages, they must be added to `requirements.txt` for Django packages or `package.json` for React packages. Then commit these changes to the Bitbucket repository and inform group members of the update.
The container must then be rebuilt by running:
`` make down ``
`` make build ``
`` make up ``