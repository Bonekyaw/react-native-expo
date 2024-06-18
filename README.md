# This is React Native Expo Starter Kits

This is for Mobile Application Development. It can be used for developing a production app as well as learning how to do.  
If you find it useful, give me a **GitHub star**, please.

In this template, you will see ...

- Expo framework
- Redux toolkit
- RTK query
- React query
- expo router navigation
- FlashList ( @shopify )
- React context
- expo secure store
- Lottie animation
- Skeleton
- react hook form
- Authentication
- Custom Font
- Dark mode
- Rest api client
- graphql client ( Apollo client ) etc.

## Find more other Starter kits of mine ?

`My Kits For REST Api`

[Express + Prisma ORM + mongodb - rest api](https://github.com/Bonekyaw/node-express-prisma-mongodb)  
 [Express + Prisma ORM + SQL - rest api](https://github.com/Bonekyaw/node-express-prisma-rest)  
 [Express + mongodb - rest api](https://github.com/Bonekyaw/node-express-mongodb-rest)  
 [Express + mongoose ODM - rest api](https://github.com/Bonekyaw/node-express-nosql-rest)  
 [Express + sequelize ORM - rest api](https://github.com/Bonekyaw/node-express-sql-rest)

`My Kits For Graphql Api`

[Apollo server + Prisma ORM + SDL modulerized - graphql api](https://github.com/Bonekyaw/apollo-graphql-prisma)  
 [Express + Prisma ORM + graphql js SDL modulerized - graphql api](https://github.com/Bonekyaw/node-express-graphql-prisma)  
 [Express + Apollo server + mongoose - graphql api](https://github.com/Bonekyaw/node-express-apollo-nosql)  
 [Express + graphql js + mongoose - graphql api](https://github.com/Bonekyaw/node-express-nosql-graphql)  
 [Express + graphql js + sequelize ORM - graphql api](https://github.com/Bonekyaw/node-express-sql-graphql)

`Mobile Application Development`

[React Native Expo](https://github.com/Bonekyaw/react-native-expo) - Now you are here

`Upcoming Starter Kits`

- [Next js FullStack Starter Kits](https://github.com/Bonekyaw)
- [Nest js FullStack Starter Kits](https://github.com/Bonekyaw)

( Now I'm on the way of these two Starter Kits. Stay tuned, please. )

### Requirements

- [Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

#### Is setting up my environment required?

> Setting up your environment is not required if you're using a Framework. With a React Native Framework, you don't need to setup Android Studio or XCode as a Framework will take care of building the native app for you.
>
> If you have constraints that prevent you from using a Framework, or you'd like to write your own Framework, then setting up your local environment is a requirement. After your environment is set up, learn how to get started without a framework.

But my recommendation is that you should set up if possible. Then you can build your app using eas-build as well as xcode or android studio.

See [here](https://docs.expo.dev/deploy/build-project/) to learn how to deploy.

#### How to run Starter Kits

First of all, you should git clone.

```bash
git clone https://github.com/Bonekyaw/react-native-expo.git
cd react-native-expo
rm -rf .git
npm install
npm start
```

Now, you can start your project by running:

```bash
npx expo start
```

> To view your app on a mobile device, we recommend starting with Expo Go. As your application grows in complexity and you need more control, you can create a development build.
>
> Open the project in a web browser by pressing w in the Terminal UI. Press a for Android (Android Studio is required), or i for iOS (macOS with Xcode is required).

Or you can create a new expo app by running:

```bash
npx create-expo-app@latest
```

And then you can copy files or codes in Starter Kits. Don't forget to install packages manually.  

If you are a burmese developer, you should watch my explanation video on YouTube [Here](https://youtu.be/v5X3uMJJWAY). I promise new features will come in the future if I have much time.

If you have something hard to solve,
DM  
<phonenai2014@gmail.com>  
<https://www.facebook.com/phonenyo1986/>  
<https://www.linkedin.com/in/phone-nyo-704596135>  
<https://www.youtube.com/@CodecafeLab>

### Some features in some files

#### Authentication process

`(auth)/login.tsx`  
`providers/SessionProvider.tsx`  
`(hook)/useStorageState.ts`

#### routes in App

`(auth)/login`  
`(tabs)`  
`(tabs)/profile`  
`(tabs)/(money)`  
`(tabs)/(money)/call-api`  
`(tabs)/(money)/1`  
`(tabs)/(chat)`  
`(tabs)/(chat)/post`  
`(tabs)/(chat)/detail`

#### redux toolkit

`providers/redux/store.ts`  
`providers/redux/userSlice.ts`  
`hooks/useRedux.ts`  
`(tabs)/(chat)/post.tsx`  
`(tabs)/(chat)/detail.tsx`

#### RTK query

`providers/redux/query/apiSlice.ts`  
`providers/redux/store.ts`  
`(tabs)/(chat)/post.tsx`  

#### React query

`api/fetch.ts`  
`hooks/useRefreshByUser.ts`  
`hooks/useRefreshOnFocus.ts`  
`(tabs)/(money)/call-api.tsx`  
`(tabs)/(money)/[id].tsx`  

#### FlashList ( @shopify )

`(tabs)/(money)/call-api.tsx`  
`(tabs)/(chat)/post.tsx`

#### React context

`providers/SessionProvider.tsx`

#### expo secure store

`(hook)/useStorageState.ts`

#### Lottie animation

`(tabs)/(chat)/index.tsx`

#### react hook form

`(auth)/login.tsx`

#### Custom Font & Dark mode

`components/ThemedText.tsx`  
`components/ThemedView.tsx`

#### graphql client ( Apollo client )

`providers/graphql/ApolloClient.ts`  
`providers/graphql/sample/query.tsx`  
`providers/graphql/sample/mutation.tsx`

If you need a graphql api server to test, I provided the whole Starter Kits. See above `My Kits For Graphql Api`.