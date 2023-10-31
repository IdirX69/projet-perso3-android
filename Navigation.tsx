import * as React from "react";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import RegisterPage from "./src/pages/RegisterPage";
import LoginPage from "./src/pages/LoginPage";
import * as SecureStore from "expo-secure-store";
import { useUser } from "./src/Context/UserContext";
import { createStackNavigator } from "@react-navigation/stack";

function BudgetScreen() {
  return <></>;
}

function ProfilScreen() {
  return <></>;
}
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function Navigation() {
  const [dataToken, setDataToken] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchDataToken = async () => {
      const data = await SecureStore.getItemAsync("userToken");
      setDataToken(JSON.parse(data));
    };
    fetchDataToken();
  }, [user]);
  console.log(dataToken);

  return (
    <>
      {dataToken?.token ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="Register" component={RegisterPage} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name == "Home") {
                  iconName = "home";
                } else if (route.name == "Profile") {
                  iconName = "person-circle";
                } else if (route.name == "Search") {
                  iconName = "search";
                } else if (route.name == "Favoris") {
                  iconName = "heart";
                }
                if (iconName) {
                  return <Ionicons name={iconName} size={25} color={"black"} />;
                } else {
                  return null;
                }
              },
            })}
          >
            <>
              <Tab.Screen name="Home" component={BudgetScreen} />
              <Tab.Screen name="Search" component={ProfilScreen} />
              <Tab.Screen name="Favoris" component={LoginPage} />
              <Tab.Screen name="Profile" component={ProfilScreen} />
            </>

            {/* <Tab.Screen
              name="Register"
              component={RegisterPage}
              options={{ tabBarButton: () => null }}
            /> */}
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default Navigation;
