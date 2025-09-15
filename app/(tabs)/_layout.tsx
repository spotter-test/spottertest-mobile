import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {

  return (
    <>
      <Tabs
        screenOptions={({route}) =>({  
          tabBarIcon: ({ focused }) => {
            const iconNames: Record<string, keyof typeof Ionicons.glyphMap> = {
              index: "home-outline",
              search: "search-outline",
              profile: "person-outline",
            };
          
            const iconName = iconNames[route.name] || "help-circle-outline"; // Default icon to avoid undefined
          
            return <Ionicons name={iconName} size={21} color={focused ? "#1280ED" : "gray"} />;
          },
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#1280ED",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "PlusJakarta-Bold",
          },
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        })}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home'
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search'
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile'
          }}
        />
      </Tabs>
    </>
  );
}