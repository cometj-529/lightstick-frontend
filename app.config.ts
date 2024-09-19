import "dotenv/config";

export default {
  SOCKET_URL: process.env.SOCKET_URL,
  API_URL: process.env.API_URL,
  expo: {
    name: "lightstick-frontend",
    slug: "lightstick-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.wjdgotjd529.lightstickfrontend",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.wjdgotjd529.lightstickfrontend",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/icon.png",
      meta: {
        title: "스중봉 | 스마트폰 중앙제어 응원봉",
        viewport: "width=device-width, initial-scale=1",
        description: "스마트폰 여러대를 한 마음으로 다같이 응원해보세요",
        "theme-color": "#ffffff",
        "og:url": "https://hxxstar.site",
        "og:title": "스중봉 | 스마트폰 중앙제어 응원봉",
        "og:description": "스마트폰 여러대를 한 마음으로 다같이 응원해보세요",
        "og:image": "./assets/icon.png",
      },
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "4330a822-39cd-48fc-a2fb-595781613152",
      },
      SOCKET_URL: process.env.SOCKET_URL,
      API_URL: process.env.API_URL,
    },
  },
};
