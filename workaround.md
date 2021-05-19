# Workarounds for non-persistent Docker image tag

## Codebase 

**Prerequisites** 

- npm

**Steps**

- Clone the repo : `git clone https://github.com/k8-proxy/glasswall-desktop.git`
- Navigate to the repo: `cd glasswall-desktop`
- Install dependencies: `npm install`
- Compile: `npm run build`
- Start the app with the debugger: `npm start`

![image](https://user-images.githubusercontent.com/60857664/118803861-2f247d80-b8a4-11eb-847c-8ab8cf2bad15.png)

- In the Desktop app > Settings > Change image tag

![image](https://user-images.githubusercontent.com/60857664/118804345-e0c3ae80-b8a4-11eb-877b-4a932e2885b8.png)

- In the debugger, you'll find the key `rebuild_image_tag_key_2` with a value set as the new image tag 

![image](https://user-images.githubusercontent.com/60857664/118804455-ffc24080-b8a4-11eb-91f7-37b399934fb6.png)

- Change the value for the key `rebuild_image_tag_key_2` > Navigate to a different tab on the Desktop App > Settings > your new value is the image tag


## Docker

- Enlist docker images: `docker images`
- Change your licensed docker tag to `rebuild`
`docker tag glasswallsolutions/evaluationsdk:<docker-tag> glasswallsolutions/evaluationsdk:rebuild`