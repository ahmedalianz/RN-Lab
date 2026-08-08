/** Dynamic catalog routes are strings at runtime; keep a single cast site. */
export function navigateToRoute(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: {navigate: (...args: any[]) => void},
  route: string,
  params?: object,
) {
  if (params) {
    navigation.navigate(route, params);
    return;
  }
  navigation.navigate(route);
}
