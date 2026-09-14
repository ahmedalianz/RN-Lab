export type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  DeepLinking: undefined;
  SslPinning: undefined;
  Diagnostics: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
