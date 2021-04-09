### 1. Purpose of this project

This project is used to demonstrate how to integrate with Keycloak with angular applications. 

### 2. What is [Keycloak](https://www.keycloak.org/)?

- An Open Source Identity and Access Management for Modern Applications and Services.
- One of the opensource implementation of [OpenID](https://openid.net/) protocol.
- Simple Identity Layer on top of [OAuth2.0](https://oauth.net/2/) protocol

### 3. Why do we need Keycloak in Angular?

- To secure our application from unauthorized access
- To identify who is the user of the application, to show the relevant content & authorized content.

### 4. Prerequisites

1. Angular 6/+ Application
2. Docker is installed in your local environment

![image-20210409115522022](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409115522022.png)

### 5. Steps to Setup Keycloak

1. ##### Start Keycloak.

From a terminal start Keycloak with the following command:

```bash
docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:12.0.4
```

This will start Keycloak exposed on the local port 8080. It will also create an initial admin user with username `admin` and password `admin`.

![image-20210409120414762](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409120414762.png)

2. ##### Login to the admin console

   a. Open your browser in incognito mode and key in the url: http://localhost:8080. 

   ![](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409120721035.png)

   b. Click "Administration Console" icon to login admin console with username `admin` and password `admin`

   ![image-20210409121239306](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409121239306.png)

3. ##### Create a realm

   ​	a. Open the [Keycloak Admin Console](http://localhost:8080/auth/admin)

   ​	b. Hover the mouse over the dropdown in the top-left corner where it says `Master`, then click on `Add realm`

   ​	c. Fill in the form with the following values:

   ​		Name: `demo`

   ​	d. Click `Create`

![image-20210409122054996](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409122054996.png)

![image-20210409122204208](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409122204208.png)

4. ##### Create a client

   a. Click `Clients` (left-hand menu)

   b. Click `Create` button on the `Clients` page

   c. Key in  `Client ID` (book-store) and  `Root URL` (http://localhost:4200) as below

![image-20210409150943208](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409150943208.png)

​		d. Click `Save` button

​	5. **Create roles**

​	In this project, we need to create 2 roles(user and admin) to test the access control based on the user roles.

​	a. Click `Roles` (left-hand menu)

​	b. Key in the role name(e.g. user) you want to create.

​	c. Click `Save`

![image-20210409135118237](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409135118237.png)

​	d. Follow the steps above to create another role(e.g. admin).

​	6. **Create users**

​	In this project, we need to create 2 users and assign the 2 different roles to the 2 users respectively.

​	a. Click `Users` (left-hand menu)

​	b. Click  `Add user` button

​	c. Key in the Username(e.g. simtech-user).

​	d. Click `Save`

![image-20210409135716910](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409135716910.png)

​	e. Go back to `User` page and search the user just created.

![image-20210409144535980](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409144535980.png)

​	f. Click the `ID` link, go to the Tab `Credentials`(top of the page), set an initial password for the user `simtech-user` . Set `Temporary` to `OFF` to prevent having to update password on first login.

![image-20210409145013870](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409145013870.png)

​	g. Go to the Tab `Role Mappings`(top of the page), select `user` in the `Available Roles`, click `Add selected` button.

![image-20210409144251926](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409144251926.png)

​	h. Go back to Tab `Details`, click `Save` button.

​	i. Repeat the step a-h above to create another user `simtech-admin` and assign `admin` to the user.

### 6. Steps to Integrate Keycloak in Angular Application

1. Install Keycloak JS package and Keycloak Angular package

   a. `npm i --save keycloak-js`

   b. `npm i --save keycloak-angular`

![image-20210409150331746](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409150331746.png)

2. Keycloak Server Configuration

   Add KeycloakConfig in the environment const variable in src/environments/environment.prod.ts and src/environments/environment.ts. The configuration must match with the content setup in the Keycloak.

   ![image-20210409151639030](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409151639030.png)

3. Keycloak Initialization

   Create a file app-init.ts in the project src/app/util directory, and add `initializer`  function.

   ![image-20210409152629495](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409152629495.png)

4. Integrating into AppModule

   a. Import `KeycloakAngularModule` in `AppModule`

   b. Register Provider `KeyloackService`

   c. Register Provider of type `APP_INITIALIZER` with `initializer` we defined in `app-init.ts`

   ![image-20210409153446861](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409153446861.png)

5. Guard configuration

   a. Create a Guard `ng new g auth`

   b. Change the definition of the class as below, notice the `extends`

   ![image-20210409153721057](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409153721057.png)

   c. Routing Module Configuration. Use the `AuthGuard` for routes that you want to restrict access, Assign required roles for each route in `data` attribute, `roles` parameter as an array.

   ![image-20210409153855994](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409153855994.png)

### 7. Steps to test the application

1. Run the angular application.

   `ng serve`

   ![image-20210409154234983](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409154234983.png)

2. Open your browser in incognito mode and key in the url: http://localhost:4200. Below web page will be shown.

   ![image-20210409154416153](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409154416153.png)

3. Click the `Home` button, the url will jump to http://localhost:4200/home. This component is accessible to for all user including anonymous user as per defined in the app-routing.module.ts file. Below web page will be shown.

   ![image-20210409154557305](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409154557305.png)

4. Click the `book` button, it should auto redirect to Keycloak login page as this component is only accessible for authenticated user either user role or admin role as per defined in the app-routing.module.ts file.

   ![image-20210409154956946](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409154956946.png)

5. Key the user name  `simtech-user` and its password, and click  `Sign In` as per setup in Keycloak. After Signing in, click the  `book` button again. The `book` component should be accessible and the web page should display as below.

   ![image-20210409155537179](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409155537179.png)

6. Click the `user` button, the `user` component should not accessible as current user does not have admin role.

7. Click the  `Logout` button to logout current user and click the `user` button again,  it should auto redirect to Keycloak login page. Key in the admin user  `simtech-admin` and its password to login as admin user.

   ![image-20210409160003536](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409160003536.png)

8. After login in as admin user, click the `user` button again, the  `user` component should be accessible and the page should display as below.

   ![image-20210409160151195](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210409160151195.png)

### 8. Other Reference for Keycloak

1. Keycloak adapter for Angular application:

   https://www.npmjs.com/package/keycloak-angular

2. Keycloak adapter for Javascript:

   https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter

3. Keycloak Integration with Angular:

   https://sairamkrish.medium.com/keycloak-integration-part-1-overview-812010d6c7cf

   https://sairamkrish.medium.com/keycloak-integration-part-2-integration-with-angular-frontend-f2716c696a28