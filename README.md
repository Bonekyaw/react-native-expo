# React Native Expo Starter Kits

Do you want single code base for both android and ios application? Here you are.  
If you find it useful, give me a **GitHub star**, please.

In this template, you will see ...

- Expo framework ( New Architecture )
- json-server ( For testing API )
- Redux toolkit
  - createSlice & createAsyncThunk
  - createSlice & createAsyncThunk & createEntityAdapter
- RTK query
  - createApi
  - createApi & createEntityAdapter
- React query ( I'll add soon. )
- FlashList ( @shopify ) ( I'll add soon. )
- React context
- expo secure store
- react hook form
- Authentication ( Access token & Refresh token )
- Custom Font
- IconSymbol ( SF Symbols )
- Dark mode
- Rest api client
- graphql client ( Apollo client )
- Retry mechanism for fetching api etc.

## Find more other Starter kits of mine ?

`Nest JS for REST Api`

[Nest JS + Prisma ORM - REST api](https://github.com/Bonekyaw/nest-prisma-sql-rest)

`Nest JS for Graphql Api`

[Nest JS + Prisma ORM - Graphql api](https://github.com/Bonekyaw/nest-prisma-graphql)

`Node Express JS For REST Api`

[Express + Prisma ORM + mongodb - rest api](https://github.com/Bonekyaw/node-express-prisma-mongodb)  
 [Express + Prisma ORM + SQL - rest api](https://github.com/Bonekyaw/node-express-prisma-rest)  
 [Express + mongodb - rest api](https://github.com/Bonekyaw/node-express-mongodb-rest)  
 [Express + mongoose ODM - rest api](https://github.com/Bonekyaw/node-express-nosql-rest)  
 [Express + sequelize ORM - rest api](https://github.com/Bonekyaw/node-express-sql-rest)

`Node Express JS For Graphql Api`

[Apollo server + Prisma ORM + SDL modulerized - graphql api](https://github.com/Bonekyaw/apollo-graphql-prisma)  
 [Express + Prisma ORM + graphql js SDL modulerized - graphql api](https://github.com/Bonekyaw/node-express-graphql-prisma)  
 [Express + Apollo server + mongoose - graphql api](https://github.com/Bonekyaw/node-express-apollo-nosql)  
 [Express + graphql js + mongoose - graphql api](https://github.com/Bonekyaw/node-express-nosql-graphql)  
 [Express + graphql js + sequelize ORM - graphql api](https://github.com/Bonekyaw/node-express-sql-graphql)

`Mobile Application Development`

[React Native Expo](https://github.com/Bonekyaw/react-native-expo) - Now you are here

( Now I'm on the way of these two Starter Kits. Stay tuned, please. )

### Requirements

- [Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

#### Is setting up my environment required?

> Setting up your environment is not required if you're using a Framework. With Expo Framework, you don't need to setup Android Studio or XCode as a Framework will take care of building the native app for you.
>
> If you have constraints that prevent you from using a Framework, or you'd like to write your own Framework, then setting up your local environment is a requirement. After your environment is set up, learn how to get started without a framework.

But my recommendation is that you should set up if possible. Then you can build your app using not only eas-build but also xcode or android studio.

See [here](https://docs.expo.dev/tutorial/eas/introduction/) to learn how to deploy.

#### How to run Starter Kits

First of all, you should clone it from my github.

```bash
git clone https://github.com/Bonekyaw/react-native-expo.git
cd react-native-expo
rm -rf .git
npm install
npm start
```

Now, you can start your project by running:

Open new terminal in vscode and Run json-server for API

```bash
npx json-server json-server-to-test-api/db.json --port 8080
```

And then you can run metro bundler for expo app

```bash
npx expo start
```

You can upgrade latest version if expo is outdated. [Read more](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)

```bash
npm install expo@latest

npx expo install --fix
```

> To view your app on a mobile device, we recommend starting with Expo Go. As your application grows in complexity and you need more control, you can create a development build.
>
> Open the project in a web browser by pressing w in the Terminal UI. Press a for Android (Android Studio is required), or i for iOS (macOS with Xcode is required).

Or you can create a new expo app by running:

```bash
npx create-expo-app@latest
```

And then you can copy files or codes in my Starter Kits. Don't forget to install packages manually.

If you are a burmese developer, you should watch my explanation video on YouTube [Here](https://youtu.be/v5X3uMJJWAY). I promise new features will come in the future if I have much time.

If you have something hard to solve,
DM  
<phonenai2014@gmail.com>  
<https://www.facebook.com/phonenyo1986/>  
<https://www.linkedin.com/in/phone-nyo-704596135>  
<https://www.youtube.com/@CodecafeLab>

### Some features in some files

### json-server

`json-server-to-test-api/db.json`

```bash
npx json-server json-server-to-test-api/db.json --port 8080
```

#### Authentication process

`login.tsx`  
`providers/ctx.tsx`  
`(hook)/useStorageState.ts`  
`api/auth.ts`

#### routes in App

`/login`  
`/`  
`/normalize`  
`/rtk`  
`/rtkEntity`  
`/explore`

#### redux toolkit

`providers/redux/store.ts`  
`providers/redux/user/userSlice.ts`  
`providers/redux/user/entitySlice.ts`  
`hooks/useRedux.ts`  
`/api/index.ts`

#### RTK query

`providers/redux/query/apiSlice.ts`  
`providers/redux/query/baseQueryWithRefresh.ts`  
`providers/redux/user/rtkSlice.ts`  
`providers/redux/user/rtkEntitySlice.ts`  
`providers/redux/store.ts`

#### React query

`I will add again. Please wait.`

#### FlashList ( @shopify )

`I will add again. Please wait.`

#### React context

`providers/ctx.tsx`

#### expo secure store

`(hook)/useStorageState.ts`

#### react hook form

`login.tsx`

#### Custom Font & Dark mode

`components/ThemedText.tsx`  
`components/ThemedView.tsx`

#### graphql client ( Apollo client )

`providers/graphql/ApolloClient.ts`  
`providers/graphql/sample/query.tsx`  
`providers/graphql/sample/mutation.tsx`

If you need a graphql api server to test, I provided the whole Starter Kits. See above `My Kits For Graphql Api`.
