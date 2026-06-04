import React from 'react';
import { useColorScheme } from 'react-native';

import { Stack } from 'expo-router';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Jika mau pakai warna gelap/terang, bisa apply manual di Stack screenOptions
  return (
    <>
      <AnimatedSplashOverlay />
      <AppTabs />
      {/* Contoh Stack jika ingin route tambahan */}
      {/* 
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      /> 
      */}
    </>
  );
}