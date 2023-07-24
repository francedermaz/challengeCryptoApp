import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FavsScreen from "./components/FavoritesScreen/FavsScreen";
import HomeScreen from "./components/HomeScreen/Homescreen";
import CryptoDetailScreen from "./components/CryptoDetailScreen/CryptoDetail";
import { AppTheme } from "./styles/App";
import CustomTabBar from "./components/TabBar/TabBar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === "HomeScreen" ? false : true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#5a189a",
        },
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CryptoDetail" component={CryptoDetailScreen} />
    </Stack.Navigator>
  );
};

const FavsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === "FavsScreen" ? false : true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#5a189a",
        },
      })}
    >
      <Stack.Screen name="FavsScreen" component={FavsScreen} />
      <Stack.Screen name="CryptoDetail" component={CryptoDetailScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarLabelPosition: "beside-icon",
          tabBarIconStyle: { display: "none" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "";
              if (routeName === "CryptoDetail") {
                return { display: "none" };
              }
              return;
            })(route),
          })}
        />
        <Tab.Screen
          name="Favs"
          component={FavsStack}
          options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "";
              if (routeName === "CryptoDetail") {
                return { display: "none" };
              }
              return;
            })(route),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
